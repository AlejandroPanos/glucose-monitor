import PageBar from "../../../components/ui/PageBar";
import PageHeader from "../../../components/ui/PageHeader";
import MealForm from "../components/MealForm";

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
