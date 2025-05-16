import ButtonCustom from '@/components/customs/ButtonCustom';
import PublisherService from '@/services/publisherService';
import { useState } from 'react';
import { toast } from 'react-toastify';

const seedPublisherData = [
  {
    name: 'NXB Trẻ',
    email: 'contact@nxbtree.vn',
    phone: '02838212345',
    address: '161B Lý Chính Thắng, Quận 3, TP.HCM',
  },
  {
    name: 'NXB Kim Đồng',
    email: 'contact@nxbkimdong.vn',
    phone: '02439437715',
    address: '55 Quang Trung, Hà Nội',
  },
  {
    name: 'NXB Văn Học',
    email: 'contact@nxbvanhoc.vn',
    phone: '02439436647',
    address: '4 Đinh Lễ, Hoàn Kiếm, Hà Nội',
  },
  {
    name: 'NXB Tổng Hợp TP.HCM',
    email: 'info@tonghop.vn',
    phone: '02838222914',
    address: '62 Nguyễn Thị Minh Khai, Quận 1, TP.HCM',
  },
  {
    name: 'NXB Hội Nhà Văn',
    email: 'info@nxbhoinhavan.vn',
    phone: '02439437643',
    address: '65 Nguyễn Du, Hà Nội',
  },
  {
    name: 'NXB Phụ Nữ Việt Nam',
    email: 'contact@phunu.vn',
    phone: '02439432877',
    address: '39 Hàng Chuối, Hai Bà Trưng, Hà Nội',
  },
  {
    name: 'NXB Thanh Niên',
    email: 'info@thanhnien.vn',
    phone: '02439439420',
    address: '57 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
  },
  {
    name: 'NXB Lao Động',
    email: 'contact@laodong.vn',
    phone: '02439437589',
    address: '175 Giảng Võ, Đống Đa, Hà Nội',
  },
  {
    name: 'NXB Thế Giới',
    email: 'info@thegioi.vn',
    phone: '02438226696',
    address: '46 Trần Hưng Đạo, Hà Nội',
  },
  {
    name: 'NXB Dân Trí',
    email: 'contact@dantri.vn',
    phone: '02439438765',
    address: '187 Giảng Võ, Đống Đa, Hà Nội',
  },
  {
    name: 'NXB Chính Trị Quốc Gia Sự Thật',
    email: 'info@ctqgst.vn',
    phone: '02439438403',
    address: '6/86 Duy Tân, Cầu Giấy, Hà Nội',
  },
  {
    name: 'NXB Hồng Đức',
    email: 'contact@hongduc.vn',
    phone: '02439431234',
    address: '64 Lý Nam Đế, Hoàn Kiếm, Hà Nội',
  },
  {
    name: 'NXB Văn Hóa Văn Nghệ',
    email: 'info@vanhoavannghe.vn',
    phone: '02838292360',
    address: '88-90 Lý Tự Trọng, Quận 1, TP.HCM',
  },
  {
    name: 'NXB Giáo Dục Việt Nam',
    email: 'contact@giaoduc.vn',
    phone: '02437474963',
    address: '81 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
  },
  {
    name: 'NXB Mỹ Thuật',
    email: 'info@mythuat.vn',
    phone: '02439439392',
    address: '33 Hàng Chuối, Hai Bà Trưng, Hà Nội',
  },
  {
    name: 'NXB Công An Nhân Dân',
    email: 'contact@congan.vn',
    phone: '02439432567',
    address: '92 Nguyễn Du, Hà Nội',
  },
  {
    name: 'NXB Văn Hóa Thông Tin',
    email: 'info@vanhoathongtin.vn',
    phone: '02439439678',
    address: '87 Nguyễn Du, Hà Nội',
  },
  {
    name: 'NXB Thông Tấn',
    email: 'contact@thongtan.vn',
    phone: '02438226695',
    address: '79 Lý Thường Kiệt, Hà Nội',
  },
  {
    name: 'NXB Khoa Học & Kỹ Thuật',
    email: 'info@khoahockythuat.vn',
    phone: '02439431023',
    address: '47 Hàng Chuối, Hà Nội',
  },
  {
    name: 'NXB Y Học',
    email: 'contact@yhoc.vn',
    phone: '02438225956',
    address: '138A Giảng Võ, Hà Nội',
  },
  {
    name: 'NXB Văn Nghệ TP.HCM',
    email: 'info@vannghe.vn',
    phone: '02839302885',
    address: '81 Trần Quốc Thảo, Quận 3, TP.HCM',
  },
  {
    name: 'NXB Tư Pháp',
    email: 'contact@tuphap.vn',
    phone: '02437347100',
    address: '60 Dương Đình Nghệ, Cầu Giấy, Hà Nội',
  },
  {
    name: 'NXB Đại Học Quốc Gia Hà Nội',
    email: 'info@daihocqghn.vn',
    phone: '02437549760',
    address: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
  },
  {
    name: 'NXB Đại Học Sư Phạm',
    email: 'contact@daihocsp.vn',
    phone: '02438690275',
    address: '136 Xuân Thủy, Cầu Giấy, Hà Nội',
  },
  {
    name: 'NXB Thanh Hóa',
    email: 'info@thanhhoa.vn',
    phone: '02373850999',
    address: '25 Hạc Thành, Thanh Hóa',
  },
  {
    name: 'NXB Đà Nẵng',
    email: 'contact@danang.vn',
    phone: '02363827979',
    address: '155 Phan Châu Trinh, Đà Nẵng',
  },
  {
    name: 'NXB Cần Thơ',
    email: 'info@cantho.vn',
    phone: '02923825555',
    address: '3 Hòa Bình, Cần Thơ',
  },
  {
    name: 'NXB Văn Hóa Dân Tộc',
    email: 'contact@vanhoadantoc.vn',
    phone: '02439439898',
    address: '59 Giang Văn Minh, Ba Đình, Hà Nội',
  },
  {
    name: 'NXB Bách Khoa',
    email: 'info@bachkhoa.vn',
    phone: '02437564554',
    address: '1 Đại Cồ Việt, Hà Nội',
  },
  {
    name: 'NXB Nông Nghiệp',
    email: 'contact@nangnghiep.vn',
    phone: '02439439439',
    address: '79 Lý Thường Kiệt, Hà Nội',
  },
];

const SeedPublisher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleImportData = async () => {
    setIsLoading(true);
    try {
      seedPublisherData.forEach(async (author) => {
        const response = await PublisherService.createPublisher(author);
        console.log('response', response);
      });
    } catch {
      toast.error('Có lỗi xảy ra trong quá trình nhập dữ liệu');
    } finally {
      setIsLoading(false);
      toast.info('OK');
    }
  };
  return (
    <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4'>
      <h3>2. Nhập dữ liệu các nhà xuất bản</h3>
      <ButtonCustom isLoading={isLoading}>
        <span className='text-sm' onClick={handleImportData}>
          Nhập dữ liệu
        </span>
      </ButtonCustom>
    </div>
  );
};

export default SeedPublisher;
