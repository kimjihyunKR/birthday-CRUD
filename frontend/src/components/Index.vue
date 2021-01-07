<template>
  <div class="container ">
    <!-- <div id="cursor"></div> -->
    <section id="sec-main" class="col">
      <div id="sub-text" class="anim-pulse">
        <p>1993.12.31</p>
        <p>seohyun’s birthday</p>
      </div>
      
      <h1 class="anim-main anim-pulse">Shout out</h1>
      <h1 class="anim-main anim-pulse">To</h1>
      <h1 class="anim-main anim-pulse">Seohyun</h1>
      <img src="../assets/img/seohyun0.png" alt="" class="mainEmoji anim-bounce2">
    </section>

    <section id="instagram" class="col center">
      <div id="insta-profile"></div>
      <h3>instagram</h3>
      <p>
        <a href="https://www.instagram.com/sh.nye/?hl=ko" target="_blank">@sh.nye</a>
      </p>
    </section>
    
    <section id="sec-share" class="col center">
      <div class="text-center text-group">
        <img src="../assets/img/wrapped-gift.png" alt="" class="anim-swing">
        <h3>share to friends!</h3>
        <p>친구들에게 서현이의 생일을 알려주세요!</p>
      </div>
      
      <div class="col-4" id="btn-group">
        <input type="hidden" id="link" value="http://15.165.204.192:3000/">
        <button type="button" class="col btn btn-pill" @click="copyLink">링크 복사하기</button>
      </div>
    </section>

    <section id="sec-letter" class="col center">
      <div class="text-center text-group">
        <img src="../assets/img/love-letter.png" alt="" class="anim-hithere">
        <h3>letter for seohyun!</h3>
        <p>
          서현이의 생일을 축하해주세요.<br>
          모두 닉네임으로 작성됩니다 :)
        </p>
      </div>

      <form action="/api/letter/write" method="post" id="letterForm" class="col-6 ">
          <input v-model="form.name" name="name" type="text" placeholder="name" class="input-field col" >
          <input v-model="form.pw" name="pw" type="text" placeholder="pw" class="input-field col" >
          <textarea v-model="form.text" name="text" rows="6" placeholder="text" class="col input-field" ></textarea>
          <button type="button" class="col-2 btn btn-fill f-right" @click="write">write</button>
       </form>

      <div class="line col-6"></div>
      
     <div id="letter-list" class="col-6">
        <!-- for 적용 -->
        <letterItem  
            v-for="item in test"
            v-bind:key="item.id"  
            :item="item">
        </letterItem>
        <p v-if="test.length == 0 || test == null">
          글을 남겨주세요
        </p>
     </div>
    </section>

    <footer class="col center">
      <div class="col-6">
        <h3>🐛개발자의 한마디...</h3>
        <br>
        <p>
          이건 공부다... 공부다... 내가 왜 만든다고 했는지는 잘 모르겠지만... 어쨋든 생일 축하하고 새해 복 많이 받아!!
          나름 공부도 되고 유익한 시간이었다... 막내노릇 잘하고 있는거지? 항상 먼저 망해보고 지혜를 나눠줘서 고마운 큰언니!
          싹싹한 막내가 될게. 나중에 용돈주라 ❤
        </p>
      </div>
     
    </footer>


  </div>

</template>

<script>
import letterItem from './LetterItem.vue';
import mouseEffect from '../assets/src/mouseEffect.js';

export default {
   created () {
    // 컴포넌트가 생성될 때, /api/letter에 요청을 보냅니다.     
    this.$http.get('/api/letter')
        .then((response) => {
          this.test = response.data;
        });
  },
  mounted() {
    mouseEffect
  },
  
  data () {
    return {
      test : [],
      form : {
        name : '',
        pw : '',
        text : '',
      }
    }
  },
  components: {
    letterItem
  }, methods : {
      copyLink(){
         let link = document.getElementById('link');
         link.select();
         document.execCommand("copy");
         alert('복사되었습니다');
      },
      write(){
        if(this.form.name.length <= 0){
          alert('이름을 입력해주세요');
          this.form.name.focus();
          return
        } else if (this.form.pw.length <= 0){
          alert('비밀번호를 입력해주세요. 삭제할 때 쓰입니다.');
          this.form.pw.focus();
          return
        } else if (this.form.text.length <= 0){
          alert('본문을 입력해주세요');
          this.form.text.focus();
          return
        }
         this.$http.post('/api/letter/write', this.form);
         location.reload();
      }
  }
}
</script>

<style>
@import url(../assets/css/grid-system.css);
@import url(../assets/css/style.css);
@import url(../assets/css/anim.css);
</style>