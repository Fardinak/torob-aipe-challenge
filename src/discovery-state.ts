import { useEffect, useState } from "react";
import type { Request } from "./comparison";

const requestKeys = [
  "query",
  "category",
  "engine",
  "version",
  "ram",
  "cpu",
  "disk",
  "resourceMode",
  "budget",
  "provider",
  "sort",
  "egress",
  "ingress",
  "priceMode",
] as const;
function readLocation(): { request: Request; selectedId: string | null } {
  const params = new URLSearchParams(location.search);
  const request: Record<string, string> = { category: "all" };
  for (const key of requestKeys)
    if (params.has(key)) request[key] = params.get(key)!;
  // Invalid enum values do not become a different comparison silently.
  return { request: request as Request, selectedId: params.get("detail") };
}
export function useDiscoveryState() {
  const [state, setState] = useState(readLocation);
  useEffect(() => {
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const restore = () => {
      setState(readLocation());
      requestAnimationFrame(() => {
        window.scrollTo(0, history.state?.scrollY ?? 0);
        if (history.state?.focusId)
          document
            .getElementById(`configuration-${history.state.focusId}`)
            ?.focus({ preventScroll: true });
      });
    };
    window.addEventListener("popstate", restore);
    return () => {
      window.removeEventListener("popstate", restore);
      history.scrollRestoration = previousRestoration;
    };
  }, []);
  const navigate = (request: Request, selectedId: string | null) => {
    request = { category: "all", ...request };
    history.replaceState(
      {
        ...history.state,
        scrollY: window.scrollY,
        ...(selectedId ? { focusId: selectedId } : {}),
      },
      "",
    );
    const url = new URL(location.href);
    url.search = "";
    for (const key of requestKeys) {
      const value = request[key];
      if (
        value !== undefined &&
        value !== "" &&
        !(key === "category" && value === "all")
      )
        url.searchParams.set(key, String(value));
    }
    if (selectedId) url.searchParams.set("detail", selectedId);
    history.pushState(
      {
        scrollY: selectedId ? 0 : window.scrollY,
        fromList: Boolean(selectedId),
      },
      "",
      url,
    );
    setState({ request, selectedId });
  };
  return {
    ...state,
    setRequest: (request: Request) => navigate(request, null),
    select: (id: string) => navigate(state.request, id),
    backToList: () => {
      if (history.state?.fromList) history.back();
      else navigate(state.request, null);
    },
  };
}
