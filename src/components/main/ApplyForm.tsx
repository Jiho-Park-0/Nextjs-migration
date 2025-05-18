import Link from "next/link";

const ApplyForm = () => {
  return (
    <Link href="https://docs.google.com/forms/d/1C0jJuaS8GgATmrvetARmOqRER6dx_MWx-YhnPUQ54Xg/edit">
      <div className="w-full h-full bg-primary-100 text-primary-300 hover:text-primary-500 text-sm md:text-base lg:text-lg rounded-md p-2 md:p-4 lg:p-6 flex justify-center items-center">
        <span className="font-bold">단빵숲 프론트엔드 지원!</span>
      </div>
    </Link>
  );
};

export default ApplyForm;
