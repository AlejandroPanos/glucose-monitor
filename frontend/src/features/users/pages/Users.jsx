import PageBar from "../../../components/ui/PageBar";
import PageHeader from "../../../components/ui/PageHeader";
import UsersList from "../components/UsersList";

const Users = () => {
  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Users" text="Track all the users from the app." />
        <UsersList />
      </div>
    </>
  );
};

export default Users;
