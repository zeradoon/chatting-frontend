<template>
  <div id="app">
    <div>
      <div class="page sub-page">
        <header class="hero">
          <div>
            <main-navigation />
          </div>
          <div class="form">
            <div class="input-group">
              <input type="text" placeholder="Search by custId" class="form-control mr-4" 
          v-model="custId"
          @keyup="sendMessage"/>
          <div class="input-group-append">
            <button class="btn btn-secondary" type="button"
            @click="retrieveChatRooms"
          >
            Search
          </button>
          </div>
          
            </div>
          </div>
        </header>
      </div>
    </div>

    <div class="col-md-6">
      <h4>ChatRooms List</h4>
      <div id="messaging__chat-list" class="messaging__box">
        <div class="messaging__content">
          <ul class="messaging__persons-list">
            <li :class="{ active: index == currentIndex }" v-for="(chatroom, index) in chatrooms" :key="index" @click="enterChatRoom2(chatroom)">
              <a href="#" class="messaging__person">
                <figure class="messaging__image-item" data-background-image="assets/img/image-01.jpg" style="background-image: url(&quot;assets/img/image-01.jpg&quot;);"></figure>
                <figure class="content">
                  <h5 v-if="custId === chatroom.hostCustId">{{ chatroom.guestCustId }} 님</h5>
                  <h5 v-else>{{ chatroom.hostCustId }} 님</h5>
                  <p style="opacity:1;word-break:break-all">{{ chatroom.content }}</p>
                  <small style="opacity:0.65">{{ chatroom.registerTime | moment("from", "now")}}</small>
                </figure>
                <figure class="messaging__image-person" data-background-image="assets/img/author-01.jpg" style="background-image: url(&quot;assets/img/author-01.jpg&quot;);"></figure>
              </a>
            </li>
          </ul>
        </div>
      </div>
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
import MainNavigation from './MainNavigation.vue';

export default {
  name: "chatrooms-list",
  components: { MainNavigation },
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
    },

    enterChatRoom2(chatRoom) {
        this.$router.push({name: 'chatroom-detail', params: {chatRoomId: chatRoom.chatRoomId, custId: this.custId, guestCustId: chatRoom.guestCustId, hostCustId: chatRoom.hostCustId}})
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