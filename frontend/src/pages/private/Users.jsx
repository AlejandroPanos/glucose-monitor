import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import UsersList from "../../components/private/UsersList";

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
