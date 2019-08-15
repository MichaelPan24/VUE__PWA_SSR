<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import mixin from './mixins'

let isClient = true
let modulePath = 'a/module1'
let options = { preserveState: isClient }

export default {
  mixins: [mixin(this, modulePath, options)],

  asyncData () {
    return {

    }
  },

  data () {
    return {

    }
  },
  computed: {
    list () {
      // return this.$store.state.a
    }
  }
}
</script>
