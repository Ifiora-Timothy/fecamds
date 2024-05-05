"use client";
import React, { useContext, useEffect, useState } from "react";
import { CrossIcon } from "./icons";
import Link from "next/link";
import {
  ActivityIcon,
  AlignRight,
  CirclePlusIcon,
  InfoIcon,
  LogOutIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Button, buttonVariants } from "../ui/button";
import {} from "@/lib/functions/function";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUserInfo } from "@/hooks/useUser";
import { UserContext } from "@/context/userContext";
import { checkIfUserExists } from "@/lib/functions/actions";
import { cn } from "@/lib/utils";

type Props = {};

export const exclude = ["/login", "/signup"];
const Navbar = (props: Props) => {
  const router = useRouter();
  const navget = usePathname();
  const { setUser, user } = useContext(UserContext);

  useEffect(() => {
    const value = localStorage.getItem("fecamdsite");
    if (value) {
      setUser(JSON.parse(value));
      checkIfUserExists(JSON.parse(value).email).then((res) => {
        if (!res) {
          if (!exclude.includes(navget)) {
            router.push("/signup");
            router.refresh();
          }
        }
      });
    } else {
      if (!exclude.includes(navget)) {
        router.push("/signup");
      }
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("fecamdsite");
    setUser(null);
    router.push("/login");
  };
  return (
    <header className="bg-white  bg-opacity-10 fixed  top-0 z-10   w-full   backdrop-blur-xl  py-3 shadow dark:bg-gray-800">
      <div className="container mx-auto flex items-center px-4 justify-between sm:px-10 md:px-16">
        <Link href="/" className="flex items-baseline">
          <CrossIcon className="h-4 text-red-500 w-4 " />
          <h1 className="ml-2 text-base sm:text-xl font-bold text-gray-200 dark:text-gray-200">
            Rosary Challenge
          </h1>
          <span className="pl-2 text-xs text-white italic">
            By Fecamds &apos;O26
          </span>
        </Link>
        <nav className="ml-auto text-xs ">
          <div className=" sm:flex hidden sm:items-center    gap-4 sm:gap-4 md:gap-6">
            <Link
              className="font-medium hover:underline underline-offset-4 text-gray-200 dark:text-gray-300"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-medium hover:underline underline-offset-4 text-gray-200 dark:text-gray-300"
              href="/intentions"
            >
              Intentions
            </Link>
            <Link
              className="font-medium hover:underline underline-offset-4 text-gray-200 dark:text-gray-300"
              href="/progress"
            >
              Progress
            </Link>
            <Link
              className="font-medium hover:underline underline-offset-4 text-gray-200 dark:text-gray-300"
              href="/about"
            >
              About
            </Link>
            {user && (
              <Button
                variant={"link"}
                onClick={() => signOut()}
                className="text-xs p-0 hover:underline underline-offset-4 text-blue-200 dark:text-gray-300"
              >
                Sign Out
              </Button>
            )}
          </div>
          <div className="block   sm:hidden">
            <Sheet>
              <SheetTrigger className="text-white" asChild>
                <AlignRight />
              </SheetTrigger>
              <SheetOverlay className="max-w-[200px] text-white">
                <SheetContent className="bg-[url('/largeRosary.jpg')] text-white bg-fixed  m-0 p-0  h-full  bg-cover bg-no-repeat max-w-[300px]">
                  <div className="bg-white flex flex-col justify-between bg-opacity-20 h-full  py-10">
                    <div className="flex flex-col  bg-opacity-20 items-start gap-2 p-6">
                      <Link
                        className="flex items-center gap-2 text-white dark:text-[#f8f8f8] font-medium"
                        href="/"
                      >
                        <CrossIcon className="h-5 w-5" />
                        <span>Home</span>
                      </Link>
                      <span
                        className="h-[1px] border-white border-opacity-25 w-full border-t"
                        aria-hidden
                      />
                      <Link
                        className="flex items-center gap-2 text-white dark:text-[#f8f8f8] font-medium"
                        href="/intentions"
                      >
                        <CirclePlusIcon className="h-5 w-5" />
                        <span>Intentions</span>
                      </Link>
                      <span
                        className="h-[1px] border-white border-opacity-25 w-full border-t"
                        aria-hidden
                      />
                      <Link
                        className="flex items-center gap-2 text-white dark:text-[#f8f8f8] font-medium"
                        href="/progress"
                      >
                        <ActivityIcon className="h-5 w-5" />
                        <span>Progress</span>
                      </Link>
                      <span
                        className="h-[1px] border-white border-opacity-25 w-full border-t"
                        aria-hidden
                      />
                      <Link
                        className="flex items-center gap-2 text-gray-200 dark:text-[#f8f8f8] font-medium"
                        href="/about"
                      >
                        <InfoIcon className="h-5 w-5" />
                        <span>About</span>
                      </Link>
                      <span
                        className="h-[1px] border-white border-opacity-25 w-full border-t"
                        aria-hidden
                      />
                    </div>
                    <div className="flex justify-center flex-col gap-6 items-center p-6">
                      <Image
                        alt="Mary"
                        className="rounded-lg h-[200px] w-[200px] "
                        height={200}
                        src={"/rosary.png"}
                        width={200}
                      />
                      {user && (
                        <Button
                          onClick={() => signOut()}
                          className="flex w-[70%] mt-auto   mx-auto"
                        >
                          <LogOutIcon className="h-5 w-5" />
                          Sign Out
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </SheetOverlay>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
