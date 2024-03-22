import React from "react";

export default function Header() {
  return (
    <div>
      <div className=" ml-52 flex h-20 justify-between">
        <img
          src={require("../../src/images/LOGO NEPHROLAI.png")}
          className=" w-30 mx-4 my-1 p-3"
          alt="Logo"
        />
       
      </div>
    </div>
  );
}
