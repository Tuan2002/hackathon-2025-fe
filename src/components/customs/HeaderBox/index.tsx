import type React from 'react';

interface HeaderBoxProps {
  title?: string;
  description?: React.ReactNode;
  isUpperCase?: boolean;
  maxWidth?: string;
}

const HeaderBox = ({
  title = 'Truyền title vào nè',
  description,
  isUpperCase = false,
  maxWidth = '500px',
}: HeaderBoxProps) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col items-center text-center gap-3 my-8' style={{ maxWidth }}>
        <h1
          className={`text-[24px] font-medium text-blue-600 dark:text-blue-400 ${
            isUpperCase ? 'uppercase' : ''
          }`}
        >
          {title}
        </h1>
        <img className='w-[250px]' src='/trang-tri.png' alt='decorative' />
        <div className='text-[16px] text-gray-800 dark:text-gray-300'>{description}</div>
      </div>
    </div>
  );
};

export default HeaderBox;
