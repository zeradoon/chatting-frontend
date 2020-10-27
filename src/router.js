import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/chatrooms",
      name: "chatrooms",
      component: () => import("./components/ChatRoomsList")
    },
    {
      path: "/chatroom/:chatRoomId",
      name: "chatroom-detail",
      component: () => import("./components/ChatRoom")
    },
    {
      path: "/create",
      name: "create",
      component: () => import("./components/CreateChatRoom")
    }
  ]
});