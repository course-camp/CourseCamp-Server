const axios = require("axios").default;
const { fileServer } = require("../config/config");
const UserService = require("./UserService");
const CourseService = require("../services/CourseService");
const AxiosService = require("../services/AxiosService");
const formData = require("form-data");

class MulterFileStorage {
  constructor() {}

  async getDestination(req, file) {
    return fileServer.uploadRoute;
  }

  async _handleFile(req, file, cb) {
    try {
      const form = new formData();
      if (req.url !== "/me/avatar") {
        await CourseService.removeImageIfExists(req.course._id);
      } else {
        await UserService.removeAvatarIfExists(req.user._id, req.user);
      }
      form.append(
        req.url === "/me/avatar" ? "userImage" : "courseImage",
        file.stream,
        { filename: file.originalname }
      );
      const { data } = await AxiosService.postFile(form);
      req.data = data;
      cb(undefined);
    } catch (error) {
      cb(error);
    }
  }
}

module.exports = MulterFileStorage;
