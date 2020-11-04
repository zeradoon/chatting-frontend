import httpquery from "../http-query";
import httpcommand from "../http-command";
import httpUpload from "../http-upload";

class ChattingDataService {
  getAllChatRoomByCustId(custId) {
    return httpquery.get(`/chatroom/list/${custId}`);
  }
  findByChatRoomId(chatRoomId) {
    return httpquery.get(`/chatroom/${chatRoomId}`);
  }
  
  findChatRoomId(hostCustId, guestCustId, productId) {
    return httpquery.get(`/chatroom/?hostCustId=${hostCustId}&guestCustId=${guestCustId}&productId=${productId}`);
  }

  createChatRoom(data) {
    return httpcommand.post("/chatroom/create", data);
  }
  
  getAllChatContentByChatRoomId(chatRoomId) {
    return httpquery.get(`/chatcontent/list/${chatRoomId}`);
  }

  sendMessage(data) {
    return httpcommand.post("message/send", data);
  }

  uploadImage(file, dir, onUploadProgress) {
    let formData = new FormData();
    formData.append("data", file);
    formData.append("dir", dir);
    return httpUpload.post("upload", formData, {
      headers: {
        "Content-Type" : "multipart/form-data"
      },
      onUploadProgress
    });
  }

/*
  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }
 */
  
}

export default new ChattingDataService();