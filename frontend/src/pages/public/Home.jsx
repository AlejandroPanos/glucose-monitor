import { Database } from "lucide-react";

const Home = () => {
  return (
    <>
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10">
        <section>
          <div className="w-full py-4 mx-auto flex flex-col items-center justify-center gap-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-2xl border border-blue-400 bg-blue-100 text-blue-600 shadow-sm">
              <Database className="w-4 h-4" />
              <p>The power of data in your hand</p>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-6xl font-bold">Hello World</h1>
              <p className="text-gray-600">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div>{/* <img src="" alt="" /> */}</div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
