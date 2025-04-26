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
    <form onSubmit={handleSubmit(onSubmit())} className="" noValidate>

      <div>
      <input
        type="email"
        placeholder="email"
        {...register("email", {
          required: "email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'invalid email'
          }
        }
        )}
        className=""
      />
      {errors.email && <p>{errors.email.message}</p>}
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
          className=""
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit" className="">
        login
      </button>
    </form>
  );
}

export default Login;
