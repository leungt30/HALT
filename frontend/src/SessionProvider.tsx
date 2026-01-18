import { createContext, useState } from "react";

export const SessionContext = createContext<string | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionId] = useState(() => crypto.randomUUID());

  return (
    <SessionContext.Provider value={sessionId}>
      {children}
    </SessionContext.Provider>
  );
}
