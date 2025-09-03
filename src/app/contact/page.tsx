import { Mail, Phone, UserRound } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <div className="flex grow justify-center items-center pt-2 sm:pt-0 mb-10 mb-0">
        <div className="border border-gray-200 gap-y-2 p-5 mx-5 flex flex-col items-center rounded-xl shadow-md">
          <UserRound className="w-10 h-10 " />

          <div className="font-semibold text-4xl mb-10 text-center">
            Contact Our Friendly Team
          </div>
          <div className="flex flex-col sm:flex-row gap-x-4 gap-y-4">
            <div className="border border-gray-200 rounded-xl shadow-md flex flex-col justify-between gap-y-12 px-4  py-5 w-72">
              <div>
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col w-fit">
                <div className="font-semibold text-xl">Call Us</div>

                <div className="font-medium text-sub-text  mb-2 ">
                  Feel free to text or call the below on any queries.
                </div>
                <div className="flex gap-x-2 items-center">
                  <div className="font-medium underline underline-offset-1">
                    +91 99628 70308
                  </div>
                </div>
                <div className="flex gap-x-2 items-center">
                  <div className="font-medium underline underline-offset-1">
                    +91 99404 76326
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl shadow-md flex flex-col justify-between gap-y-12 px-4  py-5 w-72">
              <div>
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col w-fit">
                <div className="font-semibold text-xl">Email Us</div>

                <div className="font-medium text-sub-text  mb-2 ">
                  Contact the below mail for anything related to quotation &
                  Physical Booth.
                </div>
                <div className="flex gap-x-2 items-center">
                  <div className="font-medium underline underline-offset-1"></div>
                </div>
                <div className="flex gap-x-2 items-center">
                  <a
                    href="mailto:clickd.ofc@gmail.com"
                    className="font-medium underline underline-offset-1"
                  >
                    clickd.ofc@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
