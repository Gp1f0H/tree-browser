<template>
  <div id="tree">
    <TreeComponent :node="tree"></TreeComponent>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TreeComponent from '../components/TreeComponent'

export default {
  data() {
    return {

    }
  },
  components: {
    TreeComponent
  },
  computed: {
    ...mapGetters(['tree'])
  }
}
</script>


<style lang="scss">
</style>
