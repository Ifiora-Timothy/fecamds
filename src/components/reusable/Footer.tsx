import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-white py-3  bg-opacity-10   bottom-0 z-10   w-full   backdrop-blur-xl   shadow dark:bg-gray-300">
      <div className="container mx-auto  flex-col sm:flex-row items-center justify-center  sm:justify-between px-4 sm:px-16">
        <p className="text-gray-200 text-center text-xs dark:text-gray-400">
          © 2024 Marian Novena. All rights reserved.
        </p>
        <div className="flex flex-col sm:flex-row text-xs justify-center sm:justify-center sm:gap-4 items-center space-x-4">
          <Link
            style={{
              margin: 0,
            }}
            className="text-gray-200 hover:text-gray-300  sm:w-fit  text-center m-0 w-full dark:text-gray-400 dark:hover:text-gray-200"
            href="#"
          >
            Designed and Developed by{" "}
            <span className="italic text-[10px] text-gray-400 underline">
              Ifiora Timothy
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
