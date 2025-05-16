import CardScroll from '@/components/customs/CardScroll';
import SeedAuthor from './SeedAuthor';
import SeedPublisher from './SeedPublisher';
import SeedCategory from './SeedCategory';

const ManageSeedData = () => {
  return (
    <CardScroll title='Quản lý dữ liệu'>
      <SeedAuthor />
      <SeedPublisher />
      <SeedCategory />
      {/* <SeedDocument /> */}
    </CardScroll>
  );
};

export default ManageSeedData;
