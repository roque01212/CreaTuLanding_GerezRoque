interface Props {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: Props) => {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl text-center font font-semibold mb-5">
        {title}
      </h1>

      {subtitle && <p className="opacity-70 text-center mb-5">{subtitle}</p>}
    </>
  );
};
