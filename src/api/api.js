import API_CONFIG from "../config/api.config";

const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};

const refreshTokenApi = async (refreshToken) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });
    const data = await response.json();
    return data;
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

    if (response.status === 403) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken && endpoint !== "/auth/refresh") {
        try {
          const authResponse = await refreshTokenApi(refreshToken);
          if (authResponse) {
            localStorage.setItem("access_token", authResponse.accessToken);
            localStorage.setItem("refresh_token", authResponse.refreshToken);
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
        `/trainer/${email}/training-unit/upcoming`,
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
        `/trainer/${email}/training-unit/past`,
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
        `/training-unit/${id}/description`,
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
      const response = await fetchWithConfig(`/training-unit/${id}`, {
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
        `/training-unit/${id}/trainer-attendance`,
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
        `/training-unit/${id}/child-attendance`,
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
        `/child-attendance/${id}/mark-present`,
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
        `/child-attendance/${id}/mark-absent`,
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
        `/trainer-attendance/${id}/mark-present`,
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
        `/trainer-attendance/${id}/mark-absent`,
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
      const response = await fetchWithConfig(
        `/trainer/${email}/report/current-month`,
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
        `/event/${id}/registered-children`,
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
      const response = await fetchWithConfig(
        `/child-attendance/${id}/parent-contact`,
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
      throw new Error("GET_PARENT_CONTACT");
    }
  },

  /* PARENT */

  /* XVIII GET PARENT UPCOMING TRAININGS */
  getParentUpcomingTrainings: async (email) => {
    try {
      const response = await fetchWithConfig(
        `/parent/${email}/training-unit/upcoming`,
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
      throw new Error("GET_PARENT_UPCOMING_TRAININGS");
    }
  },

  /* XIX GET ALL CHILDREN OF A PARENT */
  getParentChildren: async (email) => {
    try {
      const response = await fetchWithConfig(`/parent/${email}/children`, {
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

  /* XX GET ALL SCHOOLS */
  getSchools: async () => {
    try {
      const response = await fetchWithConfig(`/school`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("GET_SCHOOLS");
    }
  },

  /* XXI GET TRAININGS BY SCHOOL ID */
  getTrainingsBySchoolId: async (id) => {
    try {
      const response = await fetchWithConfig(`/school/${id}/trainings`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("GET_TRAININGS_OF_SCHOOL");
    }
  },

  /* XXII CREATE CHILD */
  createChild: async (email, childDto) => {
    try {
      const response = await fetchWithConfig(`/parent/${email}/create-child`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(childDto),
      });

      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("CREATE_CHILD");
    }
  },

  /* XXIII */
  getChildrenEventStatus: async (email, eventId) => {
    try {
      const response = await fetchWithConfig(`/parent/${email}/children/event-status/${eventId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
      if (response) {
        console.log(response);
      }
      return response;
    } catch (error) {
      throw new Error("GET_CHILDREN_EVENT_STATUS");
    }  
  },

    /* XXIIV */
    registerChildToEvent: async (childId, eventId) => {
      try {
        const response = await fetchWithConfig(`/child/${childId}/register-to-event/${eventId}`,         {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        })
        if (response) {
          console.log(response);
        }
        return response;
      } catch (error) {
        throw new Error("REGISTER_CHILD_TO_EVENT");
      }  
    }
};
