import LoginForm from "../components/login/form";

export default function LoginPage() {
  return (
    <div className="w-full h-full" id="wrapper">
      <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
          <div className="flex h-36 w-full items-center justify-center rounded-lg bg-tenjin-primary p-3">
            <div className="w-full text-center text-white">
              <h1 className="text-3xl font-semibold">Our Bank</h1>
              <h5 className="text-sm">Banking Platform</h5>
            </div>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
