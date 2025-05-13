/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContainerBox from '@/components/customs/ContainerBox';
import { useEffect } from 'react';
import BannerService from '@/services/bannerService';
import useBannerStore from '@/stores/bannerStore';
import { toast } from 'react-toastify';
const HomeBanner = () => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slides: {
      perView: 1,
      spacing: 0,
    },
  });
  const { listBanners, setListBanners } = useBannerStore();
  const fetchBanners = async () => {
    try {
      const response = await BannerService.getBanners();
      if ((response && response.statusCode === 200) || response.statusCode === 201) {
        setListBanners(response.data);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra trong quá trình lấy danh sách banner');
    }
  };
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);
  return (
    <ContainerBox>
      <div className='relative rounded-lg overflow-hidden'>
        {listBanners.length > 0 && (
          <div ref={sliderRef} className='keen-slider'>
            {listBanners.map((banner, idx) => (
              <div key={idx} className='keen-slider__slide flex items-center justify-center'>
                <img
                  src={banner.image}
                  alt={`Banner ${idx + 1}`}
                  className='w-full h-[600px] object-cover rounded-lg'
                />
              </div>
            ))}
          </div>
        )}

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
