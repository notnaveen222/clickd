import tickIcon from "../assets/tick.png";

interface PricingCardProps {
  plan: string;
  price: string;
  description: string;
  features: string[];
  isPremium?: boolean;
}

const PricingCard = ({
  plan,
  price,
  description,
  features,
  isPremium,
}: PricingCardProps) => {
  return (
    <div
      className={`${
        isPremium
          ? "border-2 border-[#1A80E5] h-[500px] pt-8"
          : "pt-10 h-[450px]"
      } rounded-xl bg-[#D9D9D9]/50 flex flex-col items-center   px-[90px] `}
    >
      <div className={`font-medium text-[34px] mb-3`}>{plan}</div>
      <div className="text-[#1980E5] mb-2 text-[28px] font-medium">
        {price}{" "}
        <span className="text-[#6E6E6E] font-medium text-17">/strip</span>
      </div>
      <div className="text-[#6E6E6E] mb-5 font-medium text-17">
        {description}
      </div>
      <div>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 my-2">
            {/* <img src={tickIcon} alt="tick icon" className="w-4 h-4" /> */}
            <span className="text-lg     font-medium">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
