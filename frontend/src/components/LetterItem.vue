<template>

  <div class="letter-box" id="{{item.id}}">
    <div class="box-header">
      <span>{{item.name}}</span>
      <span class="letter-date">{{item.date}}</span>

      <button type="button" class="btn-menu" @click="isDrop = !isDrop">
        💕
      </button>
    </div>
    
    <p class="box-content">
      {{item.text}}
    </p>

    <div v-if="isDrop" class="remove-content">
        <input  v-model="checkPw" type="text" placeholder="password" class="input-field">
        <button type="button" class="btn btn-fill" @click="remove(item)">remove</button>
    </div>

  </div>

</template>

<script>
export default {
   props: ['item'],
   data () {
    return {
      isDrop : false,
      checkPw : '',
    }
  },
  methods : {
    remove(item) {
      if(item.pw != this.checkPw){
        alert('비밀번호가 틀립니다!');
        return;
      } else {
          this.$http.post('/api/letter/remove', item);
          location.reload();
      }
    }
  }
}
</script>

<style >
.remove-content > .input-field {
  font-size: 0.8rem ;
  padding: 0.5rem;
}
</style>