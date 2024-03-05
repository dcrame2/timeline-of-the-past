import React from "react";
import { signOut } from "next-auth/react";
import NewPersonForm from "@/components/newPersonForm/Index";
import { AnimatePresence } from "framer-motion";

interface AddNewPersonProps {
  setShowAddPersonFields: React.Dispatch<React.SetStateAction<boolean>>;
  showAddPersonFields: boolean;
  fetchData?: () => void;
}

export default function AddNewPersonButton({
  setShowAddPersonFields,
  showAddPersonFields,
  fetchData,
}: AddNewPersonProps) {
  function addNewPersonHandler() {
    // set state here
    setShowAddPersonFields(!showAddPersonFields);
  }
  return (
    <>
      <button onClick={addNewPersonHandler}>Add New Person</button>
      <AnimatePresence mode="wait">
        {!showAddPersonFields && (
          <NewPersonForm
            setShowAddPersonFields={setShowAddPersonFields}
            fetchData={fetchData}
          />
        )}
      </AnimatePresence>
    </>
  );
}
