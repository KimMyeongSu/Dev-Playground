// import axios from "@/plugins/axios.js";

export const getMainReport = async () => {
  try {
    const { data } = await axios.get("app/home/getMainReport");

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(data.message);
  }
};

export const getMainBanner = async () => {
  try {
    const { data } = await axios.get("app/home/getMainTopTextBanner");

    if (data.success) {
      return data.data;
    } else {
      throw new Error(date.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

// export const getExcellentTutor = async () => {
//   try {
//     const { data } = await axios.get("app/home/getExcellentTutor");

//     if (data.success) {
//       return data.data;
//     } else {
//       throw new Error(date.message);
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

export const getBestStudentReview = async () => {
  try {
    const { data } = await axios.get("app/home/getBestStudent");

    if (data.success) {
      return data.data;
    } else {
      throw new Error(date.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getStudentReviews = async () => {
  try {
    const { data } = await axios.get("app/home/getStudentReviewList");

    if (data.success) {
      return data.data;
    } else {
      throw new Error(date.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const checkTokenValidity = async (payload) => {
  try {
    const { data } = await axios.post("app/auth/token", payload);

    if (data.success) {
      return data;
    } else {
      throw new Error(date.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
