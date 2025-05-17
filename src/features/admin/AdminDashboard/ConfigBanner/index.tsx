/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  EyeClosedIcon,
  Edit,
  Trash,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { IBanner } from '@/types/bannerType';
import useBannerStore from '@/stores/bannerStore';
import { toast } from 'react-toastify';
import BannerService from '@/services/bannerService';
import { useEffect, useState } from 'react';
import CreateAndUpdateBannerModal from './CreateAndUpdateBannerModal';
import ModalConfirm from '@/components/customs/ModalConfirm';

const ConfigBanner = () => {
  const {
    listBanners,
    setListBanners,
    openModalCreateAndUpdateBanner,
    setOpenModalCreateAndUpdateBanner,
    openModalDeleteBanner,
    setOpenModalDeleteBanner,
    setCurrentBanner,
    deleteBanner,
    currentBanner,
    openModalChangeBannerStatus,
    updateBanner,
    setOpenModalChangeBannerStatus,
  } = useBannerStore();

  const [isLoading, setIsLoading] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slides: {
      perView: 1,
      spacing: 0,
    },
  });

  const handleOpenModalCreateAndUpdate = (banner: IBanner | null) => {
    setCurrentBanner(banner);
    setOpenModalCreateAndUpdateBanner(true);
  };

  const handleOpenModalDeleteBanner = (banner: IBanner) => {
    setCurrentBanner(banner);
    setOpenModalDeleteBanner(true);
  };

  const handleOpenModalChangeBannerStatus = (banner: IBanner) => {
    setCurrentBanner(banner);
    setOpenModalChangeBannerStatus(true);
  };

  const handleCloseModalChangeBannerStatus = () => {
    setOpenModalChangeBannerStatus(false);
    setCurrentBanner(null);
  };

  const handleCloseModalCreateAndUpdate = () => {
    setOpenModalCreateAndUpdateBanner(false);
    setCurrentBanner(null);
  };

  const handleConfirmDeleteBanner = async () => {
    if (currentBanner) {
      setIsLoading(true);
      try {
        const response = await BannerService.deleteBanner(currentBanner.id);
        if (response.statusCode === 200 || response.statusCode === 201) {
          toast.success('Xoá banner thành công');
          deleteBanner(currentBanner.id);
        }
      } catch (error: any) {
        toast.error(error?.message || 'Có lỗi xảy ra trong quá trình xoá banner');
      } finally {
        setOpenModalDeleteBanner(false);
        setCurrentBanner(null);
        setIsLoading(false);
      }
    }
  };

  const handleConfirmChangeBannerStatus = async () => {
    if (currentBanner) {
      setIsLoading(true);
      try {
        const response = await BannerService.changeBannerStatus(currentBanner.id);
        if (response.statusCode === 200 || response.statusCode === 201) {
          toast.success('Cập nhật trạng thái banner thành công');
          updateBanner(response.data);
        }
      } catch (error: any) {
        toast.error(error?.message || 'Có lỗi xảy ra trong quá trình cập nhật trạng thái banner');
      } finally {
        handleCloseModalChangeBannerStatus();
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
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
    fetchBanners();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base'>
          <div className='flex items-center gap-2 justify-between'>
            <span>Hình ảnh giới thiệu ở trang chủ</span>
            <Button onClick={() => handleOpenModalCreateAndUpdate(null)}>Thêm mới</Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className='grid grid-cols-2 gap-4'>
          {/* List banners dạng table */}
          <div className='max-h-[350px] overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-tranparent [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-track]:bg-transparent'>
            <div className='space-y-3'>
              {listBanners.map((banner, idx) => (
                <div
                  key={idx}
                  className='flex items-center gap-4 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all'
                >
                  {/* Cột 1: ảnh */}
                  <img
                    src={banner.image}
                    alt={`Banner ${idx + 1}`}
                    className='w-28 h-20 object-cover rounded-xl border border-gray-300 dark:border-gray-600'
                  />

                  {/* Cột 2: title, description, isActive */}
                  <div className='flex-1 space-y-1 overflow-hidden'>
                    <div className='font-semibold text-gray-900 dark:text-gray-100 truncate text-base'>
                      {banner.title}
                    </div>
                    <div className='text-sm text-gray-500 dark:text-gray-400 truncate'>
                      {banner.description}
                    </div>
                    <div>
                      {banner.isActive ? (
                        <span className='inline-block text-green-600 font-medium text-sm bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-lg'>
                          Hiển thị
                        </span>
                      ) : (
                        <span className='inline-block text-red-500 font-medium text-sm bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-lg'>
                          Ẩn
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cột 3: action dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='secondary' size='icon'>
                        <MoreVertical className='w-5 h-5 text-gray-700 dark:text-gray-300' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-48'>
                      <DropdownMenuItem
                        onClick={() => handleOpenModalChangeBannerStatus(banner)}
                        className='flex items-center gap-2'
                      >
                        {banner.isActive ? (
                          <>
                            <EyeClosedIcon className='w-4 h-4 text-red-500' />
                            <span>Ẩn</span>
                          </>
                        ) : (
                          <>
                            <Eye className='w-4 h-4 text-green-500' />
                            <span>Hiển thị</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleOpenModalCreateAndUpdate(banner)}
                        className='flex items-center gap-2'
                      >
                        <Edit className='w-4 h-4 text-green-500' />
                        <span>Chỉnh sửa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleOpenModalDeleteBanner(banner)}
                        className='flex items-center gap-2'
                      >
                        <Trash className='w-4 h-4 text-red-500' />
                        <span>Xoá</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>

          {/* Preview slider */}
          <div className='p-3 border-l-2 border-l-gray-200 dark:border-l-gray-700'>
            {listBanners.length > 0 && (
              <div className='relative rounded-lg overflow-hidden'>
                <div ref={sliderRef} className='keen-slider'>
                  {listBanners
                    .filter((b) => b.isActive)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className='keen-slider__slide flex items-center justify-center'
                      >
                        <img
                          src={item.image}
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
            )}
          </div>
        </div>
        <CreateAndUpdateBannerModal
          currentBanner={currentBanner}
          open={openModalCreateAndUpdateBanner}
          onClose={handleCloseModalCreateAndUpdate}
        />
        <ModalConfirm
          open={openModalDeleteBanner}
          onClose={() => {
            setOpenModalDeleteBanner(false);
            setCurrentBanner(null);
          }}
          isConfirming={isLoading}
          type='delete'
          title='Xoá banner'
          description={`Bạn có chắc chắn muốn xoá banner "${currentBanner?.title}" không?`}
          onConfirm={handleConfirmDeleteBanner}
        />
        <ModalConfirm
          isConfirming={isLoading}
          open={openModalChangeBannerStatus}
          onClose={handleCloseModalChangeBannerStatus}
          onConfirm={handleConfirmChangeBannerStatus}
          title={!currentBanner?.isActive ? 'Hiển thị banner' : 'Ẩn banner'}
          description={
            !currentBanner?.isActive
              ? 'Bạn có chắc chắn muốn hiển thị banner này không?'
              : 'Bạn có chắc chắn muốn ẩn banner này không?'
          }
          type='lock'
        />
      </CardContent>
    </Card>
  );
};

export default ConfigBanner;
