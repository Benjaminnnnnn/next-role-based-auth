"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

type FormDataProps = {
  name: string;
  email: string;
  password: string;
};

const initialFormState = {
  name: "",
  email: "",
  password: "",
};

const UserForm = (props: Props) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataProps>(initialFormState);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2 mx-auto"
      >
        <h1>Create New User</h1>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          required
          value={formData.name}
          className="bg-slate-200 rounded py-1.5 px-3"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required
          value={formData.email}
          className="bg-slate-200 rounded py-1.5 px-3"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
          value={formData.password}
          className="bg-slate-200 rounded py-1.5 px-3"
        />
        <button className="mt-4 px-4 py-1.5 bg-indigo-500 text-white hover:bg-indigo-700 rounded">
          Create User
        </button>
      </form>

      <p className="text-red-500 text-2xl text-center rounded">
        {errorMessage}
      </p>
    </>
  );
};

export default UserForm;
