"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/reusable/Navbar";
import Footer from "@/components/reusable/Footer";
import { addToLocalStrorage } from "@/lib/functions/function";
import { logIn } from "@/lib/functions/auth";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Component() {
  const capitalizedWord = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;

    try {
      const resp = await logIn(email);
      addToLocalStrorage({
        key: "fecamdsite",
        value: JSON.stringify(resp),
      });
      setUser(resp);
      toast.success("Logged in successfully");
      router.replace("/");
    } catch (err: any) {
      toast.error("Email not found🥺.", {
        action: {
          label: "Sign up",
          onClick: () => router.push(`/signup`),
        },
        duration: 4000,
        className: "toastError",
      });
    }
  };

  return (
    <div className="flex w-screen flex-col min-h-[110dvh]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className=" px-10">
          <div className="backdrop-blur-xl bg-opacity-20 p-7 py-12 sm:p-10 rounded-xl dark:bg-gray-800 flex items-center justify-center">
            <div className="max-w-md min-w-[270px] w-full space-y-4 px-4 md:px-6">
              <div className="">
                <h1 className="text-2xl m-0 font-bold  text-white">Login</h1>
              </div>
              <form
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4 text-gray-200 placeholder:text-gray-200"
              >
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="johndoe@gmail.com"
                    type="email"
                    className="placeholder:text-gray-400"
                  />
                </div>

                <Button className="w-full">Continue your journey</Button>
              </form>
              <div className="text-center text-xs text-gray-300 dark:text-gray-300">
                Don&apos;t have an account?
                <Link
                  className="font-medium  text-xs text-primary hover:underline"
                  href="/signup"
                >
                  sign up
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
