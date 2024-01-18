import Users from "../../components/Users";
import React from "react";

function page() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      role: "admin",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      role: "user",
    },
    {
      id: 3,
      name: "John Smith",
      email: "janedoe@gmail.com",
      role: "user",
    },
    {
      id: 4,
      name: "Jane Smith",
      email: "janedoe@gmail.com",
      role: "user",
    },
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      role: "admin",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      role: "user",
    },
    {
      id: 3,
      name: "John Smith",
      email: "janedoe@gmail.com",
      role: "user",
    },
    {
      id: 4,
      name: "Jane Smith",
      email: "janedoe@gmail.com",
      role: "user",
    }
  ]
  return <Users users={users} />;
}

export default page;
