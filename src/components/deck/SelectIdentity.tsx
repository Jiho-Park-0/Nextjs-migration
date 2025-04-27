import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { Identity } from "@/interfaces/identity";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

interface Props {
  identities: Identity[];
  setMine: (mine: number[]) => void;
  setIsResult: (isResult: boolean) => void;
}

const SelectIdentity = ({ identities, setMine, setIsResult }: Props) => {
  const [myList, setMyList] = useState<number[]>([]);
  const [isSelect, setIsSelect] = useState(false);
  const sinners = [
    "이상",
    "파우스트",
    "돈키호테",
    "료슈",
    "뫼르소",
    "홍루",
    "히스클리프",
    "이스마엘",
    "로쟈",
    "싱클레어",
    "오티스",
    "그레고르",
  ];

  const handleSelect = (identity: Identity) => {
    setMyList((prev) => {
      if (prev.includes(identity.id)) {
        return prev.filter((id) => id !== identity.id); // 이미 존재하면 제거
      } else {
        return [...prev, identity.id]; // 존재하지 않으면 추가
      }
    });
  };

  const handleSelectAll = () => {
    if (isSelect) {
      setMyList([]);
    } else {
      setMyList(identities.map((identity) => identity.id));
    }
    setIsSelect(!isSelect);
  };

  const handleSinnerAll = (sinner: string) => {
    setMyList((prev) => [
      ...prev,
      ...identities
        .filter((identity) => identity.character === sinner)
        .map((identity) => identity.id)
        .filter((id) => !prev.includes(id)),
    ]);
  };

  const handleSave = () => {
    setMine(myList);
    setIsResult(true);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <p className="font-sansLight text-white text-xs md:text-sm mb-10 ">
        <span>
          내가 보유한 인격을 모두 골라보세요. 아래 저장하기 버튼을 누르면 내가
          가진 인격을 키워드별로 볼 수 있어요.
        </span>
        <br />
        <span className="font-bold">일관 선택</span>
        <span>은 모든 인격들을 선택하실 수 있어요.</span>
        <br />
        <span>
          <span className="font-bold">수감자별 선택 버튼</span>은 해당 수감자의
          모든 인격들을 선택하실 수 있어요. 다만, 일관 선택과 다르게 취소하실
          경우 개별로 취소하셔야 해요.
        </span>
      </p>

      <Button
        className="min-w-[80px] flex gap-2 items-center bg-primary-400 px-2 md:px-4 py-0 md:py-1 font-sansLight text-sm md:text-base text-white hover:bg-primary-300 rounded"
        placeholder={undefined}
        onClick={handleSelectAll}
      >
        <span className="pt-1 whitespace-nowrap">일괄 선택</span>
        {isSelect ? (
          <FaCheckCircle className="text-primary-200" />
        ) : (
          <FaRegCircle className="text-primary-200" />
        )}
      </Button>

      {sinners.map((sinnerType) => (
        <div key={sinnerType} className="my-2">
          <span className="flex items-center justify-between">
            <h3 className="text-primary-100">{sinnerType}</h3>
            <Button
              className="min-w-[80px] flex gap-2 items-center bg-primary-400 px-2 md:px-4 py-0 md:py-1 font-sansLight text-sm md:text-base text-white  rounded"
              placeholder={undefined}
              onClick={() => handleSinnerAll(sinnerType)}
            >
              <span className="pt-1 whitespace-nowrap">{sinnerType} 선택</span>
            </Button>
          </span>

          <hr className="border-primary-100 mt-1 mb-2" />
          <ul className="flex gap-2 flex-wrap">
            {identities
              .filter((identity) => identity.character === sinnerType)
              .map((identity) => (
                <li key={identity.id}>
                  <button
                    className={`w-28 ${
                      myList.includes(identity.id) ? "" : "opacity-50"
                    }`}
                    onClick={() => handleSelect(identity)}
                  >
                    <div
                      className={`w-28 h-20 rounded-full overflow-hidden ${
                        myList.includes(identity.id) ? "" : "grayscale"
                      }`}
                    >
                      <Image
                        src={identity.beforeImage.trimEnd()}
                        alt={identity.name}
                        className="object-contain w-full h-full scale-150"
                        width={1024}
                        height={1024}
                      />
                    </div>
                    <span
                      className={`text-sm tracking-tight break-keep ${
                        myList.includes(identity.id)
                          ? "text-primary-100"
                          : "text-gray-500"
                      }`}
                    >
                      {identity.name}
                    </span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <Button
          onClick={handleSave}
          placeholder={undefined}
          className="bg-primary-300"
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default SelectIdentity;
