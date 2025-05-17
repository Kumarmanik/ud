import React from "react";

const Login = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Login to Image Search App</h1>
      <a href="/api/auth/google"><button>Login with Google</button></a><br/><br/>
      <a href="/api/auth/github"><button>Login with GitHub</button></a><br/><br/>
      <a href="/api/auth/facebook"><button>Login with Facebook</button></a>
    </div>
  );
};

export default Login;
