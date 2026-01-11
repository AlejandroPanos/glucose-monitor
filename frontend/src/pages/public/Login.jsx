import AuthHeader from "../../components/public/AuthHeader";
import LoginForm from "../../components/public/LoginForm";

const Login = () => {
  return (
    <>
      <section>
        <div className="p-4 flex flex-col items-start gap-8">
          <AuthHeader title="Log In" text="Log into your account." />
          <LoginForm />
        </div>
      </section>
    </>
  );
};

export default Login;
