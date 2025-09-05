import { FadeUpAnimation } from "../motion-wrappers";

export default function HeroText() {
  return (
    <FadeUpAnimation delay={0.3}>
      <div className="text-[55px]/15 font-bold text-center ">
        Photo Strips,
        <br /> delivered to your <br className="hidden sm:block" />
        door
      </div>
    </FadeUpAnimation>
  );
}
