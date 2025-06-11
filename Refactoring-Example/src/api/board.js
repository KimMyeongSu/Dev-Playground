import axios from "@/plugins/axios.js";

export const getNoticeList = async () => {
  try {
    const { data } = await axios.get("/app/home/board/getNoticeList");
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getDetailPageInfo = async (idx, category) => {
  try {
    const query = category ? `category=${category}&idxBoard=${idx}` : `idxBoard=${idx}`;
    const { data } = await axios.get(`/junior/notice/${idx}?${query}`);

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getEventList = async () => {
  try {
    const { data } = await axios.get(`/junior/event/list`);

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getBlogList = async (payload) => {
  try {
    const { data } = await axios.get(`/app/home/board/getBlogList`, {
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
