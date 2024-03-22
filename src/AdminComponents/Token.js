import { useState, useContext  } from "react";
import { AuthContext } from "../AuthContext";

export default function Token() {
  const { token } = useContext(AuthContext);
  return (
    <div>
      <div>Token: {token}</div>;
    </div>
  );
}
