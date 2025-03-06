export const login = async (
  email: string,
  password: string,
  lat: number,
  long: number
) => {
  const response = await fetch("http://localhost:8000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, lat, long }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

export const userDetail = async () => {
  const response = await fetch("http://localhost:8000/api/users/user-list", {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No User Found");
  }

  return response.json();
};

export const userDetailById = async () => {
  
  const response = await fetch(
    `http://localhost:8000/api/users/user/67907d45d5a632d71baf79a3`,
    {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "No User Found");
  }

  return response.json();
};
