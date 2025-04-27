import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(watch());
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#141b2d]">
      <div className="flex flex-col bg-gray-400 px-24 pb-16">
        <h1 className="self-center p-8 font-sans font-semibold text-3xl">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit())} className="flex flex-col gap-4" noValidate>
          <div>
            <input
              type="email"
              placeholder="email"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "invalid email",
                },
              })}
              className="bg-white border border-black p-2 rounded-2xl"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password must be at least 6 characters",
                },
              })}
              className="bg-white border border-black p-2 rounded-2xl"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="bg-blue-700 text-white font-sans rounded-full px-4 py-2 mt-4">
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
