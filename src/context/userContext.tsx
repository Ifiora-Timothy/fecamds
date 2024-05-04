"use client";

import { signUpInputs } from "@/lib/models/user";
import { PropsWithChildren, createContext, useState } from "react";

export const UserContext = createContext<{
  user: signUpInputs | null;
  setUser: (user: signUpInputs | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<signUpInputs | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
