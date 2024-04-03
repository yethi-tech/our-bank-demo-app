"use client";
// import { authenticate } from "@/app/actions/authActions";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = e.currentTarget.userId.value;
    const password = e.currentTarget.password.value;
    if (!userId || !password) {
      return;
    }
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      userId,
      password,
    }).then(({ error }) => {
      if (error) {
        setError(error);
        setLoading(false);
      } else {
        router.refresh();
        router.push("/");
      }
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <form onSubmit={handleSubmit} name="login_form" id="login_form">
        <div className="grid grid-cols-12">
          <div className="my-3 col-span-12 flex items-center justify-center">
            <h2 className="text-base font-semibold underline">
              Login with your credentials
            </h2>
          </div>
          {error && (
            <div className="col-span-12 my-3">
              <h3 className="text-sm text-tenjin-error">{error}</h3>
            </div>
          )}
          <div className="col-span-12">
            <Input label="User ID" isRequired id="user_id" name="userId" />
          </div>
          <div className="col-span-12 mt-3">
            <Input
              label="Password"
              type="password"
              isRequired
              id="password"
              name="password"
            />
          </div>
          <div className="col-span-12 flex items-center justify-end mt-3 gap-2">
            <Button type="reset" size="small">
              Reset
            </Button>
            <Button
              loading={loading}
              id="loginButton"
              loadingText="Please Wait..."
              type="submit"
              size="small"
              variant="contained"
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
