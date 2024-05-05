"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import Footer from "@/components/reusable/Footer";
import {
  CalendarIcon,
  ClockIcon,
  CrossIcon,
} from "@/components/reusable/icons";
import Navbar, { exclude } from "@/components/reusable/Navbar";
import { format } from "date-fns";
import { DateFormatter } from "react-day-picker";

import { cn } from "@/lib/utils";
import { useUserInfo } from "@/hooks/useUser";
import {
  checkIfUserExists,
  getLastSubmissionDate,
  updateLastSubmissionDate,
} from "@/lib/functions/actions";
import { intentions } from "@/data";
import { use, useContext, useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { UserContext } from "@/context/userContext";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import Calender from "@/components/Calender";
import { SunMoon } from "lucide-react";

//const trajan = localFont({ src: "/font/TrajanPro.ttf" });

export default function Component() {
  const { user } = useUserInfo();
  const router = useRouter();
  const navget = usePathname();
  const { setUser } = useContext(UserContext);

  const mystriesByDay: {
    [key: number]: string;
  } = {
    1: "Joyful Mysteries",
    2: "Sorrowful Mysteries",
    3: "Glorious Mysteries",
    4: "Luminous Mysteries",
    5: "Joyful Mysteries",
    6: "Sorrowful Mysteries",
    0: "Glorious Mysteries",
  };

  useEffect(() => {
    const value = localStorage.getItem("fecamdsite");
    if (value) {
      setUser(JSON.parse(value));

      checkIfUserExists(JSON.parse(value).email).then((res) => {
        if (!res) {
          if (!exclude.includes(navget)) {
            router.push("/signup");
          }
        }
      });
    } else {
      if (!exclude.includes(navget)) {
        router.push("/signup");
      }
    }
  }, []);
  const [isExpired, setIsExpired] = useState(false);

  const fromDate: Date = new Date(2024, 4, 1);
  const toDate: Date = new Date(2024, 4, 30);

  const totalDays = toDate.getDate();
  const currentDate = new Date();
  const remDays = totalDays - currentDate.getDate();

  useEffect(() => {
    try {
      if (user) {
        const getLast = async (email: string) => {
          const lastSubmision = await getLastSubmissionDate(email);
          if (!lastSubmision) return;
          const res = JSON.parse(lastSubmision);
          if (res instanceof Error) {
            toast("please sign in to continue", {
              description: "an error occured",
              action: {
                label: "Sign In",
                onClick: () => {
                  router.push("/login");
                },
              },
            });
          } else {
            const lastSubDate = new Date(res[res.length - 1]);
            if (
              lastSubDate.getDate() === currentDate.getDate() &&
              lastSubDate.getMonth() === currentDate.getMonth() &&
              lastSubDate.getFullYear() === currentDate.getFullYear()
            ) {
              setIsExpired(true);
            }
          }
          //check if the last submission date is today and setIsExpired to true
        };
        getLast(user["email"]);
      }
    } catch (err) {
      console.log(err, "error");

      toast.error("something went wrong", {
        description: "try again later",
      });
    }
  }, [user?.email]);
  //

  //create a countdown timer
  //await getLastSubmissionDate;
  return (
    <div key="1" className="flex min-h-screen flex-col  dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 flex mt-auto mb-[100px] py-8 ">
        <div className="container mt-[10vh] mx-auto min-[440px]:px-16 px-8 sm:px-10 md:px-20 min-[870px]:px-32  lg:px-52">
          <div className="grid grid-cols-1  gap-4 sm:grid-cols-2">
            <div className="rounded-lg flex justify-center  backdrop-blur-xl backrop bg-opacity-20 bg-white p-6 shadow dark:bg-gray-800">
              <div className="max-w-[300px]">
                <div className="mb-11  mt-7 sm:mt-14 flex items-start justify-between">
                  <div className=" flex flex-col gap-1">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
                      <span className="text-gray-200 text-sm dark:text-gray-400">
                        Day {currentDate.getDate()} of {totalDays}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SunMoon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
                      <span
                        style={{
                          fontFamily: "trajan",
                        }}
                        className={cn(
                          "text-gray-300 text-xs dark:text-gray-400"
                        )}
                      >
                        {mystriesByDay[currentDate.getDay()]}{" "}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
                    <span className="text-gray-200 text-sm dark:text-gray-400">
                      {remDays} days left
                    </span>
                  </div>
                </div>
                <div className="mb-4 mt-10">
                  <div className="mb-1 block text-gray-100 dark:text-gray-200">
                    Prayer Intention
                  </div>
                  <div
                    style={{
                      fontFamily: "trajan",
                    }}
                    className={cn(
                      "w-full bg-opacity-45 rounded-lg border  border-gray-300 bg-gray-100 p-2 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                      //  trajan.className
                    )}
                  >
                    {intentions[currentDate.getDay()].intention}
                  </div>
                </div>
                <div className="flex justify-center sm:justify-end">
                  <CustomButton isExpired={isExpired} />
                </div>
              </div>
            </div>
            <Calender />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
