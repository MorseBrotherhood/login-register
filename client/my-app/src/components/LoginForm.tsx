import React, { FC, useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <div className="login-form">
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button className="bbnt" onClick={() => store.login(email, password)}>Login</button>
      <button className="bbnt" onClick={() => store.registration(email, password)}>Registration</button>
    </div>
  );
};

export default observer(LoginForm);
