import PageBar from "../../../components/ui/PageBar";
import PageHeader from "../../../components/ui/PageHeader";
import MealView from "../components/MealView";

const Meal = () => {
  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Meal" text="Check your meal and edit it as you like." />
        <MealView />
      </div>
    </>
  );
};

export default Meal;
