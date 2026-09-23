"use client";

import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Garante que todos os elementos fiquem 100% visíveis imediatamente
    document.querySelectorAll(".identidade-reveal").forEach((element) => {
      element.classList.add("visible");
    });
  }, []);
}
