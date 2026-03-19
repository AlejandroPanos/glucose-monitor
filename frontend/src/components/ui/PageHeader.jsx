const PageHeader = ({ title, text }) => {
  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="text-gray-600">{text}</p>
      </div>
    </>
  );
};

export default PageHeader;
