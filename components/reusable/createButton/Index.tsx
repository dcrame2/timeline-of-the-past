import { variables } from "@/styles/Variables";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddIcon from "../svg/addIcon/Index";
import { fetchUserData } from "@/lib/fetchUserData";
import styled from "styled-components";

function CreateButton() {
  const [specificUserInfo, setSpecificUserInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  async function getUserInfo() {
    try {
      const userInfo = await fetchUserData();
      setSpecificUserInfo(userInfo);
      return userInfo;
    } catch (error) {
      console.error("Error fetching user data:", error);
      // You can handle the error here, such as throwing it or returning a default value
      return null;
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const remainingTimelines = specificUserInfo?.user?.remainingTimelines;

  function handleCreate() {
    setIsLoading(true);
  }
  return (
    <>
      {!isLoading ? (
        <Button
          style={{
            backgroundColor: `${variables.lightOrange}`,
            color: `${variables.white}`,
          }}
          as={Link}
          href={remainingTimelines === 0 ? "/auth/timeline" : "/auth/new"}
          startContent={<AddIcon color={`${variables.white}`} />}
          onClick={handleCreate}
        >
          Create
        </Button>
      ) : (
        <Button
          style={{
            backgroundColor: `${variables.lightOrange}`,
            color: `${variables.white}`,
          }}
          isLoading
          disabled
        >
          Creating
        </Button>
      )}
    </>
  );
}

export default CreateButton;
