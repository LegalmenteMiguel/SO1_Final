import axios from "axios";

const apiurl = process.env.REACT_APP_API_URL;

export const login = async (user, password) => {
  try {
    const res = await axios.post(apiurl + "login", {
      user,
      password,
    });
    alert(res.data.message);
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const createUser = async (user, password) => {
  try {
    const res = await axios.post(apiurl + "createUser", {
      user,
      password,
    });
    alert(res.data.message);
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const getUsers = async (user) => {
  try {
    const res = await axios.get(apiurl + `getUsers/${user}`);
    return res.data;
  } catch (error) {
    return [];
  }
};

export const updateUser = async (user, password) => {
  try {
    const res = await axios.put(apiurl + "updateUser", {
      user,
      password,
    });
    alert(res.data.message);
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const deleteUser = async (user, password) => {
  try {
    const res = await axios.delete(apiurl + `deleteUser/${user}`, {
      data: { password },
    });
    alert(res.data.message);
  } catch (error) {
    alert(error.response.data.message);
  }
};
