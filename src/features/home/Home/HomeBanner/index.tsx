import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContainerBox from '@/components/customs/ContainerBox';
const bannerImages = [
  '/home-banner/2.png',
  '/home-banner/1.png',
  '/home-banner/2.png',
  '/home-banner/1.png',
];
const HomeBanner = () => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slides: {
      perView: 1,
      spacing: 0,
    },
  });
  return (
    <ContainerBox>
      <div className='relative rounded-lg overflow-hidden'>
        <div ref={sliderRef} className='keen-slider'>
          {bannerImages.map((src, idx) => (
            <div key={idx} className='keen-slider__slide flex items-center justify-center'>
              <img
                src={src}
                alt={`Banner ${idx + 1}`}
                className='w-full h-[600px] object-cover rounded-lg'
              />
            </div>
          ))}
        </div>

        {/* Prev / Next buttons */}
        <Button
          size='icon'
          variant='secondary'
          onClick={() => instanceRef.current?.prev()}
          className='absolute top-1/2 left-4 -translate-y-1/2 z-10'
        >
          <ChevronLeft className='w-5 h-5' />
        </Button>
        <Button
          size='icon'
          variant='secondary'
          onClick={() => instanceRef.current?.next()}
          className='absolute top-1/2 right-4 -translate-y-1/2 z-10'
        >
          <ChevronRight className='w-5 h-5' />
        </Button>
      </div>
    </ContainerBox>
  );
};

export default HomeBanner;
