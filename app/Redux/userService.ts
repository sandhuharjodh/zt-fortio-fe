export const login = async (
  email: string,
  password: string,
) => {
  const response = await fetch(
    "http://stgn.appsndevs.com:51878/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

export const userDetail = async () => {
  const response = await fetch(
    "http://stgn.appsndevs.com:51878/api/users/user-list",
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

export const userDetailById = async (userId: any) => {
  const response = await fetch(
    `http://stgn.appsndevs.com:51878/api/users/user/${userId}`,
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
