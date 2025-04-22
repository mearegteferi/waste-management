function Login(){
    return(
        <>
        <div>
            <h1>Login</h1>
        </div>
        <form>
            <label>email</label>
            <Field
                  name="email"
                  type="email"
                  className=""
                />
            <label>password</label>
            <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className=""
                  />
        </form>
        </>
    )
}

export default Login;