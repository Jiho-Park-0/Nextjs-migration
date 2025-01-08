interface WeeklyDataProps {
  name: string;
  character: string;
}

const WeeklyData: React.FC<WeeklyDataProps> = ({ name, character }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Character: {character}</p>
    </div>
  );
};

export default WeeklyData;
