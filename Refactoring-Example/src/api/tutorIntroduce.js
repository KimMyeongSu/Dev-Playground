import axios from "@/plugins/axios.js";

export const getBestTutors = async () => {
  try {
    const { data } = await axios.get(`/junior/home/getBestTutor`);

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const setBestTutorAction = async (payload) => {
  try {
    const { data } = await axios.post(`/junior/home/setBestTutor`, payload);

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
