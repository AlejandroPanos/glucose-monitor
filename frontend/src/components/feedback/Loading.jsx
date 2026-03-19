const Loading = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-3 p-8">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-gray-500">Loading...</p>
      </div>
    </>
  );
};

export default Loading;
