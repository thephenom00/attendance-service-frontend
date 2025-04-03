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

    if (!response.status.toString().startsWith("2") && !response.status === "403") {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken && endpoint !== "/auth/refresh") {
        try {
          console.log("REFRESH TOKEN")
          const authResponse = await refreshTokenApi(refreshToken);
          if (authResponse) {
            localStorage.setItem("access_token", authResponse.accessToken);
            localStorage.setItem("refresh_token", authResponse.refreshToken);
            console.log(authResponse);
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
  register: async (firstName, lastName, phoneNumber, email, password) => {
    try {
      const response = await fetchWithConfig("/auth/register/parent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        }),
      });
      return response;
    } catch (error) {
      throw new Error("REGISTRATION_FAILED");
    }
  },

  /* III FETCH ALL UPCOMING TRAININGS OF A TRAINER */
  getTrainerUpcomingTrainings: async (email) => {
    try {
      const response = await fetchWithConfig(
        `/trainer/${email}/trainingUnit/upcoming`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("REGISTRATION_FAILED");
    }
  },

  /* IV FETCH ALL PAST TRAININGS OF A TRAINER */
  getTrainerPastTrainings: async (email) => {
    try {
      const response = await fetchWithConfig(
        `/trainer/${email}/trainingUnit/past`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("REGISTRATION_FAILED");
    }
  },

  /* V UPDATES A DESCRIPTION OF PAST TRAINING UNIT */
  updateTrainingUnitDescription: async (id, description) => {
    try {
      const response = await fetchWithConfig(
        `/trainingUnit/${id}/description`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "text/plain",
          },
          body: description,
        }
      );
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("REGISTRATION_FAILED");
    }
  },

  /* VI GETS THE TRAINING UNIT BY ID */
  getTrainingUnitById: async (id) => {
    try {
      const response = await fetchWithConfig(`/trainingUnit/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("REGISTRATION_FAILED");
    }
  },

  /* VII GETS ALL TRAINER ATTENDANCES OF TRAINING UNIT BY ID */
  getTrainerAttendancesByTrainingUnitId: async (id) => {
    try {
      const response = await fetchWithConfig(
        `/trainingUnit/${id}/trainerAttendance`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("REGISTRATION_FAILED");
    }
  },

  /* VIII GETS ALL CHILD ATTENDANCES OF TRAINING UNIT BY ID */
  getChildAttendancesByTrainingUnitId: async (id) => {
    try {
      const response = await fetchWithConfig(
        `/trainingUnit/${id}/childAttendance`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("REGISTRATION_FAILED");
    }
  },

  /* IX MARKS A CHILD AS PRESENT BY ATTENDANCE ID */
  markChildAttendancePresent: async (id) => {
    try {
      const response = await fetchWithConfig(
        `/childAttendance/${id}/markPresent`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("MARK_CHILD_PRESENT_FAILED");
    }
  },

  /* X MARKS A CHILD AS ABSENT BY ATTENDANCE ID */
  markChildAttendanceAbsent: async (id) => {
    try {
      const response = await fetchWithConfig(
        `/childAttendance/${id}/markAbsent`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("MARK_CHILD_ABSENT_FAILED");
    }
  },

  /* XI MARKS A TRAINER AS PRESENT BY ATTENDANCE ID */
  markTrainerAttendancePresent: async (id) => {
    try {
      const response = await fetchWithConfig(
        `/trainerAttendance/${id}/markPresent`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("MARK_TRAINER_PRESENT_FAILED");
    }
  },

  /* XII MARKS A TRAINER AS ABSENT BY ATTENDANCE ID */
  markTrainerAttendanceAbsent: async (id) => {
    try {
      const response = await fetchWithConfig(
        `/trainerAttendance/${id}/markAbsent`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("MARK_TRAINER_ABSENT_FAILED");
    }
  },

  /* XIII GETS TRAINERS REPORT FOR CURRENT MONTH*/
  getTrainerCurrentMonthReport: async (email) => {
    try {
      const response = await fetchWithConfig(`/trainer/${email}/report/currentMonth`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("GET_TRAINER_REPORT_FAILED");
    }
  },

  /* XIV GETS EVENTS */
  getEvents: async () => {
    try {
      const response = await fetchWithConfig(`/event`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("GET_EVENTS_FAILED");
    }
  },

  /* XV GETS REGISTERED CHILDREN FOR EVENT */
  getEventRegisteredChildren: async (id) => {
    try {
      const response = await fetchWithConfig(
        `/event/${id}/getRegisteredChildren`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("GET_REGISTERED_CHILDREN_FOR_EVENT");
    }
  },

  /* XVI GET NEWS */
  getNews: async () => {
    try {
      const response = await fetchWithConfig(`/news`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("GET_NEWS");
    }
  },

  /* XVII GET PARENT CONTACT */
  getParentContact: async (id) => {
    try {
      const response = await fetchWithConfig(`/childAttendance/${id}/parentContact`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("GET_PARENT_CONTACT");
    }
  },

                                              /* PARENT */

    /* XVIII GET PARENT UPCOMING TRAININGS */
    getParentUpcomingTrainings: async (email) => {
      try {
        const response = await fetchWithConfig(`/parent/${email}/trainingUnit/upcoming`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response) {
          console.log(response);
        }
        return response;
      } catch (error) {
        throw new Error("GET_PARENT_UPCOMING_TRAININGS");
      }
    },
};
