import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

interface UserData {
  enteredfirstName?: string;
  enteredLastName?: string;
}

interface PeopleDataProps {
  userData?: UserData[];
}

function PeopleFeed({ peopleData }: { peopleData: PeopleDataProps }) {
  return (
    <>
      {peopleData &&
        peopleData?.userData?.map((people, index: number) => {
          const { enteredfirstName, enteredLastName } = people;
          return (
            <>
              <p>{enteredfirstName}</p>
              <p>{enteredLastName}</p>
            </>
          );
        })}
    </>
  );
}

export default PeopleFeed;
