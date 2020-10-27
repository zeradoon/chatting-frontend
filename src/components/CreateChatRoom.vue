<template>
  <div class="submit-form">
      <div class="form-group">
        <label for="guestCustId">판매자ID</label>
        <input
        type="text"
          class="form-control"
          id="guestCustId"
          required
          v-model="chatroom.guestCustId"
          name="guestCustId"
        />
      </div>
      <div class="form-group">     
        <label for="hostCustId">구매자ID(채팅방 생성요청자)</label>
        <input
          type="text"
          class="form-control"
          id="hostCustId"
          required
          v-model="chatroom.hostCustId"
          name="hostCustId"
        />
      </div>
      <div class="form-group">
        <label for="productId">상품ID</label>
        <input
        type="text"
          class="form-control"
          id="productId"
          required
          v-model="chatroom.productId"
          name="productId"
        />
      </div>

      <button @click="saveChatRoom" class="btn btn-success">Submit</button>
  </div>
</template>

<script>

export default {
  name: "add-tutorial",
  data() {
    return {
      chatroom: {
          guestCustId : "",
          hostCustId : "",
          productId : ""
      }
    };
  },
  methods: {
    saveChatRoom() {
        this.$router.push({name: 'chatroom-detail', params: {chatRoomId: "", custId: this.chatroom.hostCustId, guestCustId: this.chatroom.guestCustId, hostCustId: this.chatroom.hostCustId, productId: this.chatroom.productId}})
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>