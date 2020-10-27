import httpquery from "../http-query";
import httpcommand from "../http-command";

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