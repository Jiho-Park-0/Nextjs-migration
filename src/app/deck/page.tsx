import DeckMaking from "@/components/deck/DeckMaking";

export default function DeckListPage() {
  return (
    <div>
      <h1 className="text-lg md:text-2xl font-bold text-primary-100 font-sans">
        인격 한 눈에 보기
      </h1>

      <DeckMaking />
    </div>
  );
}
