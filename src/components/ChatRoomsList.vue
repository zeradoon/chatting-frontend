<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by custId"
          v-model="custId"
          @keyup="sendMessage"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="retrieveChatRooms"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>ChatRooms List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(chatroom, index) in chatrooms"
          :key="index"
          @click="setActiveChatRoom(chatroom, index)"
        >
          {{ chatroom.chatRoomId }}
          {{ chatroom.productId }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentChatroom">
        <h4>ChatRoom</h4>
        <div>
          <label><strong>chatRoomId:</strong></label> {{ currentChatroom.chatRoomId }}
        </div>
        <div>
          <label><strong>productId:</strong></label> {{ currentChatroom.productId }}
        </div>
        <div>
          <label><strong>hostCustId:</strong></label> {{ currentChatroom.hostCustId }}
        </div>
        <div>
          <label><strong>guestCustId:</strong></label> {{ currentChatroom.guestCustId }}
        </div>
        <div>
          <label><strong>registerTime:</strong></label> {{ currentChatroom.registerTime }}
        </div>
        <div>
          <label><strong>content:</strong></label> {{ currentChatroom.content }}
        </div>
        <div>
          <label><strong>contentType:</strong></label> {{ currentChatroom.contentType }}
        </div>
        <a class="badge badge-warning"
          :href="'/chatroom/' + currentChatroom.chatRoomId"
        >
          입장
        </a>
        <button class="btn btn-outline-secondary" type="button"
            @click="enterChatRoom"
          >
            입장
          </button>
      </div>
      <div v-else>
        <br />
        <p>Please click on a ChatRoom</p>
      </div>
    </div>
  </div>
</template>

<script>
import ChattingDataService from "../services/ChattingDataService";

export default {
  name: "chatrooms-list",
  data() {
    return {
      chatrooms: [],
      currentChatroom: null,
      currentIndex: -1,
      chatRoomId: "",
      custId: "",
      guestCustId: "",
      hostCustId: "",
    };
  },
  methods: {
    sendMessage (e) {
      if(e.keyCode === 13 && this.custId !== '' ){
        this.retrieveChatRooms()
      }
    },
    retrieveChatRooms() {
        this.currentChatroom = null;
      ChattingDataService.getAllChatRoomByCustId(this.custId)
        .then(response => {
          this.chatrooms = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveChatRooms();
      this.currentChatroom = null;
      this.currentIndex = -1;
    },

    setActiveChatRoom(chatroom, index) {
      this.currentChatroom = chatroom;
      this.currentIndex = index;
    },

    
    searchChatRoomId() {
      ChattingDataService.findByChatRoomId(this.chatRoomId)
        .then(response => {
          this.chatrooms = response.data;
          this.currentChatroom = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    enterChatRoom() {
        this.$router.push({name: 'chatroom-detail', params: {chatRoomId: this.currentChatroom.chatRoomId, custId: this.custId, guestCustId: this.currentChatroom.guestCustId, hostCustId: this.currentChatroom.hostCustId}})
    }
  },
  mounted() {
    //this.retrieveChatRooms();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>