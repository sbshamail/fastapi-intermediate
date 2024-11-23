import React, { FC } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { CustomLink } from '@/@core/tag/CustomLink';

interface Props {
  data: { title: string; link: string; image: string }[];
}
const MyCarousel: FC<Props> = ({ data }) => {
  return (
    <div className="w-full  -mt-6 !p-0 ">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index}>
              <CustomLink href={item.link}>
                <div className="w-full  max-h-[418px] !m-0 !p-0 text-center">
                  {/* panoramic */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={418}
                  />
                </div>
              </CustomLink>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
