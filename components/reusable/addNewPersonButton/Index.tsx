import React from "react";
import { signOut } from "next-auth/react";

interface AddNewPersonProps {
  setShowAddPersonFields: React.Dispatch<React.SetStateAction<boolean>>;
  showAddPersonFields: boolean;
}

export default function AddNewPersonButton({
  setShowAddPersonFields,
  showAddPersonFields,
}: AddNewPersonProps) {
  function addNewPersonHandler() {
    // set state here
    setShowAddPersonFields(!showAddPersonFields);
  }
  return <button onClick={addNewPersonHandler}>Add New Person</button>;
}
