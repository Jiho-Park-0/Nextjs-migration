import { TierData } from "@/interfaces/identity";
import TierCard from "./TierCard";

interface TierLineProps {
  title: string;
  data: TierData[];
  color: string;
  isSync: boolean;
}

const TierLine = ({ title, data, color, isSync }: TierLineProps) => {
  return (
    <div className="flex">
      <div
        className={`text-sm lg:text-xl font-semibold w-16 lg:w-24 h-auto flex items-center justify-center ${color}`}
      >
        {title}
      </div>
      <ul className="list-none flex flex-wrap items-center gap-2 w-full bg-primary-500">
        {data.map((item) => (
          <TierCard key={item.id} data={item} isSync={isSync} />
        ))}
      </ul>
    </div>
  );
};

export default TierLine;
