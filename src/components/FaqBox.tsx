interface FAQProp {
  title: string;
  description: string;
}
const FaqBox = ({ title, description }: FAQProp) => {
  return (
    <div className="px-6 md:px-8 rounded-2xl  bg-[#F6F6F6] font-medium w-10/12 md:w-9/12 lg:w-5/12 shadow-md">
      <div className="mt-5 mb-4 text-[20px]">{title}</div>
      <div className="mb-5 text-17 opacity-85 text-[#6E6E6E]">
        {description}
      </div>
    </div>
  );
};

export default FaqBox;
