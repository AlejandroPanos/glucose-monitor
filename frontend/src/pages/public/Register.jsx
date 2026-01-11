import AuthHeader from "../../components/public/AuthHeader";
import RegisterForm from "../../components/public/RegisterForm";

const Register = () => {
  return (
    <>
      <section>
        <div className="p-4 flex flex-col items-start gap-8">
          <AuthHeader title="Register" text="Create your account." />
          <RegisterForm />
        </div>
      </section>
    </>
  );
};

export default Register;
