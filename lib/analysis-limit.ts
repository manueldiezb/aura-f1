// Solo se usa en el cliente (localStorage)
export const MAX_FREE_ANALYSES = 3;

const KEY_COUNT = "aura-analyses-count";
const KEY_DATE = "aura-analyses-date";

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function getRemainingAnalyses(): number {
  if (typeof window === "undefined") return MAX_FREE_ANALYSES;

  const savedDate = localStorage.getItem(KEY_DATE);
  const today = todayStr();

  if (savedDate !== today) {
    localStorage.setItem(KEY_DATE, today);
    localStorage.setItem(KEY_COUNT, "0");
    return MAX_FREE_ANALYSES;
  }

  const count = parseInt(localStorage.getItem(KEY_COUNT) ?? "0", 10);
  return Math.max(0, MAX_FREE_ANALYSES - count);
}

export function consumeAnalysis(): void {
  if (typeof window === "undefined") return;

  const today = todayStr();
  const savedDate = localStorage.getItem(KEY_DATE);

  if (savedDate !== today) {
    localStorage.setItem(KEY_DATE, today);
    localStorage.setItem(KEY_COUNT, "1");
    return;
  }

  const count = parseInt(localStorage.getItem(KEY_COUNT) ?? "0", 10);
  localStorage.setItem(KEY_COUNT, String(count + 1));
}

export function hasReachedLimit(): boolean {
  return getRemainingAnalyses() <= 0;
}
