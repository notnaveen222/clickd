import Image from "next/image";
import RouterButton from "./router-button";

const Footer = () => {
  return (
    <div className="bg-brand-blue text-white px-3 md:px-20">
      <div className="border-b border-b-white px-2 pt-14 pb-10 gap-y-5 flex sm:flex-row flex-col justify-between items-center sm:items-start text-center sm:text-left">
        <div className="w-72">
          <Image
            src="/clickd_white.svg"
            alt="clickd Logo"
            height={125}
            width={125}
            className="cursor-pointer mb-4 sm:mb-2 mx-auto"
          ></Image>
          <div className="text-lg font-semibold leading-6">
            Create Beautiful Photo Strips From Your Favorite Memories. Perfect
            For Weddings, Parties, And Special Occasions.
          </div>
        </div>
        <div className="">
          <div className="text-[25px] mb-2 font-medium ">Socials</div>
          <div className="flex flex-row gap-x-5 sm:flex-col">
            <a
              href="https://www.instagram.com/click_.d/"
              target="_blank"
              className="text-lg font-medium cursor-pointer"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/919841105220"
              target="_blank"
              className="text-lg font-medium cursor-pointer"
            >
              Whatsapp
            </a>
          </div>
        </div>
        <div className="">
          <div className="text-[25px] mb-2 font-medium">Quick Links</div>
          <div className="flex flex-row gap-x-5 sm:flex-col ">
            <RouterButton
              styles="text-lg w-fit font-medium cursor-pointer"
              route="privacy"
              title="Privacy"
            />
            <RouterButton
              styles="text-lg w-fit font-medium cursor-pointer"
              route="terms"
              title="Terms & Conditions"
            />
            <RouterButton
              styles="text-lg w-fit font-medium cursor-pointer"
              route="shipping"
              title="Shipping Details"
            />
            <RouterButton
              styles="text-lg w-fit font-medium cursor-pointer"
              route="cancellation-refund"
              title="Cancellation & Refund"
            />
            <RouterButton
              styles="text-lg w-fit font-medium cursor-pointer"
              route="terms"
              title="Terms & Conditions"
            />
          </div>
        </div>
      </div>
      <div className="text-white text-center pt-2 pb-10">
        © 2025 Clickd. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
