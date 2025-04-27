import Link from "next/link";

const Bbangchinko = () => {
  return (
    <Link href="https://bbangchinko.netlify.app/">
      <div className="w-full h-full bg-[#f0f4f8] text-[#42b983] text-sm md:text-base lg:text-lg rounded-md p-2 md:p-4 lg:p-6 flex justify-center items-center">
        <span className="font-bold">빵칭코 바로가기 </span>
      </div>
    </Link>
  );
};

export default Bbangchinko;
