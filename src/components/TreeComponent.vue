<template>
  <div>
    <div 
      class="node"
      :style="{'margin-left': `${depth * 30}px`}"
    >
      <button 
        v-if="hasChildren"
        @click="expanded = !expanded"
        class="node__btn"
      >{{ expanded ? '&#9660;' : '&#9658;' }}</button>
      <span 
        v-else
        @click="expanded = !expanded"
        class="node_bullet"
      >&#9679;</span>
      <span 
        @click="togglePopUp" 
        class="node__name"
      >
        {{node.name}}
        <transition name="fade">
          <TreePopUp 
            v-if="showPopUp && nodeParameters"
            :parameters="node.rules.length > 0 && node.rules[0].parameters ? node.rules[0].parameters : null"
          ></TreePopUp>
        </transition>
      </span>
      
    </div>
    <div v-if="expanded">
      <TreeComponent 
        v-for="child in node.children"
        v-bind:key="child.name"
        :node="child"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<script>
import TreePopUp from '../components/TreePopUp'
import EventBus from '../eventBus'

export default {
  name: 'TreeComponent',
  data() {
    return {
      expanded: false,
      showPopUp: false
    }
  },
  components: {
    TreePopUp
  },
  props: {
    node: Object,
    depth: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    let self = this;
    EventBus.$on('closePopUp', function (payload) {
      // я не знаю как будет лучше:
      // 1. Менять стейт попапа в togglePopUp() 
      // 2. Менять стейт через шину евентов.
      // Оставил так потому что так переключение стейта будет синхронным
      if (payload.name !== self.node.name) {
        self.showPopUp = false;
      } else {
        self.showPopUp = true;
      }
    });
  },
  methods: {
    togglePopUp() {
      let self = this;
      if (!this.showPopUp) {
        EventBus.$emit('closePopUp', { name: self.node.name });
      } else {
        this.showPopUp = !this.showPopUp;
      }
    }
  },
  computed: {
    hasChildren() {
      if (typeof this.node.children !== 'undefined' && this.node.children.length > 0) {
        return true
      } else {
        return false
      }
    },
    nodeParameters() {
      if (typeof this.node.rules === 'undefined' || this.node.rules.length <= 0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
.node {
  font-size: 1.2em;
  margin-bottom: 0.5em;
  position: relative;
}
.node__name {
  bordeR: none;
  background-color: transparent;
  font-size: 1em;
  cursor: pointer;
  position: relative;
}
.node__btn {
  background-color: transparent;
  border: none;
  padding: 0 6px;
  cursor: pointer;
}
.node_bullet {
  padding: 0 6px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>


