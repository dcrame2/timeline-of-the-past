export async function createUser(
  username?: string,
  email?: string,
  password?: string,
  firstName?: string,
  lastName?: string
) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password, firstName, lastName }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong while creating user "
    );
  }

  return data;
}
