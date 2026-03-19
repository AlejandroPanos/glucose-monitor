import PageBar from "../../../components/ui/PageBar";
import PageHeader from "../../../components/ui/PageHeader";
import LogView from "../components/LogView";

const Log = () => {
  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Log" text="Check your log and edit it as you like." />
        <LogView />
      </div>
    </>
  );
};

export default Log;
