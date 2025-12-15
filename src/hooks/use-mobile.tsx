"use client";

import * as React from "react"

const MOBILE_BREAKPOINT = 768

// This hook has been modified to avoid returning `undefined` on initial render,
// which can cause performance issues with components that depend on it.
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Check if window is defined (for server-side rendering)
    if (typeof window === 'undefined') {
        return;
    }
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(mql.matches)
    }

    // Set initial value on mount
    onChange();

    mql.addEventListener("change", onChange)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
