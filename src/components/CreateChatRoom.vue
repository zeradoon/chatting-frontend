<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="guestCustId">구매자ID</label>
        <input
          class="form-control"
          id="guestCustId"
          required
          v-model="chatroom.guestCustId"
          name="guestCustId"
        />
      </div>
      <div class="form-group">     
        <label for="hostCustId">판매자ID</label>
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
          class="form-control"
          id="productId"
          required
          v-model="chatroom.productId"
          name="productId"
        />
      </div>

      <button @click="saveChatRoom" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newChatRoom">Add</button>
    </div>
  </div>
</template>

<script>
import ChattingDataService from "../services/ChattingDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      chatroom: {
          guestCustId : "",
          hostCustId : "",
          productId : "",
          published: false
      },
      submitted: false
    };
  },
  methods: {
    saveChatRoom() {
      var data = {
        guestCustId: this.chatroom.guestCustId,
        hostCustId: this.chatroom.hostCustId,
        productId: this.chatroom.productId,
      };

      ChattingDataService.createChatRoom(data)
        .then(response => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newChatRoom() {
      this.submitted = false;
      this.tutorial = {};
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