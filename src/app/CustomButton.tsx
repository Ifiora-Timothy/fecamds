"use client";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/hooks/useUser";
import { updateLastSubmissionDate } from "@/lib/functions/actions";
import React, { useContext, useEffect, useState } from "react";
import {
  Clock1,
  Clock2,
  Clock10,
  Clock11,
  Clock12,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
} from "lucide-react";
import { TimerIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { UserContext } from "@/context/userContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type Props = {
  isExpired: boolean;
};

const CustomButton = ({ isExpired }: Props) => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const calculateTimeRemaining = () => {
    const currentTime = new Date();
    const tomorrow = new Date(currentTime);
    tomorrow.setDate(currentTime.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeRemaining = tomorrow.getTime() - currentTime.getTime();

    return timeRemaining;
  };

  //set different clock icons for different times per second
  const TimerIcon = [
    <Clock1 key={1} height={16} width={16} />,
    <Clock2 key={2} height={16} width={16} />,
    <Clock3 key={3} height={16} width={16} />,
    <Clock4 key={4} height={16} width={16} />,
    <Clock5 key={5} height={16} width={16} />,
    <Clock6 key={6} height={16} width={16} />,
    <Clock7 key={7} height={16} width={16} />,
    <Clock8 key={8} height={16} width={16} />,
    <Clock9 key={9} height={16} width={16} />,
    <Clock10 key={10} height={16} width={16} />,
    <Clock11 key={11} height={16} width={16} />,
    <Clock12 key={12} height={16} width={16} />,
  ];

  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const formatTime = (time: number) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  const handleUpdate = () => {
    if (isExpired || isSubmitted) {
      toast.message("Your enthusiasm is truly appreciated", {
        description:
          "please remember that you can only mark your presence once a day",
      });
    } else {
      try {
        updateLastSubmissionDate(user?.email!);
        toast.success("Thank you for your commitment to the the Rosary", {
          description: "We look forward to seeing you again tomorow",
        });

        setUser({ ...user!, signedToday: true });
        setIsSubmitted(true);
        router.refresh();
      } catch (err) {
        toast.error("something went wrong", {
          description: "try again later",
        });
      }
    }
  };
  return (
    <Button
      key={isExpired ? "expired" : "submit"}
      aria-disabled={isExpired || isSubmitted}
      onClick={handleUpdate}
      className="rounded-lg min-w-[170px] flex items-center bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
    >
      <span className="mr-2">
        {isExpired || isSubmitted ? "Come back in: " : "Submit"}
      </span>
      <span
        className={clsx("flex gap-[1px] items-center ", {
          "text-red-500":
            !isExpired &&
            timeRemaining &&
            Math.round(timeRemaining / (1000 * 60 * 60)) < 1,
          "text-green-200":
            isExpired ||
            (timeRemaining &&
              Math.round(timeRemaining / (1000 * 60 * 60)) >= 1),
        })}
      >
        {timeRemaining
          ? TimerIcon[Math.round(timeRemaining / 1000) % 12]
          : TimerIcon[0]}{" "}
        {timeRemaining && formatTime(timeRemaining)}
      </span>
    </Button>
  );
};

export default CustomButton;
