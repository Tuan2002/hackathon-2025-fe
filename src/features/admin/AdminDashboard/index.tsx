import EnumerationBox from './EnumerationBox';
import NewUserTable from './NewUserTable';
import NewDocumentTable from './NewDocumentTable';
import ConfigBanner from './ConfigBanner';
import OtherConfig from './OtherConfig';

const AdminDashboard = () => {
  return (
    <div className='space-y-8'>
      {/* 4 ô thống kê */}
      <EnumerationBox />

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        {/* Bảng người dùng mới */}
        <NewUserTable />

        {/* Bảng tài liệu mới */}
        <NewDocumentTable />
      </div>

      <div className='p-3 border-t-2 border-t-gray-200 dark:border-t-gray-700'>
        <h3 className='font-bold uppercase text-center'>Cấu hình hệ thống</h3>
      </div>

      <ConfigBanner />
      <OtherConfig />
    </div>
  );
};

export default AdminDashboard;
