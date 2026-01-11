import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import GlucoseChart from "../../components/private/GlucoseChart";
import GlucoseData from "../../components/private/GlucoseData";

const Dashboard = () => {
  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Dashboard" text="Track your glucose and check your stats." />
        <GlucoseChart />
        <GlucoseData />
      </div>
    </>
  );
};

export default Dashboard;
