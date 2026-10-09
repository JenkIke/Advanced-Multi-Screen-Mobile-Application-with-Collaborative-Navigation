import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

import { DEMO_ACCOUNT } from "@/data/account";

export interface User {
  name: string;
  email: string;
  memberSince: string;
}

interface AuthContextValue {
  user: User | null;
  signIn: (email: string, password: string) => string | null;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function nameFromEmail(email: string): string {
  const handle = email.split("@")[0] ?? "";
  const firstPart = handle.split(/[._-]/)[0] ?? handle;
  return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
}

/**
 * Mock authentication (bonus feature). Nothing leaves the device: any
 * well-formed email with a password of 6+ characters signs in.
 */
export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  /** Returns an error message for the form, or null once signed in. */
  function signIn(email: string, password: string): string | null {
    const trimmed = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      return "Enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    setUser({
      name: nameFromEmail(trimmed),
      email: trimmed,
      memberSince: DEMO_ACCOUNT.memberSince,
    });
    return null;
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
