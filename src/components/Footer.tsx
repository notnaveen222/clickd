import RouterButton from "./router-button";

const Footer = () => {
  return (
    <div className="bg-brand-blue text-white px-3 md:px-20">
      <div className="border-b border-b-white px-2 pt-14 pb-10 gap-y-5 flex sm:flex-row flex-col justify-between items-center sm:items-start text-center sm:text-left">
        <div className="w-72 ">
          <div className="text-3xl font-bold mb-2">Clickd</div>
          <div className="text-lg font-semibold leading-6">
            Create beautiful photo strips from your favorite memories. Perfect
            for weddings, parties, and special occasions.
          </div>
        </div>
        <div className="">
          <div className="text-[25px] mb-2  ">Socials</div>
          <div className="flex flex-row gap-x-5 sm:flex-col">
            <a
              href="https://www.instagram.com/click_.d/"
              target="_blank"
              className="text-lg cursor-pointer"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/919841105220"
              target="_blank"
              className="text-lg cursor-pointer"
            >
              Whatsapp
            </a>
          </div>
        </div>
        <div className="">
          <div className="text-[25px] mb-2 ">Quick Links</div>
          <div className="flex flex-row gap-x-5 sm:flex-col ">
            <RouterButton
              styles="text-lg w-fit cursor-pointer"
              route=""
              title="Home"
            />
            <RouterButton
              styles="text-lg w-fit cursor-pointer"
              route="order"
              title="Order"
            />
            <RouterButton
              styles="text-lg w-fit cursor-pointer"
              route="contact"
              title="Contact"
            />
          </div>
        </div>
      </div>
      <div className="text-white text-center pt-2 pb-10">
        © 2025 Pixi. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
