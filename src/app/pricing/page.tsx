import Image from "next/image";
import { stripLayouts } from "../order/components/LayoutForm";
export default function PricingPage() {
  return (
    <>
      <div className="flex grow justify-center items-center">
        <div className="border border-gray-200 mt-5 sm:mt-0 p-8 sm:px-28 mx-5 flex flex-col items-center rounded-xl shadow-md">
          <div className="font-semibold text-4xl text-center mb-2">Pricing</div>
          <div className=" text-sub-text font-medium text-center">
            These are our current available strip layouts and their respective
            pricing
          </div>
          <div className="text-sub-text font-medium mb-5">
            A lot more coming soon
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  w-fit">
            {stripLayouts.map((layout) => (
              <div
                key={layout.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md 
                    border-gray-200
                }`}
              >
                <div className="aspect-[2/3] bg-gray-100 rounded mb-3 flex items-center justify-center">
                  <Image
                    src={layout.image_url}
                    alt="Layout Image"
                    width={150}
                    height={250}
                    className="my-5 mx-10"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{layout.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {layout.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="bg-gray-100 text-gray-700 px-2 rounded-lg">
                    ₹{layout.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
