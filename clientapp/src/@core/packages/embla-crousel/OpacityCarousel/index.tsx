import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../style.css';
import Image from 'next/image';
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { usePrevNextButtons } from '../EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from '../EmblaCarouselDotButton';

const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);

  const tweenFactor = useRef(0);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);
  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === 'scroll';

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    },
    []
  );

  // useEffect(() => {
  //   const autoplay = emblaApi?.plugins()?.autoplay;
  //   if (!autoplay) return;

  //   setIsPlaying(autoplay.isPlaying());
  //   emblaApi
  //     .on("autoplay:play", () => setIsPlaying(true))
  //     .on("autoplay:stop", () => setIsPlaying(false))
  //     .on("reInit", () => setIsPlaying(autoplay.isPlaying()));
  // }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity);
  }, [emblaApi, setTweenFactor, tweenOpacity]);

  return (
    <div className="w-full embla ">
      <div className="embla__viewport relative" ref={emblaRef}>
        <div className="embla__container " onClick={toggleAutoplay}>
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <Image
                className="object-cover w-full max-h-96  block rounded-lg "
                src={`https://picsum.photos/600/350?v=${index}`}
                alt="Your alt text"
                height={500}
                width={500}
              />
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="flex space-x-2">
            {scrollSnaps.map((_, index) => {
              return (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={`mb-10 h-2 w-2 p-1.5 rounded-full ${
                    index === selectedIndex ? ' bg-white' : 'bg-white/80'
                  } hover:bg-white cursor-pointer  `}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

       
      </div> */}
    </div>
  );
};

export default EmblaCarousel;
