"use client";

import { signUpInputs } from "@/lib/models/user";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

export const UserContext = createContext<{
  user: signUpInputs | null;
  setUser: (user: signUpInputs | null) => void;
  isExpired: boolean;
  setIsExpired: (isExpired: boolean) => void;
  submitted: Array<Date>;
  setSubmitted: (submitted: Array<Date>) => void;
  fields: any[];
  setFields: (fields: any[]) => void;
}>({
  user: null,
  setUser: () => {},
  isExpired: false,
  setIsExpired: () => {},
  submitted: [],
  setSubmitted: () => {},
  fields: [],
  setFields: () => {},
});

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<signUpInputs | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [submitted, setSubmitted] = useState<Array<Date>>(() => {
    if (typeof window != "undefined") {
      const storedData = localStorage.getItem("prevDate");
      return storedData ? JSON.parse(storedData) : [];
    }
    return [];
  });
  const [fields, setFields] = useState<any[]>([]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isExpired,
        setIsExpired,
        submitted,
        setSubmitted,
        fields,
        setFields,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
