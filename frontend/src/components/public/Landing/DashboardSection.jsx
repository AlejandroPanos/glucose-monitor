import laptop from "../../../images/laptop.png";

const DashboardSection = () => {
  return (
    <>
      <section id="dashboard">
        <div className="p-2 md:p-3 flex items-center border border-gray-300 rounded-2xl md:rounded-4xl">
          <div className="p-2 md:p-3 flex items-center border border-gray-300 rounded-2xl md:rounded-4xl">
            <div
              className="w-full px-4 md:px-6 py-8 md:py-12 flex flex-col gap-8 md:gap-12 items-center justify-center border border-gray-300 rounded-2xl md:rounded-4xl bg-white"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 2px)`,
                backgroundSize: "20px 20px",
              }}
            >
              <div className="w-full md:w-2/3">
                <p className="text-xl md:text-2xl text-gray-600">
                  <span className="text-black">
                    GlucoTrack is the new way of managing your diabetes.
                  </span>{" "}
                  Take a data driven approach to manage diabetes and reduce long term risks.
                </p>
              </div>
              <img
                className="w-full h-auto"
                src={laptop}
                alt="A MacBook Pro with the GlucoTrack dashboard"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardSection;
