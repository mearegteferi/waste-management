function Login(){
    return(
        <>
        <div>
            <h1>Login</h1>
        </div>
        <form>
            <label>email</label>
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