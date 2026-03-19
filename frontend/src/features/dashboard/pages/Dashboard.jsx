import PageBar from "../../../components/ui/PageBar";
import PageHeader from "../../../components/ui/PageHeader";
import GlucoseChart from "../components/GlucoseChart";
import GlucoseData from "../components/GlucoseData";

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
