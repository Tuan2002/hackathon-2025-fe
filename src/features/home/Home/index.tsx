import HomeBanner from './HomeBanner';
import HomeCategory from './HomeCategory';
import HomeFeedback from './HomeFeedback';
import HomeHotDocument from './HomeHotDocument';

const HomePage: React.FC = () => {
  return (
    <div className='w-full'>
      <HomeBanner />
      <HomeCategory />
      <HomeHotDocument />
      <HomeFeedback />
    </div>
  );
};

export default HomePage;
