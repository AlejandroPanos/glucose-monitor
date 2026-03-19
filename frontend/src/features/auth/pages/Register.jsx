import AuthHeader from "../components/AuthHeader";
import RegisterForm from "../components/RegisterForm";

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
