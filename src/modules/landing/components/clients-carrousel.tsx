import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/components/ui/carousel";
import AutoScroll from 'embla-carousel-auto-scroll'
import IconCompanySampleOne from "@/assets/icons/patreon_dark.svg";
import IconCompanySampleTwo from "@/assets/icons/1password-dark.svg";
import IconCompanySampleThree from "@/assets/icons/axiom-wordmark-dark.svg";
import IconCompanySampleFour from "@/assets/icons/cal_dark.svg";
import IconCompanySampleFive from "@/assets/icons/instatus_dark.svg";
import IconCompanySampleSix from "@/assets/icons/ngrok-dark.svg";
import IconCompanySampleSeven from "@/assets/icons/prisma_dark.svg";
import IconCompanySampleEight from "@/assets/icons/railway_dark.svg";
import IconCompanySampleNine from "@/assets/icons/threads_dark.svg";

export default function ClientsCarrousel() {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        AutoScroll({ playOnInit: true, speed: 0.5}),
      ]}
    >
      <CarouselContent className="gap-4">
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleOne} />
            <img
              src={IconCompanySampleOne}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleTwo} />
            <img
              src={IconCompanySampleTwo}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleThree} />
            <img
              src={IconCompanySampleThree}
              alt="OFI Services concept Logo"
              width={100}
              height={100}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleFour} />
            <img
              src={IconCompanySampleFour}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleFive} />
            <img
              src={IconCompanySampleFive}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleSix} />
            <img
              src={IconCompanySampleSix}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleSeven} />
            <img
              src={IconCompanySampleSeven}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleEight} />
            <img
              src={IconCompanySampleEight}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleNine} />
            <img
              src={IconCompanySampleNine}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleOne} />
            <img
              src={IconCompanySampleOne}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleTwo} />
            <img
              src={IconCompanySampleTwo}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleThree} />
            <img
              src={IconCompanySampleThree}
              alt="OFI Services concept Logo"
              width={100}
              height={100}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleFour} />
            <img
              src={IconCompanySampleFour}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleFive} />
            <img
              src={IconCompanySampleFive}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleSix} />
            <img
              src={IconCompanySampleSix}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleSeven} />
            <img
              src={IconCompanySampleSeven}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleEight} />
            <img
              src={IconCompanySampleEight}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleNine} />
            <img
              src={IconCompanySampleNine}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleOne} />
            <img
              src={IconCompanySampleOne}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleTwo} />
            <img
              src={IconCompanySampleTwo}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleThree} />
            <img
              src={IconCompanySampleThree}
              alt="OFI Services concept Logo"
              width={100}
              height={100}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleFour} />
            <img
              src={IconCompanySampleFour}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleFive} />
            <img
              src={IconCompanySampleFive}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleSix} />
            <img
              src={IconCompanySampleSix}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleSeven} />
            <img
              src={IconCompanySampleSeven}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleEight} />
            <img
              src={IconCompanySampleEight}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
        <CarouselItem className="flex items-center max-w-[80px] ">
          <picture>
            <source src={IconCompanySampleNine} />
            <img
              src={IconCompanySampleNine}
              alt="OFI Services concept Logo"
              width={70}
              height={70}
            />
          </picture>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
