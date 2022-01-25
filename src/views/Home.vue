<template lang="pug">
#home
  b-container
    b-row
      b-col(cols="6")
        .being
          h1 {{ currentText }}
          img(src="../assets/img/arrow.png")
        .outlist
          b-table#list(:items="items" :fields="fields" show-empty )
            template(#cell(select)="data")
              span
            template(#empty)
              p.text-center 沒有項目
            template(#cell(action)="data")
              b-btn
                img(src="../assets/img/play.png")
        .listInput
          b-form-group
            b-form-input#newinput(v-model="newinput" placeholder="Add A New Mission" @keydown.enter="additem")
          b-btn(variant="danger" @click="additem")
            img(src="../assets/img/plus.png", alt="alt")
        .recentlyComplete
          p Recently completed--
          .d-flex
            img(src="../assets/img/checked.png")
            p {{ finishedText }}
          p.more More
      b-col(cols="6")
        .time
          img(src="../assets/img/tomatored.png")
          h1 {{ timetext }}
        b-progress.mb-3(:value="timevalue" height="5px")
        .start
          b-btn(variant="danger" v-if="status!==1" @click="start")
            img(src="../assets/img/play.png")
          b-btn(variant="danger" v-else @click="pause")
            img(src="../assets/img/stop.png")
          b-btn(variant="danger" v-if="current.length>0" @click="finish()")
            img(src="../assets/img/cancle.png")
</template>

<style lang="scss">
@mixin center{
  display: flex;
  justify-content: center;
  align-items: center;
}
@mixin poscenter{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.container{
  width: 100%;
  height: 100%;
  margin-top: 5%;
}
.being{
  background: white;
  width: 110%;
  height:100px;
  border-radius: 50px;
  position: relative;
  img{
    width: 20%;
    position: absolute;
    right: -3%;
    bottom: -40%;
  }
  h1{
    @include poscenter
  }
}
.outlist{
  height: 220px;
  line-height: 30px;
  overflow: auto;
  #list{
    thead{
      display: none;
    }
    tr{
      width: 100%;
      td:nth-child(1){
        width: 10%;
        height: 100%;
        span{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 4px solid #D9674E;
          @include poscenter;
        }
      }
      td:nth-child(2){
      width: 70%;
      }
      td:nth-child(3){
      width: 10%;
      height: 100%;
      }
      td{
        position: relative;
        margin: 0;
        word-break: break-all;
        font-size: 30px;
        border: none;
        padding: auto;
        button{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          @include poscenter;
          @include center;
          img{
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
}
.b-table-empty-row{
  td{
    width: 100% !important;
  }
}
.listInput{
  display: flex;
  height: 60px;
  width: 100%;
  .form-group{
    width: 85%;
    div{
      width: 100%;
      input{
        width: 100%;
        height: 60px;
        border: 2px solid #D9674E;
        border-radius: 5px 0 0 5px;
        textarea{
          color: #D9564A80;
        }
      }
    }
  }
  button{
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFF;
    border: 2px solid #D9674E;
    border-radius: 0 5px 5px 0;
    margin-left: -2px;
    &:hover{
      background: white;
    }
    img{
      height: 30px;
    }
  }
}
.time{
  height: 400px;
  position: relative;
  img{
    width: 90%;
    @include poscenter
  }
  h1{
    color: #FFF;
    font-size: 10vh;
    position: absolute;
    left: 50%;
    bottom: 20%;
    transform: translateX(-50%);
  }
}
.progress{
  margin-top: 50px;
}
.start{
  position: relative;
  height: 20%;
  button{
    background: none;
    border: none;
    border-radius: 50%;
    &:hover{
      background: none;
    }
    img:hover{
    filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.3))
    }
  }
  button:nth-child(1){
    width: 80px;
    height: 80px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img{
      width: 110%;
      @include poscenter
    }
  }
  button:nth-child(2){
    width: 50px;
    height: 50px;
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    img{
      width: 110%;
    }
  }
}
.progress-bar{
  background-color: #fdb270 !important;
}
.recentlyComplete{
  color: #707070;
  position: relative;
  margin-top: 50px;
  width: 100%;
  height: 100px;
  background-color: #FFFFFF80;
  align-items: center;
  img{
    width: 30px;
    height: 30px;
    margin-right: 20px;
    margin-left: 20px;
  }
  .more{
    position: absolute;
    right: 10px;
    top: 10px;
    color: #858C51;
    cursor: pointer;
  }
}
</style>

<script>
export default {
  data () {
    return {
      newinput: '',
      fields: [
        { key: 'select' },
        { key: 'name' },
        { key: 'action' }
      ],
      status: 0,
      timer: 0
    }
  },
  computed: {
    items () {
      return this.$store.state.items
    },
    current () {
      return this.$store.state.current
    },
    currentText () {
      return this.current.length > 0 ? this.current : this.items.length > 0 ? '點擊開始' : '沒有事項'
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timetext () {
      const m = Math.floor(this.timeleft / 60).toString().padStart(2, '0')
      const s = Math.floor(this.timeleft % 60).toString().padStart(2, '0')
      return `${m} : ${s}`
    },
    timevalue () {
      const p = this.timeleft / 10 * 100
      return p
    },
    finished () {
      return this.$store.state.finished
    },
    finishedText () {
      return this.finished.length > 0 ? this.finished[this.finished.length - 1] : '未完成事項'
    }
  },
  methods: {
    additem () {
      if (this.newinput.length > 0) {
        this.$store.commit('additem', this.newinput)
        this.newinput = ''
      }
    },
    start () {
      if (this.status === 0 && this.items.length > 0) {
        this.$store.commit('start')
      }
      if (this.current.length) {
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= -1) {
            this.finish(false)
          }
        }, 1000)
      }
    },
    pause () {
      this.status = 2
      clearInterval(this.timer)
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish')
      if (!skip) {
        const audio = new Audio()
        audio.src = require('@/assets/' + this.$store.state.workSound)
        audio.play()
      }
      if (this.items.length > 0) {
        this.start()
      }
    }
  }
}
</script>
