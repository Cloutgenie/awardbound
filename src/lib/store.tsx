import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SAMPLE_AWARD_ID, SAMPLE_GRANT_ID } from "../data/sampleAward";
import { alertsForGrants } from "./alerts";
import type { DeskAlert, Grant } from "../types";

const STORAGE_KEY = "awardbound.desk.v1";

type DeskState = {
  grants: Grant[];
};

type DeskContextValue = {
  grants: Grant[];
  alerts: DeskAlert[];
  addGrant: (grant: Grant) => void;
  removeGrant: (id: string) => void;
  findGrant: (id: string) => Grant | undefined;
  hasSample: boolean;
  clearDesk: () => void;
};

const DeskContext = createContext<DeskContextValue | null>(null);

function readState(): DeskState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { grants: [] };
    const parsed = JSON.parse(raw) as DeskState;
    if (!Array.isArray(parsed.grants)) return { grants: [] };
    return { grants: parsed.grants };
  } catch {
    return { grants: [] };
  }
}

function writeState(state: DeskState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function DeskProvider({ children }: { children: ReactNode }) {
  const [grants, setGrants] = useState<Grant[]>(() => readState().grants);

  const persist = useCallback((next: Grant[]) => {
    setGrants(next);
    writeState({ grants: next });
  }, []);

  const addGrant = useCallback(
    (grant: Grant) => {
      persist([
        grant,
        ...grants.filter((item) => {
          if (grant.id === SAMPLE_GRANT_ID) return item.id !== SAMPLE_GRANT_ID;
          if (grant.awardId === SAMPLE_AWARD_ID) return item.awardId !== SAMPLE_AWARD_ID;
          return item.id !== grant.id;
        }),
      ]);
    },
    [grants, persist],
  );

  const removeGrant = useCallback(
    (id: string) => persist(grants.filter((grant) => grant.id !== id)),
    [grants, persist],
  );

  const findGrant = useCallback(
    (id: string) => grants.find((grant) => grant.id === id),
    [grants],
  );

  const clearDesk = useCallback(() => persist([]), [persist]);

  const value = useMemo<DeskContextValue>(
    () => ({
      grants,
      alerts: alertsForGrants(grants),
      addGrant,
      removeGrant,
      findGrant,
      hasSample: grants.some((grant) => grant.awardId === SAMPLE_AWARD_ID),
      clearDesk,
    }),
    [addGrant, clearDesk, findGrant, grants, removeGrant],
  );

  return <DeskContext.Provider value={value}>{children}</DeskContext.Provider>;
}

export function useDesk(): DeskContextValue {
  const value = useContext(DeskContext);
  if (!value) throw new Error("useDesk must run inside DeskProvider");
  return value;
}
