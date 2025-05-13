import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

const initialBanners = [
  { src: '/home-banner/2.png', active: true },
  { src: '/home-banner/1.png', active: true },
  { src: '/home-banner/2.png', active: true },
  { src: '/home-banner/1.png', active: true },
];

const ConfigBanner = () => {
  const [banners, setBanners] = React.useState(initialBanners);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slides: {
      perView: 1,
      spacing: 0,
    },
  });

  // Xoá banner theo index
  const handleDelete = (index: number) => {
    const newBanners = banners.filter((_, i) => i !== index);
    setBanners(newBanners);
  };

  // Bật tắt active banner
  const handleToggleActive = (index: number) => {
    const newBanners = banners.map((banner, i) =>
      i === index ? { ...banner, active: !banner.active } : banner,
    );
    setBanners(newBanners);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base'>Hình ảnh giới thiệu ở trang chủ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid grid-cols-3 gap-3'>
            {banners.map((banner, idx) => (
              <div
                key={idx}
                className='p-2 h-[100px] flex flex-col gap-2 items-center justify-center border rounded-lg relative'
              >
                <img
                  src={banner.src}
                  alt={`Banner ${idx + 1}`}
                  className='w-full h-full object-cover rounded-md'
                />
                <div className='flex items-center gap-2 absolute top-0 right-0 p-1 bg-slate-300'>
                  <input
                    type='checkbox'
                    checked={banner.active}
                    onChange={() => handleToggleActive(idx)}
                    className='h-6 w-6 rounded-full border-gray-400 text-emerald-500 focus:ring-0'
                  />

                  <Button
                    size='icon'
                    variant='destructive'
                    onClick={() => handleDelete(idx)}
                    className='h-6 w-6 p-0'
                  >
                    <Trash2 className='h-3 w-3' />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className='p-3 border-l-2 border-l-gray-200 dark:border-l-gray-700'>
            <div className='relative rounded-lg overflow-hidden'>
              <div ref={sliderRef} className='keen-slider'>
                {banners
                  .filter((b) => b.active)
                  .map((item, idx) => (
                    <div key={idx} className='keen-slider__slide flex items-center justify-center'>
                      <img
                        src={item.src}
                        alt={`Banner ${idx + 1}`}
                        className='w-full h-[250px] object-cover rounded-lg'
                      />
                    </div>
                  ))}
              </div>

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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigBanner;
