import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import SettingsForm from "../../components/private/SettingsForm";

const Settings = () => {
  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Account Settings" text="Edit your profile data." />
        <SettingsForm />
      </div>
    </>
  );
};

export default Settings;
