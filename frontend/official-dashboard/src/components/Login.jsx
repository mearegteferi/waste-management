function Login(){
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