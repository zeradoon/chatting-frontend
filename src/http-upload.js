import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:7777/common/img/",
  headers: {
    "Content-type": "multipart/form-data"
  }
});