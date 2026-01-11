import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import MealEdit from "../../components/private/MealEdit";

const EditMeal = () => {
  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Edit Meal" text="Edit the specific meal." />
        <MealEdit />
      </div>
    </>
  );
};

export default EditMeal;
