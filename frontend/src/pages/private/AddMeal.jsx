import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import MealForm from "../../components/private/MealForm";

const AddMeal = () => {
  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Add Meals" text="Add a meal to your meal list." />
        <MealForm />
      </div>
    </>
  );
};

export default AddMeal;
