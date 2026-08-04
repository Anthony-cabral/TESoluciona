"use client";

import { useEffect } from "react";

const noResultsKey = "tesoluciona-search-no-results";

type NoResultsRecorderProps = {
  query: string;
  total: number;
};

export function NoResultsRecorder({ query, total }: NoResultsRecorderProps) {
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || total > 0) return;

    try {
      const stored = JSON.parse(localStorage.getItem(noResultsKey) ?? "[]");
      const current = Array.isArray(stored)
        ? stored.filter((item) => typeof item === "string")
        : [];
      const next = [
        trimmed,
        ...current.filter((item) => item !== trimmed)
      ].slice(0, 30);
      localStorage.setItem(noResultsKey, JSON.stringify(next));
    } catch {
      localStorage.setItem(noResultsKey, JSON.stringify([trimmed]));
    }
  }, [query, total]);

  return null;
}
