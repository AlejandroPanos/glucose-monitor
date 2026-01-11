import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import LogView from "../../components/private/LogView";

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
