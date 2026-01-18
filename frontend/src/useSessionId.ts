import { useContext } from "react";
import { SessionContext } from "./SessionProvider";

export function useSessionId(): string {
  const sessionId = useContext(SessionContext);
  if (!sessionId) {
    throw new Error("useSessionId must be used within SessionProvider");
  }
  return sessionId;
}
