import Image from "next/image";
import Link from "next/link";
import FaqBox from "@/components/FaqBox";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import stripImage from "../../public/layouts/4photostrip.png";
import HeroText from "@/components/home/HeroText";
import {
  FadeInAnimation,
  FadeUpAnimation,
  HoverImageScale,
} from "@/components/motion-wrappers";
import ProcessContainer from "@/components/home/Process";

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
      <div className="mb-12 mt-5 flex w-full flex-col-reverse px-5 md:flex md:flex-row lg:mb-28 lg:px-[10vw]">
        <div className="fadeInAnimationCSSClass mb-9 flex justify-center overflow-hidden rounded-2xl border border-black/10 opacity-0 sm:mb-0 md:w-1/2">
          <div className="relative flex">
            <FadeUpAnimation delay={0.3}>
              <HoverImageScale>
                <Image
                  className="relative left-[43px] -bottom-9 h-96 w-fit rotate-z-[9deg] shadow-xl shadow-black"
                  src={stripImage}
                  alt="strip"
                  priority
                  placeholder="blur"
                  height={1135}
                  width={378}
                />
                <Image
                  className="absolute -bottom-5 -left-10 h-96 w-fit -rotate-z-[10deg] shadow-xl shadow-black"
                  src={stripImage}
                  alt="strip"
                  priority
                  placeholder="blur"
                  height={1135}
                  width={378}
                />
              </HoverImageScale>
            </FadeUpAnimation>
          </div>
        </div>
        <div className="mb-5 flex flex-col justify-center gap-4 sm:mb-0 md:w-1/2">
          <HeroText />
          <FadeInAnimation delay={0.3}>
            <Button
              asChild
              size="lg"
              className="mx-auto h-auto w-1/2 rounded-xl py-2.5 text-2xl font-bold shadow-lg shadow-brand-blue/20 hover:shadow-xl"
            >
              <Link href="/order">Order Now</Link>
            </Button>
          </FadeInAnimation>
        </div>
      </div>
      <div className="flex w-full flex-col lg:px-[15vw]">
        <FadeInAnimation delay={0.4}>
          <div className="text-center text-[36px] font-semibold">
            How it works
          </div>
          <div className="text-center text-lg font-medium text-sub-text">
            creating your custom photo strips is easy with our simple 3-step
            process
          </div>
        </FadeInAnimation>
        <ProcessContainer processDescription={processDescriptions} />
        <div className="text-center">
          <Button
            asChild
            variant="secondary"
            className="my-8 h-auto rounded-full bg-[#D9D9D9]/70 px-5 py-2 text-[17px] font-medium hover:bg-[#D9D9D9]"
          >
            <Link href="/order">Start Creating Now</Link>
          </Button>
        </div>
      </div>
      <div className="mb-2 text-center text-[36px] font-semibold">
        Frequently Asked Questions
      </div>
      <div className="mb-10 text-center text-[20px] font-medium text-sub-text opacity-85">
        Find answers to common question asked about our service
      </div>
      <div className="mb-20 flex flex-col items-center gap-y-6">
        <FaqBox title={FAQs[0]["title"]} description={FAQs[0]["description"]} />
        <FaqBox title={FAQs[1]["title"]} description={FAQs[1]["description"]} />
        <FaqBox title={FAQs[2]["title"]} description={FAQs[2]["description"]} />
      </div>
      <Footer />
    </>
  );
}
