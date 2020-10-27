<template>
  <div id="app">
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
                                            <p>
                                                {{chatcontent.content}}
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
     <div class="footerbar">
        <div >
            <div class="form">
                <div class="input-group" style="height: 44px;">
                    <input
                    v-model="content"
                     type="text" 
                     class="form-control mr-4" 
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

export default {
  name: 'ChatRoom',
  components: { MainNavigation },
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
      recvList: []
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
    // App.vue가 생성되면 소켓 연결을 시도합니다.
    

  },
  methods: {
    sendMessage (e) {
      if(e.keyCode === 13 && this.userName !== '' && this.content !== ''){
        this.send()
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
    }
  }
}
</script>