import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import MealView from "../../components/private/MealView";

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
