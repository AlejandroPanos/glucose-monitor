import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import LogForm from "../../components/private/LogForm";

const AddLog = () => {
  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Add Logs" text="Add a log to your log list." />
        <LogForm />
      </div>
    </>
  );
};

export default AddLog;
