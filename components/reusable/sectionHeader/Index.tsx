import BackButton from "../backButton/Index";

export default function SectionHeader({
  heading,
  button,
  backButton,
}: {
  heading: string;
  button?: React.JSX.Element;
  backButton?: boolean;
}) {
  return (
    <div className="md:flex md:items-center md:justify-between mb-3">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-lightBlue sm:truncate sm:text-3xl sm:tracking-tight">
          {heading}
        </h2>
      </div>
      <div className="mt-3 flex sm:ml-4 sm:mt-0 gap-1.5">
        {backButton && <BackButton />}
        {button}
      </div>
    </div>
  );
}
