import Image from "next/image";
import ProcessBox from "@/components/ProcessBox";
import FaqBox from "@/components/FaqBox";
import Footer from "@/components/Footer";
import RouterButton from "@/components/router-button";
import stripImage from "../../public/layouts/4photostrip.png";

export default function Home() {
  const processDescriptions = [
    "Take/Upload your favourite photos from your computer, phone.",
    "Choose the strip layout you wish to order and get photo strips that suit your style.",
    "Place your order and receive high-quality printed photo strips delivered to your door.",
  ];

  const FAQs = [
    {
      title: "How long does shipping take?",
      description:
        "Shipping typically takes 3-5 business days after your order is confirmed.",
    },
    {
      title: "Will my photos be saved?",
      description:
        "No. For your privacy, all uploaded photos are automatically deleted within 3 days after delivery.",
    },
    {
      title: "Do you provide refunds?",
      description:
        "We do not offer refunds as a standard policy. However, in the rare event of a critical issue, please contact our support team, and we will assist you.",
    },
  ];
  return (
    <>
      <div className="flex flex-col-reverse md:flex mb-12 lg:mb-28  md:flex-row px-5 lg:px-[10vw] w-full mt-5">
        <div className=" md:w-1/2 border overflow-hidden mb-9 sm:mb-0 flex justify-center border-black/15  rounded-2xl">
          <div className="flex relative ">
            <Image
              className="h-96 relative left-[43px] -bottom-9 rotate-z-[9deg] w-fit shadow-xl shadow-black"
              src={stripImage}
              alt="strip"
              priority
              placeholder="blur"
              height={1135}
              width={378}
            />
            <Image
              className="absolute -bottom-5  -left-10 -rotate-z-[10deg] h-96 w-fit shadow-xl shadow-black"
              src={stripImage}
              alt="strip"
              priority
              placeholder="blur"
              height={1135}
              width={378}
            />
          </div>
        </div>
        <div className="flex flex-col mb-5 sm:mb-0 justify-center gap-4 md:w-1/2">
          <div className="text-[55px]/15 font-bold text-center ">
            Photo Strips,
            <br /> delivered to your <br className="hidden sm:block" />
            door
          </div>
          <RouterButton
            styles="cursor-pointer text-white   bg-brand-blue/90 hover:bg-brand-blue hover:shadow-blue-500 hover:shadow-2xs transition-all duration-200 rounded-xl w-1/2 mx-auto py-2.5 flex items-center justify-center  font-bold text-2xl"
            title="Order Now"
            route="order"
          />
        </div>
      </div>
      <div className="flex flex-col lg:px-[15vw] w-full ">
        <div className="text-center text-[36px] font-semibold">
          How it works
        </div>
        <div className="text-center text-sub-text text-lg font-medium">
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
          <RouterButton
            styles="font-medium text-17 px-5 py-2 bg-[#D9D9D9]/70 hover:bg-[#D9D9D9] transition-all duration-150 my-8 rounded-full cursor-pointer"
            title="Start Creating Now"
            route="order"
          />
        </div>
      </div>
      <div className="text-center text-[36px] font-semibold mb-2">
        Frequently Asked Questions
      </div>
      <div className="text-center text-sub-color opacity-85 text-[20px] font-medium mb-10">
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
