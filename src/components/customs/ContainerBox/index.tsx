interface ContainerBoxProps {
  children: React.ReactNode;
}
const ContainerBox = ({ children }: ContainerBoxProps) => {
  return (
    <div className='h-full w-full md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1300px] mx-auto px-2'>
      {children}
    </div>
  );
};

export default ContainerBox;
