import { getSession } from "next-auth/react";
export const fetchData = async () => {
  try {
    const session = await getSession();
    if (!session) {
      return; // No session, no need to fetch data
    }
    const sessionUserEmail = session?.user?.email;
    console.log(session, "sessionsss BETTTT");

    const response = await fetch("/api/people/get-people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Include the sessionUserEmail in the request body
      body: JSON.stringify({ sessionUserEmail }),
    });
    console.log(response, "Response");
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const userData = await response.json();

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
