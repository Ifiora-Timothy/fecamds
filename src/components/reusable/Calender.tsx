"use client";
import { use, useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { DateFormatter } from "react-day-picker";
import { useUserInfo } from "@/hooks/useUser";
import { getLastSubmissionDate } from "@/lib/functions/actions";
import { toast } from "sonner";

type Props = {
  submitted: Date[];
};

export function checkDateEquality(date1: Date, date2: Date) {
  typeof date1;
  if (date1 instanceof Date && date2 instanceof Date) {
    const date1Day = date1.getDate();
    const date1Month = date1.getMonth();

    const date1Year = date1.getFullYear();
    const date2Month = date2.getMonth();
    const date2Day = date2.getDate();
    const date2Year = date2.getFullYear();

    return (
      date1Month === date2Month &&
      date1Day === date2Day &&
      date1Year === date2Year
    );
  } else {
    return false;
  }
}
export const Calender = ({ submitted }: Props) => {
  const { user } = useUserInfo();
  const fromDate: Date = new Date(2024, 4, 2);
  const startDate: Date = new Date(2024, 4, 6);
  const toDate: Date = new Date(2024, 4, 31);
  const FormatCaption: DateFormatter = (month, options) => {
    const emoji = "🌸";

    return (
      <>
        <span role="img">{emoji}</span>{" "}
        {format(month, "LLLL", { locale: options?.locale })}
      </>
    );
  };
  return (
    <div className="rounded-lg backdrop-blur-xl backrop bg-opacity-20 bg-white p-6 flex items-center justify-center flex-col shadow dark:bg-gray-800">
      <Calendar
        key={JSON.stringify(user)}
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
          head_cell: {
            color: "white",
            backgroundColor: "grey",
            margin: "0.2rem",
          },
        }}
        modifiers={{
          marked: (currDate) => {
            if (
              currDate.getDate() === new Date().getDate() &&
              user?.signedToday
            ) {
              return true;
            }

            let currentDate = new Date();
            if (currDate >= fromDate && currDate < currentDate) {
              if (currDate <= startDate) {
                return true;
              }
              let resp = false;

              const dateExists = submitted.find((date) =>
                checkDateEquality(date, currDate)
              );
              if (dateExists) {
                resp = true;
              }
              return resp;
            }
            return false;
          },
          missed: (currDate) => {
            let currentDate = new Date();
            if (currDate >= fromDate && currDate < currentDate) {
              if (currDate <= startDate) {
                return false;
              }
              let resp = false;
              const dateExists = submitted.find((date) =>
                checkDateEquality(date, currDate)
              );
              if (!dateExists) {
                resp = true;
              }
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
    </div>
  );
};

export default Calender;
