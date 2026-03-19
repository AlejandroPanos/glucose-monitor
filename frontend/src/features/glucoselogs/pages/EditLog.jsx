import PageBar from "../../../components/ui/PageBar";
import PageHeader from "../../../components/ui/PageHeader";
import LogEdit from "../components/LogEdit";

const EditLog = () => {
  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Edit Log" text="Edit the specific log." />
        <LogEdit />
      </div>
    </>
  );
};

export default EditLog;
