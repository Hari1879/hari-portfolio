import { createContext, useContext } from "react";

export const TransitionCtx = createContext(null);

export function usePageTransition() {
  return useContext(TransitionCtx);
}
