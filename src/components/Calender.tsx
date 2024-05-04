"use client";
import React from "react";
import CalenderUI from "@/components/reusable/Calender";
type Props = {};

export const Calender = (props: Props) => {
  return (
    <div className="rounded-lg backdrop-blur-xl bg-opacity-20 bg-white p-6 flex items-center justify-center flex-col shadow dark:bg-gray-800">
      <CalenderUI />
    </div>
  );
};

export default Calender;
