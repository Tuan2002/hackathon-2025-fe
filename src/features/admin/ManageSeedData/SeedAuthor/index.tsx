import ButtonCustom from '@/components/customs/ButtonCustom';
import AuthorService from '@/services/authorService';
import { useState } from 'react';
import { toast } from 'react-toastify';

const seedAuthorData = [
  {
    name: 'Nguyễn Nhật Ánh',
    email: 'nguyen.nhat.anh@sachviet.vn',
    phone: '0905123456',
    address: 'Đà Nẵng, Việt Nam',
  },
  {
    name: 'Anh Khang',
    email: 'anh.khang@sachviet.vn',
    phone: '0905123457',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Hamlet Trương',
    email: 'hamlet.truong@sachviet.vn',
    phone: '0905123458',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Nguyễn Phong Việt',
    email: 'phong.viet@sachviet.vn',
    phone: '0905123459',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Dương Thụy',
    email: 'duong.thuy@sachviet.vn',
    phone: '0905123460',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'An Phương',
    email: 'an.phuong@sachviet.vn',
    phone: '0905123461',
    address: 'Hà Nội, Việt Nam',
  },
  {
    name: 'Hà Thanh Phúc',
    email: 'ha.thanh.phuc@sachviet.vn',
    phone: '0905123462',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Rosie Nguyễn',
    email: 'rosie.nguyen@sachviet.vn',
    phone: '0905123463',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Minh Niệm',
    email: 'minh.niem@sachviet.vn',
    phone: '0905123464',
    address: 'Lâm Đồng, Việt Nam',
  },
  {
    name: 'Tony Buổi Sáng',
    email: 'tony.buoisang@sachviet.vn',
    phone: '0905123465',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Hạ Vũ',
    email: 'ha.vu@sachviet.vn',
    phone: '0905123466',
    address: 'Hà Nội, Việt Nam',
  },
  {
    name: 'Trí',
    email: 'tri@sachviet.vn',
    phone: '0905123467',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Lưu Quang Minh',
    email: 'luu.quang.minh@sachviet.vn',
    phone: '0905123468',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Nhã Nam',
    email: 'nha.nam@sachviet.vn',
    phone: '0905123469',
    address: 'Hà Nội, Việt Nam',
  },
  {
    name: 'Phan Ý Yên',
    email: 'phan.y.yen@sachviet.vn',
    phone: '0905123470',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Vãn Tình',
    email: 'van.tinh@sachviet.vn',
    phone: '0905123471',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Lê Nguyễn Nhật Linh',
    email: 'le.nguyen.nhat.linh@sachviet.vn',
    phone: '0905123472',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Thùy Chi',
    email: 'thuy.chi@sachviet.vn',
    phone: '0905123473',
    address: 'Hà Nội, Việt Nam',
  },
  {
    name: 'Lê Minh Quốc',
    email: 'le.minh.quoc@sachviet.vn',
    phone: '0905123474',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Tùng Leo',
    email: 'tung.leo@sachviet.vn',
    phone: '0905123475',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Gào',
    email: 'gao@sachviet.vn',
    phone: '0905123476',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Trang Hạ',
    email: 'trang.ha@sachviet.vn',
    phone: '0905123477',
    address: 'Hà Nội, Việt Nam',
  },
  {
    name: 'Hoàng Anh Tú',
    email: 'hoang.anh.tu@sachviet.vn',
    phone: '0905123478',
    address: 'Hà Nội, Việt Nam',
  },
  {
    name: 'Phạm Lữ Ân',
    email: 'pham.lu.an@sachviet.vn',
    phone: '0905123479',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Tâm Phan',
    email: 'tam.phan@sachviet.vn',
    phone: '0905123480',
    address: 'Hà Nội, Việt Nam',
  },
  {
    name: 'Hoàng Yến Nhi',
    email: 'hoang.yen.nhi@sachviet.vn',
    phone: '0905123481',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Võ Diệu Thanh',
    email: 'vo.dieu.thanh@sachviet.vn',
    phone: '0905123482',
    address: 'TP.HCM, Việt Nam',
  },
  {
    name: 'Thiên Kim',
    email: 'thien.kim@sachviet.vn',
    phone: '0905123483',
    address: 'Hà Nội, Việt Nam',
  },
  {
    name: 'Minh Mẫn',
    email: 'minh.man@sachviet.vn',
    phone: '0905123484',
    address: 'Đà Nẵng, Việt Nam',
  },
  {
    name: 'Lý Thành Cơ',
    email: 'ly.thanh.co@sachviet.vn',
    phone: '0905123485',
    address: 'TP.HCM, Việt Nam',
  },
];

const SeedAuthor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleImportData = async () => {
    setIsLoading(true);
    try {
      seedAuthorData.forEach(async (author) => {
        const response = await AuthorService.createAuthor(author);
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
      <h3>1. Nhập dữ liệu các tác giả</h3>
      <ButtonCustom isLoading={isLoading}>
        <span className='text-sm' onClick={handleImportData}>
          Nhập dữ liệu
        </span>
      </ButtonCustom>
    </div>
  );
};

export default SeedAuthor;
