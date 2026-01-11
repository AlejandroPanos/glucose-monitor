import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import LogEdit from "../../components/private/LogEdit";

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
