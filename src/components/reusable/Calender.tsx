"use client";
import { use, useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { DateFormatter } from "react-day-picker";
import { useUserInfo } from "@/hooks/useUser";
import { getLastSubmissionDate } from "@/lib/functions/actions";
import { toast } from "sonner";

type Props = {};

export function checkDateEquality(date1: Date, date2: Date) {
  typeof date1;
  if (date1 instanceof Date && date2 instanceof Date) {
    console.log("dates are instances of Date");
    const date1Day = date1.getDate();
    const date1Month = date1.getMonth();

    const date1Year = date1.getFullYear();
    const date2Month = date2.getMonth();
    const date2Day = date2.getDate();
    const date2Year = date2.getFullYear();
    console.log(date1Day, date1Month, date1Year);

    return (
      date1Month === date2Month &&
      date1Day === date2Day &&
      date1Year === date2Year
    );
  } else {
    console.log("dates are not instances of Date", date1, date2);
    return false;
  }
}
export const Calender = (props: Props) => {
  const [submitted, setSubmitted] = useState<Array<Date>>([]);
  const { user } = useUserInfo();
  //get the dates fom database
  useEffect(() => {
    try {
      if (user) {
        const getLast = async (email: string) => {
          const lastSubmision = await getLastSubmissionDate(email);
          if (!lastSubmision) return;
          const res = JSON.parse(lastSubmision);
          if (res instanceof Error) {
            console.error(res.message);
          } else {
            const tempDate: Array<Date> = [];
            res.map((date: string) => {
              tempDate.push(new Date(date));
            });
            setSubmitted(tempDate);
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

  const fromDate: Date = new Date(2024, 4, 1);
  const toDate: Date = new Date(2024, 4, 30);
  const FormatCaption: DateFormatter = (month, options) => {
    const emoji = "🌸";

    return (
      <>
        <span role="img">{emoji}</span>{" "}
        {format(month, "LLLL", { locale: options?.locale })}
      </>
    );
  };
  const [missed, setMissed] = useState<Date>(new Date(2024, 4, 2));
  return (
    <Calendar
      mode="single"
      formatters={{ formatCaption: FormatCaption }}
      //classNames=""
      classNames={{
        cell: "m-[1px] min-[420px]:m-[0.2rem] ",
        day: "hover:bg-white hover:text-black my-[0.1rem] mx-0 text-sm px-4 flex items-center justify-center py-1 w-[26px] rounded",
      }}
      styles={{
        head: {
          color: "white",
        },
        day: {
          //  color: "white",
        },
        head_cell: {
          color: "white",
          backgroundColor: "grey",
          margin: "0.2rem",
        },
        cell: {
          //  margin: "0.2rem",
        },
      }}
      modifiers={{
        marked: (currDate) => {
          let currentDate = new Date();
          if (currDate >= fromDate && currDate < currentDate) {
            // console.log(
            //   "currDate",
            //   currDate,
            //   "fromDate",
            //   fromDate,
            //   "currentDate",
            //   currentDate
            // );

            let resp = false;
            //    console.log(submitted.length, "submitted");

            submitted.map((date) => {
              if (checkDateEquality(date, currDate)) {
                resp = true;
                return;
              }
            });
            return resp;
          }
          return false;
        },
        missed: (currDate) => {
          let currentDate = new Date();
          if (currDate >= fromDate && currDate < currentDate) {
            // console.log(
            //   "currDate",
            //   currDate,
            //   "fromDate",
            //   fromDate,
            //   "currentDate",
            //   currentDate
            // );

            let resp = false;
            //    console.log(submitted.length, "submitted");

            submitted.map((date) => {
              if (!checkDateEquality(date, currDate)) {
                resp = true;
                return;
              }
            });
            return resp;
          }
          return false;
        },
      }}
      modifiersStyles={{
        today: {
          color: "white",
          backgroundColor: "black",
        },

        disabled: {
          color: "#ccc",
        },
        marked: {
          color: "white",
          backgroundColor: "green",
        },
        missed: {
          color: "white",
          backgroundColor: "orangered",
        },
      }}
      fromDate={fromDate}
      toDate={toDate}
      className="p-4 text-white"
    />
  );
};

export default Calender;
