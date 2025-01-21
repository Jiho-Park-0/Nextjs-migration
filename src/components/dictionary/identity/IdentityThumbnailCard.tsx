import Link from "next/link";
import Image from "next/image";

interface IdentityThumbnailCardProps {
  id: number;
  grade: number;
  name: string;
  character: string;
  imageBefore: string;
  imageAfter: string;
  isSync: boolean;
}

const IdentityThumbnailCard = ({
  id,
  grade,
  name,
  character,
  imageBefore,
  imageAfter,
  isSync,
}: IdentityThumbnailCardProps) => {
  const calculateTextSize = (text: string): string => {
    if (text.length > 14) {
      return "text-[0.46rem] sm:text-[0.65rem] leading-[1.05] sm:leading-[1.1]";
    } else if (text.length > 7) {
      return "text-[0.48rem] sm:text-[0.72rem] leading-[1.09] sm:leading-[1.16]";
    } else {
      return "";
    }
  };

  return (
    <Link href={`/identity/${id}`}>
      <div className=" bg-primary-500 rounded-lg p-[10px] hover:scale-105">
        <div className="flex justify-between items-center">
          <div>
            <Image
              key={grade}
              src={`/assets/common/${grade}.webp`}
              alt={`grade-${grade}`}
              width={40} // Tailwind에서 크기 조정을 하므로 설정하지 않음
              height={28}
              style={{ width: 40, height: 28 }}
              className="object-contain h-full w-full"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-0 justify-center text-center items-center w-full h-6 sm:h-10 text-[0.5rem] sm:text-[0.8rem] leading-[1.1] sm:leading-[1.2]">
            <span className={`${calculateTextSize(name)}`}>{name}</span>
            <span className="">{character}</span>
          </div>
        </div>
        {!isSync ? (
          <Image
            src={imageBefore}
            alt="beforeImage"
            className="rounded-lg w-full"
            width={1024}
            height={1024}
            loading="lazy"
          />
        ) : (
          <Image
            src={imageAfter ? imageAfter : imageBefore}
            alt="afterImage"
            className="rounded-lg"
            width={1024}
            height={1024}
            loading="lazy"
          />
        )}
      </div>
    </Link>
  );
};

export default IdentityThumbnailCard;
