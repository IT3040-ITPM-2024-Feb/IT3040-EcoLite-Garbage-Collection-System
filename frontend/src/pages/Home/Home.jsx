import React from "react";

const Home = () => {

  const  role = window.localStorage.getItem("role");

  console.log (role);
  console.log("hello")
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
