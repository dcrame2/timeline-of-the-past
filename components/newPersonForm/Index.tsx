import React from "react";
import TextInput from "../reusable/formFields/TextInput";
import { getSession } from "next-auth/react";

function NewPersonForm({ fetchData }: any) {
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);

  const submitNewPerson = async () => {
    const enteredfirstName = firstNameRef.current?.value;
    const enteredLastName = lastNameRef.current?.value;
    console.log(enteredfirstName, enteredLastName);

    const session = await getSession();
    const sessionUserEmail: string | null | undefined = session?.user?.email;
    console.log(sessionUserEmail, "session");

    await fetch("/api/people/people", {
      method: "POST",
      body: JSON.stringify({
        enteredfirstName,
        enteredLastName,
        sessionUserEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchData();
  };

  return (
    <>
      <TextInput
        name="firstName"
        label="First Name"
        placeholder="John"
        type="text"
        ref={firstNameRef}
      />
      <TextInput
        name="lastName"
        label="Last Name"
        placeholder="Doe"
        type="text"
        ref={lastNameRef}
      />
      <button onClick={submitNewPerson} type="submit">
        Submit New Person
      </button>
    </>
  );
}

export default NewPersonForm;
