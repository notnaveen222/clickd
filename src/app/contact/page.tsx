import { Mail, Phone, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="mb-10 flex grow items-center justify-center px-3 pt-2 sm:mb-0 sm:pt-0">
      <Card className="mx-2 flex w-full max-w-2xl flex-col items-center gap-y-2 border-gray-200 p-6 shadow-md sm:p-8">
        <CardContent className="flex flex-col items-center gap-y-6 p-0">
          <div className="flex size-14 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
            <UserRound className="size-7" />
          </div>

          <div className="text-center text-4xl font-semibold">
            Contact Our Friendly Team
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex w-72 flex-col justify-between gap-y-10 rounded-xl border border-gray-200 px-4 py-5 shadow-sm">
              <div className="flex size-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Phone className="size-4" />
              </div>
              <div className="flex w-fit flex-col">
                <div className="text-xl font-semibold">Call Us</div>
                <div className="mb-2 font-medium text-sub-text">
                  Feel free to text or call the below on any queries.
                </div>
                <a
                  href="tel:+919962870308"
                  className="font-medium underline underline-offset-2 hover:text-brand-blue"
                >
                  +91 99628 70308
                </a>
                <a
                  href="tel:+919940476326"
                  className="font-medium underline underline-offset-2 hover:text-brand-blue"
                >
                  +91 99404 76326
                </a>
              </div>
            </div>
            <div className="flex w-72 flex-col justify-between gap-y-10 rounded-xl border border-gray-200 px-4 py-5 shadow-sm">
              <div className="flex size-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Mail className="size-4" />
              </div>
              <div className="flex w-fit flex-col">
                <div className="text-xl font-semibold">Email Us</div>
                <div className="mb-2 font-medium text-sub-text">
                  Contact the below mail for anything related to quotation &
                  Physical Booth.
                </div>
                <a
                  href="mailto:clickd.ofc@gmail.com"
                  className="font-medium underline underline-offset-2 hover:text-brand-blue"
                >
                  clickd.ofc@gmail.com
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
