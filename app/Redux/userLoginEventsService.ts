export const loginEvents = async (userId: any) => {
  console.log(userId,"vccvvcvcv");
  
  const response = await fetch(
    `http://localhost:8000/api/users/fetch-user/${userId}`, // Send userId as a query parameter
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};