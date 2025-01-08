import {
  blue,
  etc,
  green,
  navy,
  orange,
  purple,
  red,
  yellow,
} from "@/constants/identityKeyword";
import MyIdentityCard from "./MyIdentityCard";
import { Button, Collapse } from "@material-tailwind/react";
import { useState } from "react";
import Link from "next/link";
import { Identity } from "@/interfaces/identity";

interface ShowIdentityProps {
  identities: Identity[];
  mine: number[];
  setIsResult: (isResult: boolean) => void;
}

const ShowIdentity = ({ identities, mine, setIsResult }: ShowIdentityProps) => {
  const myRed = red.filter((item) => mine.includes(item));
  const myOrange = orange.filter((item) => mine.includes(item));
  const myYellow = yellow.filter((item) => mine.includes(item));
  const myGreen = green.filter((item) => mine.includes(item));
  const myBlue = blue.filter((item) => mine.includes(item));
  const myNavy = navy.filter((item) => mine.includes(item));
  const myPurple = purple.filter((item) => mine.includes(item));
  const myEtc = etc.filter((item) => mine.includes(item));

  const getFilteredIdentities = (ids: number[], colorArray: number[]) => {
    const filteredIdentities = identities.filter((identity) =>
      ids.includes(identity.id)
    );

    return filteredIdentities.sort(
      (a, b) => colorArray.indexOf(a.id) - colorArray.indexOf(b.id)
    );
  };

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <div>
      <p className="font-sansLight text-white text-xs md:text-sm mb-4">
        이미지를 캡처로 저장해 사용해보세요. 보유 인격이 하나도 없는 키워드는
        표시되지 않습니다.
        <br />* 기타 키워드에는 특정 키워드를 가지고 있지 않거나, 키워드를
        가지고 있더라도 거의 사용되지 않는 인격을 표시합니다.
      </p>
      <Button
        onClick={toggleOpen}
        placeholder={undefined}
        className="bg-primary-300 rounded-sm font-light text-xs md:text-sm mb-4"
      >
        사용 팁 보기
      </Button>
      <Collapse open={open} className="bg-primary-200">
        <p className=" font-body text-primary-500 text-xs md:text-sm p-8">
          - 순서가 앞일수록 내 덱에서 상대적으로 추천하는 인격이에요.
          <br /> -{" "}
          <Link href="/keyword" className="italic">
            키워드별 인격 메뉴
          </Link>
          와 함께 이용해보세요. 해당 메뉴에 없으면서 아래에 표시되는 인격은{" "}
          <span className="underline">추천 멤버는 아니지만</span> 인격이 모자란
          경우 임시로 쓸 만하다는 뜻이에요.
          <br /> - 인격이 많아서 고민되는 경우는 이미지 캡처 후 커뮤니티에
          물어보세요. 전체 사진을 첨부하여 진로상담을 요청해도 좋아요. 요청
          시에는 현재 어디까지 진행했는지, 하고싶은게 뭔지 알려주세요.
        </p>
      </Collapse>
      {myRed.length !== 0 && (
        <MyIdentityCard
          identities={getFilteredIdentities(myRed, red)}
          title="화상"
          color="border-res-red"
        />
      )}
      {myOrange.length !== 0 && (
        <MyIdentityCard
          identities={getFilteredIdentities(myOrange, orange)}
          title="출혈"
          color="border-res-orange"
        />
      )}
      {myYellow.length !== 0 && (
        <MyIdentityCard
          identities={getFilteredIdentities(myYellow, yellow)}
          title="진동"
          color="border-res-yellow"
        />
      )}
      {myGreen.length !== 0 && (
        <MyIdentityCard
          identities={getFilteredIdentities(myGreen, green)}
          title="파열"
          color="border-res-green"
        />
      )}
      {myBlue.length !== 0 && (
        <MyIdentityCard
          identities={getFilteredIdentities(myBlue, blue)}
          title="침잠"
          color="border-res-blue"
        />
      )}
      {myNavy.length !== 0 && (
        <MyIdentityCard
          identities={getFilteredIdentities(myNavy, navy)}
          title="호흡"
          color="border-res-navy"
        />
      )}
      {myPurple.length !== 0 && (
        <MyIdentityCard
          identities={getFilteredIdentities(myPurple, purple)}
          title="충전"
          color="border-res-purple"
        />
      )}
      {myEtc.length !== 0 && (
        <MyIdentityCard
          identities={getFilteredIdentities(myEtc, etc)}
          title="기타"
          color="border-black"
        />
      )}
      <div className="flex justify-end">
        <Button
          onClick={() => setIsResult(false)}
          placeholder={undefined}
          className="bg-primary-300"
        >
          다시하기
        </Button>
      </div>
    </div>
  );
};

export default ShowIdentity;
