"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar, { exclude } from "@/components/reusable/Navbar";
import Footer from "@/components/reusable/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUp } from "@/lib/functions/auth";
import { toast } from "sonner";
import { addToLocalStrorage } from "@/lib/functions/function";
import { usePathname, useRouter } from "next/navigation";
import { useUserInfo } from "@/hooks/useUser";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { checkIfUserExists } from "@/lib/functions/actions";

const capitalizedWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
export default function Component() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = e.currentTarget.username.value;
    const email = e.currentTarget.email.value;
    const department = e.currentTarget.department.value;

    try {
      await signUp({ username, email, department });
      addToLocalStrorage({
        key: "fecamdsite",
        value: JSON.stringify({ username, email, department }),
      });
      setUser({ username, email, department });
      toast.success("Account successfully created");
      router.replace("/");
      router.refresh();
    } catch (err: any) {
      toast.error("email already exist.", {
        action: {
          label: "Log in",
          onClick: () => router.push(`/login`),
        },
        duration: 4000,
        className: "toastError",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-[110dvh]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex sm:block  ">
          <div className="backdrop-blur-xl backrop bg-opacity-20  p-7 py-10  sm:p-10 rounded-xl dark:bg-gray-800 flex items-center justify-center">
            <div className="max-w-md min-w-[250px] w-full space-y-4 px-4 md:px-6">
              <div className="">
                <h1 className="text-2xl m-0 font-bold  text-white">
                  Create Account
                </h1>
                <div className="text-green-600 m-0 text-sm dark:text-gray-300">
                  Join the Novena.
                </div>
              </div>
              <form
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4 text-gray-200 placeholder:text-gray-200"
              >
                <div>
                  <Label htmlFor="username" className="">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    className="placeholder:text-gray-400"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    type="email"
                    className="placeholder:text-gray-400"
                  />
                </div>
                <div className="">
                  <Label htmlFor="email">Department</Label>
                  <Select defaultValue="medicine" name="department">
                    <SelectTrigger className="">
                      <SelectValue placeholder="medicine" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="dentistry">Dentistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  Start your journey
                </Button>
              </form>
              <div className="text-center text-xs text-gray-300 dark:text-gray-300">
                Already have an account?
                <Link
                  className="font-medium  text-xs text-green-300 hover:underline"
                  href="/login"
                >
                  sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
