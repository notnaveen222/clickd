import { Card, CardContent } from "@/components/ui/card";

interface FAQProp {
  title: string;
  description: string;
}

const FaqBox = ({ title, description }: FAQProp) => {
  return (
    <Card className="w-10/12 border-gray-200 bg-[#F6F6F6] px-6 shadow-md md:w-9/12 md:px-8 lg:w-5/12">
      <CardContent className="p-0">
        <div className="mb-2 text-[20px] font-medium">{title}</div>
        <div className="text-17 text-[#6E6E6E] opacity-85">{description}</div>
      </CardContent>
    </Card>
  );
};

export default FaqBox;
