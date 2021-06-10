const axios = require("axios").default;
const { fileServer } = require("../config/config");
const { HTTP500Error, HTTP401Error } = require("../helpers/error");

class AxiosService {
  static async getGoogleProfile(token) {
    try {
      const url =
        "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + token;
      const { status, data } = await axios.get(url);
      if (status === 200) return data;
      throw new Error();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401)
        throw new HTTP401Error("Not valid cerdentails");
      throw new HTTP500Error(error.message);
    }
  }
  static async deleteFile(path) {
    try {
      const { data, status } = await axios.delete(
        `${fileServer.deleteRoute}/${path}`
      );
      if (status === 200) return data;
      throw new Error(data.message);
    } catch (error) {
      throw new HTTP500Error(error.message);
    }
  }

  static async postFile(form) {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: fileServer.uploadRoute,
        data: form,
        headers: form.getHeaders(),
      });
      if (status === 200) return data;
      throw new Error("File not uploaded.");
    } catch (error) {
      throw new HTTP500Error(error.message);
    }
  }
}

module.exports = AxiosService;
