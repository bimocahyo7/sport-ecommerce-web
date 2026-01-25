import { FiFastForward } from "react-icons/fi";
import Button from "../ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section id="hero-section" className="container mx-auto min-h-screen flex pb-20 pt-36">
      <div className="relative self-center">
        <Image
          src="/images/img-basketball.png"
          alt="Basketball Ornament"
          width={432}
          height={423}
          className="grayscale-25 absolute left-0 -top-30"
        />
        <div className="relative ml-30 w-full pr-20">
          <div className="text-primary italic bg-red-400/20 h-10 w-50 pl-9 pt-2 rounded-full">Friday Sale, 50%</div>
          <h1 className="font-extrabold text-[85px] italic leading-tight bg-linear-to-b from-black to-[#979797D1] bg-clip-text text-transparent">
            WEAR YOUR <br /> TOP-QUALITY <br /> SPORTSWEAR
          </h1>
          <p className="w-1/2 mt-7 leading leading-loose">
            Engineered for endurance and designed for speed. Experience gear that moves as fast as you do. Premium
            fabrics. Unmatched comfort. Limitless motion.
          </p>
          <div className="flex gap-5 mt-6">
            <Button>
              Explore More <FiFastForward />
            </Button>
            <Button variant="ghost">
              Watch Video <Image src="/images/icon-play-video.svg" alt="Icon Play Video" width={29} height={29} />
            </Button>
          </div>
        </div>
        <Image
          src="/images/img-hero.png"
          alt="Image Hero"
          width={700}
          height={950}
          className="absolute -right-10 top-1/2 -translate-y-1/2"
        />
      </div>
      <Image
        src="/images/img-ornament-hero.svg"
        alt="Circle Ornament"
        width={400}
        height={400}
        className="absolute -right-52.5 top-1/2 -translate-y-1/2"
      />
    </section>
  );
};

export default HeroSection;
