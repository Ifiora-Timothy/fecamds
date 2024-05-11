import { UserContext } from "@/context/userContext";
import { useContext } from "react";

//custom hook to serve the user context
export const useUserInfo = () => {
  const { user, setUser, isExpired, submitted, fields } =
    useContext(UserContext);
  return { user, setUser, isExpired, submitted, fields };
};
