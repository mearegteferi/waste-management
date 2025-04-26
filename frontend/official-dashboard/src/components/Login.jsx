import { useState } from "react";

function Login(){

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("submission")
  }
  
    return(
        <>
        <div>
            <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div>
            <label className="">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className=""
            />
          </div>

          <div>
            <label className="text-red-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className=""
            />
            </div>

            <button
                type="submit"
                className=""
              >
                Login
              </button>
        </form>
        </>
    )
}

export default Login;