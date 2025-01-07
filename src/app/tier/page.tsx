import TierTable from "@/components/tier/TierTable";
import Link from "next/link";

const TierListPage = () => {
  return (
    <div className="p-4">
      <div>
        <h1 className="text-lg md:text-2xl font-bold text-primary-100 font-sans">
          리세마라 티어표
        </h1>
        <p className="font-sansLight text-white text-xs md:text-sm">
          - 림버스 컴퍼니 최신 리세마라 티어표는{" "}
          <span className="underline">새로 시작하는 관리자</span>
          에게 도움이 되도록 초반 컨텐츠에서의 활용도 및 인격 사용 난이도를
          기준으로 제작되었습니다.{" "}
          <span className="underline">전체 컨텐츠의 성능 기준이 아님</span>을
          유의해주세요. <br />- 티어 출처는{" "}
          <Link href="https://gall.dcinside.com/mgallery/board/view/?id=limbuscompany&no=103495&page=1">
            <i>여기</i>
          </Link>
          이며 원본 작성자의 동의를 받아 제작되었습니다.
        </p>
      </div>

      <TierTable />
    </div>
  );
};

export default TierListPage;
