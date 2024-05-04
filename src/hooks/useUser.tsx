import { UserContext } from "@/context/userContext";
import { useContext } from "react";

//custom hook to serve the user context
export const useUserInfo = () => {
  const { user, setUser } = useContext(UserContext);
  return { user, setUser };
};
