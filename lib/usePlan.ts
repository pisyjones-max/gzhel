"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "gzhel-plan";
const read = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };

export function usePlan() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setIds(read());
    sync();
    window.addEventListener("plan-change", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("plan-change", sync); window.removeEventListener("storage", sync); };
  }, []);
  const write = useCallback((n: string[]) => {
    try { localStorage.setItem(KEY, JSON.stringify(n)); } catch {}
    setIds(n);
    window.dispatchEvent(new Event("plan-change"));
  }, []);
  const toggle = (id: string) => write(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
  const addMany = (a: string[]) => write([...ids, ...a.filter((x) => !ids.includes(x))]);
  return { ids, toggle, addMany, write };
}
