import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8090/v1/api/chatting-query/chatting",
  headers: {
    "Content-type": "application/json"
  }
});