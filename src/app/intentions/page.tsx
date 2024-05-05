/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DSlcNo36kik
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Footer from "@/components/reusable/Footer";
import Navbar from "@/components/reusable/Navbar";
import { intentions } from "@/data";
import { CrossIcon } from "lucide-react";

export default function Component() {
  //   Sunday: World Peace and Private Intentions
  // Monday: Conversion of Souls
  // Tuesday: Academic Excellence of all FECAMDS '026 Members
  // Wednesday: Our Classmates, especially, FECAMDSites who have Resit
  // Thursday: Release of Souls in Purgatory
  // Friday: Success of FECAMDS Activities like the Alumni Homecoming, '023 Sendoff Ceremony, Symbiosis and Weekend Outreach
  // Saturday: Our Parents, Guardians, Family and Friends.
  // write it in a way that like tellin people to pray for these intentions

  return (
    <div key="1" className="flex min-h-screen flex-col  dark:bg-gray-900">
      <Navbar />
      <main className="flex-1   py-8 px-6 bg-fixed">
        <div className="max-w-4xl backdrop-blur-xl backrop bg-opacity-20  px-4 sm:px-20 py-5 shadow-white shadow rounded-lg mt-10 mx-auto grid gap-8">
          <section>
            <h2 className="text-2xl underline decoration-primary font-bold text-gray-200 dark:text-[#f8f8f8] mb-2">
              Daily Intentions
            </h2>
            <div className="bg-transparent    rounded-lg shadow-lg p-6 grid gap-4">
              {intentions.map((intention, index) => {
                return (
                  <>
                    {index !== 0 && (
                      <span
                        className="h-[1px] border-white border-opacity-25 w-full border-t"
                        aria-hidden
                      ></span>
                    )}
                    <div className="flex   justify-start items-center gap-2">
                      <div className="">
                        <CrossIcon className="text-base text-[#c62828] mt-1" />
                      </div>

                      <div>
                        <p className="text-gray-100 text-sm dark:text-[#f8f8f8] font-medium">
                          {intention.intention}
                        </p>
                        <p className="text-gray-300 text-xs dark:text-[#ccc] ">
                          {intention.day}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
