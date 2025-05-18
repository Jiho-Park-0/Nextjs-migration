import Image from "next/image";

const Donation = () => {
  return (
    <div className="w-full h-full bg-[#4385e9] text-primary-400 text-sm md:text-base lg:text-lg rounded-md p-1 md:p-2 lg:p-3 flex justify-center items-center">
      <Image
        src="/assets/donation/Toss.jpg"
        alt="Toss Logo"
        width={96}
        height={96}
        className="mr-2 rounded"
      />
      수프도 사주기
    </div>
  );
};

export default Donation;
