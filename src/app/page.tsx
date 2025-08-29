import Image from "next/image";
import strip from "../../public/layouts/1x4.svg";
import ProcessBox from "@/components/ProcessBox";
import PricingCard from "@/components/PricingCard";
import FaqBox from "@/components/FaqBox";
import Footer from "@/components/Footer";

export default function Home() {
  const processDescriptions = [
    "Take/Upload your favourite photos from your computer, phone.",
    "Choose the strip layout you wish to order and get photo strips that suit your style.",
    "Place your order and receive high-quality printed photo strips delivered to your door.",
  ];
  const planFeatures = {
    basic: [
      "3 photos per strip",
      "Standard templates",
      "Basic Filters",
      "Digital Copy Included",
    ],
    premium: [
      "4 photos per strip",
      "Premium Templates",
      "Advance Filters",
      "Custom Text",
      "2 Printed Copies",
    ],
    party: [
      "5 photos per strip",
      "All premium features",
      "Priority Shipping",
      "Digit Album included",
    ],
  };
  const FAQs = [
    {
      title: "How long does shipping take ?",
      description:
        "Standard Shipping takes 3-5 business days. premium and party packs include priority shipping ",
    },
    {
      title: "How long does shipping take ?",
      description:
        "Standard Shipping takes 3-5 business days. premium and party packs include priority shipping ",
    },
    {
      title: "How long does shipping take ?",
      description:
        "Standard Shipping takes 3-5 business days. premium and party packs include priority shipping ",
    },
  ];
  return (
    <>
      <div className="flex flex-col-reverse md:flex mb-12 lg:mb-28  md:flex-row px-10 lg:px-[10vw] w-full mt-5">
        <div className=" md:w-1/2 border overflow-hidden mb-5 sm:mb-0 flex justify-center border-black/15 rounded-2xl">
          <div className="flex relative">
            {/* <img
              className="h-96 relative left-[43px] -bottom-9 rotate-z-[9deg]"
              src={strip}
              alt="strip"
            /> */}
            <Image
              className="h-96 relative left-[43px] -bottom-9 rotate-z-[9deg]"
              src="/layouts/1x4.svg"
              alt="strip"
              height={1135}
              width={378}
            />
            <Image
              className="absolute -bottom-5  -left-10 -rotate-z-[10deg] h-96"
              src="/layouts/1x4.svg"
              alt="strip"
              height={1135}
              width={378}
            />
            {/* <img
              className="absolute -bottom-5  -left-10 -rotate-z-[10deg] h-96"
              src={strip}
              alt="strip"
            /> */}
          </div>
        </div>
        <div className="flex flex-col mb-5 sm:mb-0 justify-center gap-4 md:w-1/2">
          <div className="text-[55px]/15 font-bold text-center">
            Photo Strips,
            <br /> delivered to your <br />
            door
          </div>
          <button className="cursor-pointer text-white bg-brand-blue rounded-lg w-1/2 mx-auto h-10 flex items-center justify-center  font-bold text-2xl pb-1">
            Order Now
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:px-[15vw] w-full ">
        <div className="text-center text-[36px] font-medium">How it works</div>
        <div className="text-center desc-color text-lg">
          creating your custom photo strips is easy with our simple 3-step
          process
        </div>
        <div className="flex mb-10 sm:mb-0 flex-col items-center md:items-baseline   md:flex-row justify-center md:gap-x-8 lg:gap-x-16">
          <ProcessBox
            imageURL="image"
            title="1. Choose your images"
            description={processDescriptions[0]}
          />
          <ProcessBox
            imageURL="wand"
            title="2. Customize Design"
            description={processDescriptions[1]}
          />
          <ProcessBox
            imageURL="truck"
            title="3. Order and Recieve"
            description={processDescriptions[2]}
          />
        </div>
        <div className="text-center">
          <button className="font-medium text-17 px-5 py-2 bg-[#D9D9D9]/70 hover:bg-[#D9D9D9] transition-all duration-150 my-8 rounded-full cursor-pointer">
            Start Creating Now
          </button>
        </div>
      </div>
      <div className="text-center text-[36px] font-medium mb-2">
        Frequently Asked Questions
      </div>
      <div className="text-center desc-color opacity-85 text-[20px] font-medium mb-10">
        Find answers to common question asked about our service
      </div>
      <div className="flex flex-col gap-y-6 items-center mb-20">
        <FaqBox title={FAQs[0]["title"]} description={FAQs[0]["description"]} />
        <FaqBox title={FAQs[1]["title"]} description={FAQs[1]["description"]} />
        <FaqBox title={FAQs[2]["title"]} description={FAQs[2]["description"]} />
      </div>
      <Footer />
    </>
  );
}
