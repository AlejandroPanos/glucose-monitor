const AuthHeader = ({ title, text }) => {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-2 text-center">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="text-gray-600">{text}</p>
      </div>
    </>
  );
};

export default AuthHeader;
