interface ErrorMessageProps {
  title?: string;
  message?: string;
}

const ErrorMessage = ({
  title = "앗! 에러가 발생했어요.",
  message = "째깍.. 째깍째깍?",
}: ErrorMessageProps) => {
  return (
    <div className="text-center mx-auto">
      <h2 className="text-primary-100 text-xl md:text-3xl">{title}</h2>
      <p className="text-primary-300 text-sm md:text-xl">{message}</p>
    </div>
  );
};

export default ErrorMessage;
