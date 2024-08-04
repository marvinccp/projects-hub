export const isTokenExpired = (token: string): boolean => {
  return !token ? true : false;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expired = payload.exp * 1000;
  return Date.now() >= expired;
};

export const refreshToken = async () => {
  const storedRefreshToken = localStorage.getItem("refreshToken");
  if (!storedRefreshToken) {
    console.error("No refresh token available");
    return;
  }

  const response = await fetch("https://nest-basic-production.up.railway.app/auth/refresh-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: storedRefreshToken }),
  });

  if (response.ok) {
    const result = await response.json();
    localStorage.setItem("accessToken", result.accessToken);
    if (result.newRefreshToken) {
      localStorage.setItem("refreshToken", result.newRefreshToken);
    }
    return result.accessToken;
  } else {
    console.error("Token refresh failed");
  }
};

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const fetchWithAuth = async (
  url: string,
  options: FetchOptions = {}
): Promise<Response> => {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("No access token available");
    throw new Error("No access token available");
  }
  console.log(isTokenExpired(accessToken));
  if (isTokenExpired(accessToken)) {
    try {
      accessToken = await refreshToken();
      if (!accessToken) {
        throw new Error("Unable to refresh access token");
      }
      localStorage.setItem("accessToken", accessToken); 
    } catch (error) {
      console.error("Token refresh failed", error);
      throw new Error("Token refresh failed");
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response);
  if (response.status === 401) {
    console.error("Unauthorized request");
  }

  return response;
};
