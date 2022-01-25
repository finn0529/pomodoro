<template lang="pug">
#Chart
  b-container
    b-row
      b-col(cols=6)
        .d-flex
          img(src="../assets/img/tomato.png")
          h2.ml-3 Done
        hr
        b-table-simple
          tbody
            tr(v-for="item in finished")
              td
                img(src="../assets/img/checked.png")
              td {{ item }}
      .play
        img(src="../assets/img/play.png")
        h3 the first thing
        h4 10:20
        b-progress.mb-3(value=75 height="5px")
      b-col(cols=6)
        .d-flex
          img(src="../assets/img/tomato.png")
          h2.ml-3 Focus
        hr
        img.num(src="../assets/img/num-01.png")
        .d-flex
          img(src="../assets/img/tomato.png")
          h2.ml-3 Chart
        hr
        img(src="../assets/img/chartt-01.png")
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    finished () {
      return this.$store.state.finished
    }
  }
}
</script>
