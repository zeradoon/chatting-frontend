<template>
  <div id="app">

    <div class="example-modal-window">
    <ImagePreviewModal @close="closeModal" v-if="modal">
      <template slot="body">
        <img class="image ml-md-3" v-bind:src="imageData" style="width:100%; height:100%;">
      </template>
      <template slot="footer">
        <div style="height: 44px;margin-left: 0px;">
              <button class="btn btn-primary" style="padding-top: 10px;padding-bottom: 10px;" :disabled="!selectedFiles" @click="upload"><i class="fa fa-arrow-circle-up"></i> 사진 전송
            </button>
            </div>
      </template>
    </ImagePreviewModal>
  </div>
    <div>
      <div class="page sub-page">
        <!--*********************************************************************************************************-->
        <!--************ HERO ***************************************************************************************-->
        <!--*********************************************************************************************************-->
        <header class="hero">
            <div>
              <main-navigation />
              <div style="padding-bottom: 0rem;padding-top: 1rem">
                    <div class="container">
                        <h2 style="margin-bottom: 0rem">{{opponentCustId}}님과의 대화</h2>
                        <hr style="margin-top: 1rem;margin-bottom: 1rem;">   
                    </div>

                    <!--end container-->
              </div>
              <div class="container">
                    <div class="sidebar-post" style="display: table;width: 100%;">
                        <a href="Dm_003.html" class="background-image" style="background-image: url(&quot;/img/blog-image-03.a5a06528.jpg&quot;);
                         width: 5rem; height: 5rem; display: block; box-shadow: 0 0.2rem 0.7rem 0 rgba(0,0,0, .08); border-radius: .4rem; float: left;">
                        <img src="../assets/img/blog-image-03.jpg">
                        </a>
                        <div style="margin-left: 6rem;">
                            <h4 style="margin-bottom: 1.5rem;">
                            <a href="Dm_003.html">스타벅스 서머레디백(미개봉)</a>
                            </h4>
                            <h4 style="margin-bottom: 1.5rem;font-weight: 600;">
                                100,000원
                            </h4>
                        </div>
                     </div>
                <div class="background"></div>
              </div>
            </div>
        </header>
        <!--*********************************************************************************************************-->
        <!--************ CONTENT ************************************************************************************-->
        <!--*********************************************************************************************************-->
        <section>
            <section class="block" style="padding-top: 0rem; padding-bottom: 0rem">
                <div class="container">
                    <div class="row">
                        <div style="    position: relative;
    width: 100%;
    min-height: 1px;">
                            <div id="messaging__chat-window" class="messaging__box" >
                                <div class="messaging__content3" data-background-color="rgba(0,0,0,.05)" v-chat-scroll="{ image: true }">
                                    <div class="messaging__main-chat" >
                                        <div style="word-break:break-all" class="messaging__main-chat__bubble"
                                        v-for="(chatcontent, index) in chatcontents"
                                        :class="{'user': isCust(chatcontent.custId) }"
                                        :key="index">
                                            <p v-if="chatcontent.contentType === 'message'" style="opacity: 1;">
                                                {{chatcontent.content}}
                                                <small>{{chatcontent.updateTime | moment('YYYY-MM-DD a HH:mm:ss')}}</small>
                                            </p>
                                            <p v-else-if="chatcontent.contentType === 'image'" style="opacity: 1;">
                                                <img v-bind:src="chatcontent.content" alt="" data-hash="1" style="
          height: 100%;
          width: 100%;
      ">
                                                <small>{{chatcontent.updateTime | moment('YYYY-MM-DD a HH:mm:ss')}}</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--end col-md-9-->
                    </div>
                    <!--end row-->
                </div>
                <!--end container-->
            </section>
            <!--end block-->
        </section>
        <!--end content-->
        
      </div>
    </div>
     <div class="footerbar" style="display: block;">
        <div >
          <div v-if="currentFile && this.imageUploadFlag ===2" class="progress" style="height:44px">
            <div
              class="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              :aria-valuenow="progress"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{ width: progress + '%' }"
            >
              {{ progress }}%
            </div>
          </div>
          <div v-if="imageUploadFlag === 1" class="input-group" style="height: 44px;">
            <div class="file-upload-previews"></div>
            <div class="file-upload" style="flex: 1;height: 44px; margin-top: 0; margin-bottom: 0;">
              <div class="MultiFile-wrap" id="MultiFile1">
              <input type="file" ref="file" name="files[]" accept="gif|jpg|png|jpeg" @change="selectFile" class="file-upload-input with-preview" multiple title="Click to add files" maxlength="10" style="height: 44px;padding: 4rem 0 0 0;">
              </div>
              <span style="line-height: 4.5rem;"><i class="fa fa-plus-circle"></i>사진 선택</span>
            </div>
            <div class="input-group-append" style="height: 44px;margin-left: 0px;">
              <button class="btn btn-secondary" style="padding-top: 10px;padding-bottom: 10px;" @click="imageUploadFlagChange()"><i class="fa fa-times-circle"></i></button>
            </div>
          </div>
          <div class="form" v-else-if="imageUploadFlag === 0" >
                <div class="input-group" style="height: 44px;">
                    <div class="input-group-append" style="height: 44px;margin-right: 10px;">
                        <button class="btn btn-secondary" style="padding-top: 10px;padding-bottom: 10px;" @click="imageUploadFlagChange()"><i class="fa fa-image"></i></button>
                    </div>
                    <input
                    v-model="content"
                     type="text" 
                     class="form-control" 
                     placeholder="메세지를 입력하세요."
                     @keyup="sendMessage"
                     >
                    <div class="input-group-append" style="height: 44px;">
                        <button class="btn btn-primary" type="submit" style="padding-top: 10px;padding-bottom: 10px;" @click="send()">전송<i class="fa fa-send ml-3"></i></button>
                    </div>
                </div>
            </div>
            
        </div>
              
    </div>

  </div>
</template>
<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import ChattingDataService from "../services/ChattingDataService";
import MainNavigation from './MainNavigation.vue';
import ImagePreviewModal from './ImagePreviewModal.vue';

export default {
  name: 'ChatRoom',
  components: { MainNavigation ,ImagePreviewModal} ,
  data() {
    return {
      chatcontents: [],
      chatContentId: "",
      chatRoomId: "",
      custId: "",
      contentType: "",
      content: "",
      readYn: "",
      registerTime: "",
      updateTime: "",
      hostCustId: "",
      guestCustId: "",
      opponentCustId: "",
      productId: "",
      recvList: [],
      currentFile: undefined,
      selectedFiles: undefined,
      progress: 0,
      imageUploadFlag: 0,
      modal: false,
      imageData: undefined,
      imagefile: undefined
    }
  },
  mounted() {
      this.chatRoomId = this.$route.params.chatRoomId
      this.custId = this.$route.params.custId
      this.hostCustId = this.$route.params.hostCustId
      this.guestCustId = this.$route.params.guestCustId
      this.productId = this.$route.params.productId
      if(this.custId == this.hostCustId){
        this.opponentCustId = this.guestCustId
      }else{
        this.opponentCustId = this.hostCustId
      }
      if(this.chatRoomId != ""){
        this.getAllContents()
        this.connect()
      }
  },
  created() {
  },
  methods: {
    sendMessage (e) {
      if(e.keyCode === 13 && this.userName !== '' && this.content !== ''){
        this.send()
      }
    },
    imageUploadFlagChange() {
      if(this.imageUploadFlag == 1){
        this.imageUploadFlag = 0;
      }else if(this.imageUploadFlag == 0){
        this.imageUploadFlag = 1;
      }
    },
    send() {
      if(this.chatRoomId == ""){
        var data ={
          productId: this.productId,
          hostCustId: this.hostCustId,
          guestCustId: this.guestCustId
        }
        ChattingDataService.createChatRoom(data)
        .then(response => {
          console.log("create chatroom :" + response.status);
          if( response.status == 200) {
            // 채팅방 생성 성공
            console.log("data: "+data.productId);
            ChattingDataService.findChatRoomId(data.hostCustId, data.guestCustId, data.productId)
            .then(response => {
              // 채팅방 아이디 조회 성공
              console.log("find chatRoomId :" + response.data);
              if( response.status == 200) {
                this.chatRoomId = response.data
                this.connectcb(this.sendContents) 
              }
            })
          }
        });
      }else{
        this.sendContents()
      } 
    }, 
    sendContents () {
      var data = {
          chatRoomId: this.chatRoomId,
          contentType: "message",
          content: this.content,
          custId : this.custId
      }
      ChattingDataService.sendMessage(data)
      .then(response => {

          console.log("Send message:" + this.content);
          if(response.status == 200) {
              console.log("전송성공");
          }
          if (this.stompClient && this.stompClient.connected) {
              const msg = {
              chatContentId: "",
              chatRoomId: this.chatRoomId,
              custId: this.custId,
              contentType: "message",
              content: data.content, 
              readYn: "N",
              registerTime: "",
              updateTime: "방금"
              };
              this.stompClient.send("/sub", JSON.stringify(msg), {});
          }
      })
      .catch(e => {
          console.log(e);
      });
      this.content = ''
    },      

    connectcb(callback) {
      const serverURL = "http://localhost:8000/ws/chat"
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
      this.stompClient.connect(
        {},
        frame => {
          // 소켓 연결 성공
          this.connected = true;
          console.log('소켓 연결 성공', frame);
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe("/pub/"+this.chatRoomId, res => {
            console.log('구독으로 받은 메시지 입니다.', res.body);

            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.chatcontents.push(JSON.parse(res.body))
          });
        },
        error => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error);
          this.connected = false;
        }
      );
      callback();        
    },
    connect() {
      const serverURL = "http://localhost:8000/ws/chat"
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
      this.stompClient.connect(
        {},
        frame => {
          // 소켓 연결 성공
          this.connected = true;
          console.log('소켓 연결 성공', frame);
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe("/pub/"+this.chatRoomId, res => {
            console.log('구독으로 받은 메시지 입니다.', res.body);

            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.chatcontents.push(JSON.parse(res.body))
          });
        },
        error => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error);
          this.connected = false;
        }
      );      
    },
    isCust(custId){
      if(custId == this.custId)
      {
        return true;
      }else{
        return false;
      }
        
    },
    getAllContents() {
        ChattingDataService.getAllChatContentByChatRoomId(this.chatRoomId)
        .then(response => {
          this.chatcontents = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    selectFile(event) {
      this.modal = true
      this.selectedFiles = this.$refs.file.files;
      var input = event.target;
      var reader = new FileReader();
      reader.onload = (e) => {
        this.imageData = e.target.result;
        this.imagefile = input.files[0];
      }
      reader.readAsDataURL(input.files[0]);
    },
    upload() {
      this.modal = false;
      this.imageUploadFlag = 2;
      this.progress = 0;
      this.currentFile = this.selectedFiles.item(0);
      ChattingDataService.uploadImage(this.currentFile,"chatting/"+this.chatRoomId, event => {
        this.progress = Math.round((100*event.loaded) / event.total);
      })
      .then(response => {
        console.log(response.data)
        this.content = response.data
        var data = {
          chatRoomId: this.chatRoomId,
          contentType: "image",
          content: this.content,
          custId : this.custId
      }
        ChattingDataService.sendMessage(data)
        .then(response => {
          console.log("Send message:" + this.content);
          if(response.status == 200) {
              console.log("전송성공");

          }
          if (this.stompClient && this.stompClient.connected) {
              const msg = {
              chatContentId: "",
              chatRoomId: this.chatRoomId,
              custId: this.custId,
              contentType: "image",
              content: data.content, 
              readYn: "N",
              registerTime: "",
              updateTime: "방금"
              };
              this.stompClient.send("/sub", JSON.stringify(msg), {});
          }
      })
      .catch(e => {
          console.log(e);
      });
      this.selectedFiles = undefined;
      this.progress = 0;
      this.currentFile = undefined;
      this.imageUploadFlag = 0;
      this.content = "";
      })
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
      this.$refs.file.value = '';
    },
    doSend() {
      if (this.message.length > 0) {
        alert(this.message)
        this.message = ''
        this.closeModal()
      } else {
        alert('메시지를 입력해주세요.')
      }
    }
  }
}
</script>
