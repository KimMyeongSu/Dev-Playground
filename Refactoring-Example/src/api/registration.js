// import axios from "@/plugins/axios.js";

export const getLevelTestAvTime = async (lecType) => {
  const { data } = await axios.get(
    `/app/home/leveltest/getLeveltestAvTime?lecType=${lecType}`
  );

  return data;
};

export const setFreeClassForm = async (params) => {
  //const { data } = await axios.post("/app/home/leveltest/registerLeveltest", params);
  const { data } = await axios.post(
    "/app/home/free/leveltest/registerLeveltest",
    params
  );
  return data;
};

export const getNoticeState = async () => {
  try {
    const { data } = await axios.get("/app/home/leveltest/getNoticeChk");

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getCourseListByLanguage = async (payload) => {
  try {
    const { data } = await axios.get(
      `/app/home/sugang/getCourseList?isJr=${payload.classTarget}&lang=${payload.language}`
    );

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getCoursInitData = async () => {
  try {
    const { data } = await axios.get("/app/home/sugang/getInitData");

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getUserInfo = async () => {
  try {
    const { data } = await axios.get("/app/myInfo/getUserInfo");

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getRegistrationPrice = async (payload) => {
  try {
    const { data } = await axios.get("/app/home/sugang/getRegisterPrice", {
      params: payload,
    });

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const setRegistrationForm = async (payload) => {
  try {
    const { data } = await axios.post("/app/home/sugang/register", payload);

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const confirmPayment = async (payload) => {
  try {
    const { data } = await axios.post("/app/home/sugang/confirm", payload);

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
