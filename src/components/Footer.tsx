import Image from "next/image";
import Link from "next/link";

const QUICK_LINKS = [
  { href: "/privacy", title: "Privacy" },
  { href: "/terms", title: "Terms & Conditions" },
  { href: "/shipping", title: "Shipping Details" },
  { href: "/cancellation-refund", title: "Cancellation & Refund" },
];

const Footer = () => {
  return (
    <div className="bg-brand-blue px-3 text-white md:px-20">
      <div className="flex flex-col items-center gap-y-8 border-b border-b-white/30 px-2 pt-14 pb-10 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div className="w-72">
          <Image
            src="/clickd_white.svg"
            alt="clickd Logo"
            height={125}
            width={125}
            className="mx-auto mb-4 cursor-pointer sm:mb-2"
          />
          <div className="text-lg font-semibold leading-6">
            Create Beautiful Photo Strips From Your Favorite Memories. Perfect
            For Weddings, Parties, And Special Occasions.
          </div>
        </div>
        <div>
          <div className="mb-2 text-[25px] font-medium">Socials</div>
          <div className="flex flex-row gap-x-5 sm:flex-col">
            <a
              href="https://www.instagram.com/click_.d/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-lg font-medium transition-opacity hover:opacity-80"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/919841105220"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-lg font-medium transition-opacity hover:opacity-80"
            >
              Whatsapp
            </a>
          </div>
        </div>
        <div>
          <div className="mb-2 text-[25px] font-medium">Quick Links</div>
          <div className="flex flex-row flex-wrap justify-center gap-x-5 sm:flex-col">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit cursor-pointer text-lg font-medium transition-opacity hover:opacity-80"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-2 pb-10 text-center text-white">
        © 2025 Clickd. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
