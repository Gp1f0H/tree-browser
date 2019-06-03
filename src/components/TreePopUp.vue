<template>
  <div class="popup" @click="event => event.stopPropagation()">
    <!-- я не знаю как правильно назначить key, думаю что нужо использовать функцию генератор, но как ее использовать во vue я не знаю -->
    <div 
      class="popup__list" 
      v-for="(parameter, key) in parameters" 
      v-bind:key="parameter.toString()"
    >
      <ParametersComponent :parameter="parameter" :parameterKey="key"></ParametersComponent>
    </div>
  </div>
</template>

<script>
import ParametersComponent from './ParametersComponent'

export default {
  name: 'PopUp',
  props: ['parameters'],
  components: {
    ParametersComponent
  }
}
</script>

<style lang="scss">
.popup {
  position: absolute;
  max-width: 90vw;
  width: 700px;
  display: block;
  top: 0px;
  left: calc(100% + 30px);
  background-color: #f3f3f3;
  padding: 20px 30px;
  border: 1px solid #0f0f0f;
  z-index: 3;
  cursor: default;
}
</style>


