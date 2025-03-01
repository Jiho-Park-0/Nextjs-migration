import Link from "next/link";

const Donation = () => {
  return (
    <Link href="https://buymeacoffee.com/breadandsoup">
      <div className="w-full h-fit bg-yellow-800 text-primary-400 text-xs md:text-sm lg:text-base rounded-md p-2 md:p-4 lg:p-6  justify-between">
        {/* 빵, 수프만 볼드 */}
        <span className="font-bold">빵🍞 </span>하고{" "}
        <span className="font-bold">수프 🥣</span> 사주기
      </div>
    </Link>
  );
};

export default Donation;
