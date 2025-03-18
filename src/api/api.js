import API_CONFIG from "../config/api.config";

const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};

const refreshTokenApi = async (refreshToken) => {
    try {
      const response = await fetchWithConfig(`/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      return response;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  };

const fetchWithConfig = async (endpoint, options = {}, noBody = false) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const accessToken = localStorage.getItem("access_token");
  const headers = {
    ...API_CONFIG.HEADERS,
    ...(accessToken && accessToken !== "undefined"
      ? { Authorization: `Bearer ${accessToken}` }
      : {}),
    ...(options.headers || {}),
  };
  const defaultOptions = { ...options, headers };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.status.toString().startsWith("2")) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken && endpoint !== "/auth/refresh") {
        try {
          const authResponse = await refreshTokenApi(refreshToken);
          if (authResponse) {
            localStorage.setItem("access_token", authResponse.accessToken);
            localStorage.setItem("refresh_token", authResponse.refreshToken);
            localStorage.setItem("email", email);
            localStorage.setItem("role", authResponse.role);
            console.log(authResponse)
            return fetchWithConfig(endpoint, options, noBody);
          } else {
            handleLogout();
            throw new Error("Session expired");
          }
        } catch (refreshError) {
          handleLogout();
          throw new Error("Session expired");
        }
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } else {
        return noBody ? undefined : await response.json();
    }
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export const ApiService = {
  login: async (email, password) => {
    try {
      const response = await fetchWithConfig("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response) {
        localStorage.setItem("access_token", response.accessToken);
        localStorage.setItem("refresh_token", response.refreshToken);
        localStorage.setItem("email", email);
        localStorage.setItem("role", response.role);
        console.log(response)
      }
      return response;
    } catch (error) {
      if (error.message === "ACCOUNT_DELETED") {
        throw new Error("ACCOUNT_DELETED");
      }
      console.error("Login failed:", error);
      throw error;
    }
  },
  register: async (firstName, lastName, phoneNumber, email, password) => {
    try {
        const response = await fetchWithConfig("/auth/register/parent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({firstName, lastName, email, phoneNumber, password}),
        });
        if (response) {
          localStorage.setItem("access_token", response.accessToken);
          localStorage.setItem("refresh_token", response.refreshToken);
          localStorage.setItem("email", email);
          localStorage.setItem("role", response.role)
          console.log(response)
        }
        return response;
      } catch (error) {
        throw new Error("REGISTRATION_FAILED");
      }
  }
};
