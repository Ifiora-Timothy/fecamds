import Footer from "@/components/reusable/Footer";
import Navbar from "@/components/reusable/Navbar";

export default function Component() {
  return (
    <div key="1" className="flex min-h-screen flex-col  dark:bg-gray-900">
      <Navbar />
      <main className="flex-1  dark:bg-[#1a1a1a] py-8 px-6">
        <div className="max-w-prose mt-10 mx-auto grid gap-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-200 dark:text-[#f8f8f8] mb-2">
              About
            </h2>
            <div className="bg-transparent  backdrop-blur-xl text-sm dark:bg-[#262626] rounded-lg shadow-lg p-6">
              <div
                style={{
                  fontFamily: "trajan",
                }}
                className="grid text-gray-200 max-w-prose text-base gap-4"
              >
                <p className=" dark:text-[#f8f8f8]">
                  This Marian Novena website was sponsored by the FECAMDS 026
                  class MBBS. We are a group of medical students dedicated to
                  promoting the devotion to the Blessed Virgin Mary through this
                  online platform.
                </p>
                <p className=" dark:text-[#f8f8f8]">
                  Our goal is to provide a space for people to come together and
                  pray the Marian Novena, a powerful prayer that has been a
                  source of comfort and strength for many throughout the
                  centuries. We believe that by fostering this devotion, we can
                  help to bring about a greater sense of unity and community
                  among believers.
                </p>
                <p className=" dark:text-[#f8f8f8]">
                  We are grateful to the FECAMDS 026 class MBBS for their
                  generous support in making this website possible. Their
                  commitment to the Blessed Mother and to the spiritual
                  well-being of others is truly inspiring.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
