interface WeeklyDataProps {
  name: string;
  character: string;
}

const WeeklyData: React.FC<WeeklyDataProps> = ({ name, character }) => {
  return (
    <div className="text-sm lg:text-lg md:text-base">
      <div>이번주 최다 검색</div>
      <div>
        <span>{name}</span>
        <span>{character}</span>
      </div>
    </div>
  );
};

export default WeeklyData;
