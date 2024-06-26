import { CrossIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function home() {
  return (
    <div key="1" className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#f8f8f8] dark:bg-gray-900">
        <Link className="flex items-center justify-center" href="#">
          <CrossIcon className="h-6 w-6 text-[#c62828]" />
          <span className="sr-only">Catholic Novena</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            href="#"
          >
            Novena
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            href="#"
          >
            Intentions
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            href="#"
          >
            Progress
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            href="#"
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f8f8] dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#c62828]">
                    Novena to the Blessed Virgin Mary
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-300">
                    Join us in this powerful devotion to the Mother of God. Pray
                    the Novena daily and track your progress.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#c62828] px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#b71c1c] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c62828] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-[#c62828] dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Update Novena
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-[#c62828] bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-[#c62828] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c62828] disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    View Intentions
                  </Link>
                </div>
              </div>
              <Image
                alt="Blessed Virgin Mary"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                height="550"
                src="/placeholder.svg"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#f8f8f8] px-3 py-1 text-sm dark:bg-gray-700 text-[#c62828]">
                  Daily Novena
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#c62828]">
                  Track Your Progress
                </h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  Easily keep track of your daily Novena prayers and add
                  personal intentions for each day.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold text-[#c62828]">
                          Daily Prayers
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Pray the Novena prayers each day and mark your
                          progress.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold text-[#c62828]">
                          Personal Intentions
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Add your own personal intentions to each day&apos;s
                          Novena.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold text-[#c62828]">
                          Progress Tracking
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          See your daily progress and stay motivated.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <Image
                  alt="Novena Progress"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="310"
                  src="/placeholder.svg"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f8f8] dark:bg-gray-900">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#c62828]">
                Join the Novena Community
              </h2>
              <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                Connect with others praying the Novena and share your personal
                intentions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#c62828] px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#b71c1c] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c62828] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-[#c62828] dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Join Now
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-[#c62828] bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-[#c62828] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c62828] disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#f8f8f8] dark:bg-gray-900">
        <p className="text-xs text-gray-700 dark:text-gray-300">
          © 2024 Catholic Novena. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
