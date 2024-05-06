"use client";

import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { CrossIcon } from "@/components/reusable/icons";
import Navbar from "@/components/reusable/Navbar";
import Footer from "@/components/reusable/Footer";
import { BarChart } from "@/components/reusable/charts";
import { HeartHandshake, HelpingHand, Users } from "lucide-react";
import { useUserInfo } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { getAllFields } from "@/lib/functions/actions";

export default function Component() {
  const { user } = useUserInfo();
  const [fields, setFields] = useState<any[]>([]);
  useEffect(() => {
    const getAll = async () => {
      if (user) {
        const resp = await getAllFields(user.email);

        if (!resp) return;
        setFields(JSON.parse(resp));
      }
    };
    getAll();
  }, [user]);

  const getTotalRosariesPrayed = (): number => {
    let total = 0;
    fields.forEach((field) => {
      total += field.daysSubmitted.length;
    });
    return total;
  };
  return (
    <div key="1" className="flex min-h-screen flex-col  dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 py-8 ">
        <div className="container mx-auto mt-10 px-4">
          <div className="rounded-lg backdrop-blur-xl backrop md:mr-6 bg-opacity-5 bg-slate-50 shadow-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-2 text-2xl font-bold text-gray-200 dark:text-gray-200">
              Rosary Progress
            </h2>
            <div className="grid grid-cols-1   gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg  backdrop-blur-xl backrop bg-transparent shadow-gray-200 shadow  p-4 dark:bg-gray-800">
                <div className=" flex items-center justify-between">
                  <h3 className="mb-2 p-0 text-base font-bold text-gray-200 dark:text-gray-200">
                    Total Rosaries Prayed
                  </h3>{" "}
                  <HeartHandshake className="text-white" />{" "}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-200 dark:text-gray-200">
                    {getTotalRosariesPrayed()}
                  </span>
                  <span className="text-gray-100 dark:text-gray-400">
                    out of {fields?.length * 24}
                  </span>
                </div>
                <div className="mt-2">
                  <Progress
                    value={Math.floor(
                      (getTotalRosariesPrayed() / (fields.length * 30)) * 100
                    )}
                  />
                </div>
                {/* <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Keep up the great work! You're making steady progress in your
                  Marian devotion.
                </p> */}
              </div>
              <div className="rounded-lg  backdrop-blur-xl backrop bg-transparent shadow-gray-200 shadow p-4 dark:bg-gray-800">
                <div className=" flex items-center justify-between">
                  <h3 className="mb-2 p-0 text-base font-bold text-gray-200 dark:text-gray-200">
                    Participants
                  </h3>{" "}
                  <Users className="text-white" />{" "}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-200 dark:text-gray-200">
                    {fields.length}
                  </span>
                </div>
                <div className="mt-2">
                  <Progress value={fields.length / 0.9} />
                </div>
                {/* <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Join your fellow devotees in this Rosary Challenge. Your prayers
                  make a difference!
                </p> */}
              </div>
              <div className="rounded-lg  backdrop-blur-xl backrop bg-transparent shadow-gray-200 shadow p-4 dark:bg-gray-800">
                <div className=" flex items-center justify-between">
                  <h3 className="mb-2 p-0 text-base font-bold text-gray-200 dark:text-gray-200">
                    Average Rosaries Prayed
                  </h3>{" "}
                  <HelpingHand className="text-white" />{" "}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-200 dark:text-gray-200">
                    {Math.floor(
                      getTotalRosariesPrayed() / fields.length > 0
                        ? getTotalRosariesPrayed() / fields.length
                        : 1
                    )}
                  </span>
                </div>
                <div className="mt-2">
                  <Progress
                    value={
                      (getTotalRosariesPrayed() / fields.length > 0
                        ? getTotalRosariesPrayed() / fields.length
                        : 1) / 0.24
                    }
                  />
                </div>
                {/* <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Great job! Keep up the consistent prayer and inspire others to
                  join you.
                </p> */}
              </div>
            </div>
            <div className="rounded-lg  backdrop-blur-xl backrop mt-3 bg-transparent shadow-gray-200 shadow p-4 dark:bg-gray-800">
              <h3 className="mb-2 text-xl font-bold text-gray-200 dark:text-gray-200">
                Rosaries by Day
              </h3>
              <div className="mt-2 ">
                <BarChart
                  fields={fields}
                  key={user?.toString()}
                  className="h-[250px]  max-w-[900px]"
                />
              </div>
              <p className="text-gray-200 text-sm dark:text-gray-400">
                Keep up the great work! You&apos;re making steady progress in
                your Marian devotion.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
