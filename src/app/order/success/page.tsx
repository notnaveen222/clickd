import Image from "next/image";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.orderId ?? "";

  return (
    <div className="flex  items-center justify-center grow px-2">
      <div className="bg-green-500 flex flex-col items-center rounded-xl py-10 px-8 sm:px-10 text-white">
        <Image
          src="/check.png"
          alt="success tick icon"
          width={80}
          height={80}
          className="mb-2"
        />
        <div className="text-3xl font-semibold mb-2 text-center">
          Your Order is Confirmed!
        </div>
        <div className="font-semibold w-10/12 text-center mb-1">
          {"We've received your order, will be shipped in 3-5 business days."}
        </div>
        <div className="font-medium">
          Your OrderID: <span className="font-semibold">{orderId}</span>
        </div>
        <form action="/">
          <button
            type="submit"
            className="cursor-pointer border-2 mt-4 border-white rounded-lg bg-transparent px-3 py-1.5 font-semibold hover:bg-white hover:text-green-600 transition"
          >
            Back to home
          </button>
        </form>
      </div>
    </div>
  );
}
