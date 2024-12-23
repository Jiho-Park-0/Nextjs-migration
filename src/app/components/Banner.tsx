import Link from "next/link";

interface BannerProps {
  imageUrl: string;
  spanText: string;
  headingText: string;
  linkPath: string;
  linkText: string;
}

const Banner = ({
  imageUrl,
  spanText,
  headingText,
  linkPath,
  linkText,
}: BannerProps) => {
  return (
    <div className="relative h-28 md:h-72 lg:h-96 w-full font-sans md:font-sansBold">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        {/* 오버레이: 배경 이미지 위에 반투명한 레이어 */}
        <div className="absolute inset-0 bg-black bg-opacity-50">
          {/* 텍스트 오버레이 */}
          <div className=" z-10 flex items-center justify-start h-full pl-10">
            <div className="text-white">
              <span className="text-xs md:text-xl">{spanText}</span>
              <h1 className="text-md md:text-4xl font-bold mb-3 md:mb-8">
                {headingText}
              </h1>
              <Link
                href={linkPath}
                className="px-2 md:px-4 pt-2 md:pt-3 pb-1 md:pb-2 border border-white text-xs md:text-sm font-sans hover:animate-pulse"
              >
                {linkText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
