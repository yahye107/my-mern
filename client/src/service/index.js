import axios from "axios";

export const callregisterUserApi = async (formData) => {
  const Response = await axios.post(
    "http://localhost:5000/api/auth/register",
    formData,
    {
      withCredentials: true,
    }
  );
  return Response.data;
};
export const callloginUserApi = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

export const callAuthApi = async (formData) => {
  const Response = await axios.get("http://localhost:5000/api/auth/auth", {
    withCredentials: true, // ✅ this enables sending the cookie to backend
  });

  return Response.data;
};
export const calllogoutUserApi = async (formData) => {
  const Response = await axios.post(
    "http://localhost:5000/api/auth/logout",
    {},
    { withCredentials: true }
  );
  return Response.data;
};
export const callGetAllUsersApi = async () => {
  const Response = await axios.get("http://localhost:5000/api/auth/get", {
    withCredentials: true,
  });
  return Response.data;
};

export const callDeleteUserApi = async (userId) => {
  const res = await axios.delete(
    `http://localhost:5000/api/auth/delete/${userId}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

//qoute

export const callCreateQuoteApi = async (formData) => {
  const Response = await axios.post(
    "http://localhost:5000/api/quote/add", // Corrected spelling
    formData,
    { withCredentials: true }
  );

  return Response?.data;
};
export const getuserAllQoutesApi = async (getCurrentUserId) => {
  const Response = await axios.get(
    `http://localhost:5000/api/quote/get-by-user/${getCurrentUserId}`
  );

  return Response?.data;
};
export const getSingleQouteByIdApi = async (quoteId) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/quote/${quoteId}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch quote by ID", err);
    return null;
  }
};

// export const callCreateQuoteApi = async (formData) => {
//   try {
//     const res = await axios.post("http://localhost:5000/api/quote/add", quoteData, {
//       withCredentials: true, // for cookie-based auth
//     });
//     return res.data;
//   } catch (error) {
//     console.error("Error creating quote:", error);
//     return { success: false };
//   }
// };

// Get all quotes (Admin side)
export const getAllQoutesApi = async () => {
  const Response = await axios.get("http://localhost:5000/api/quote/get");

  return Response?.data;
};

// Admin responds to a quote
export const callRespondToQuoteApi = async (quoteId, response) => {
  try {
    const Response = await axios.post(
      "http://localhost:5000/api/quote/respond",
      { quoteId, response },
      { withCredentials: true }
    );
    return Response?.data;
  } catch (error) {
    console.error("Error responding to quote:", error);
    return { success: false };
  }
};

//change password

export const callChangePasswordApi = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/change-password",
      formData,
      { withCredentials: true } // to ensure the cookie is sent with the request
    );
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

// Add to your API service file
export const callChangeEmailApi = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/change-email",
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

export const callChangeUsernameApi = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/change-username",
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};
