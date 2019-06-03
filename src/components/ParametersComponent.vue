<template>
  <div>
    <!-- Тут каша их всякого, было бы время я бы все это разобрал -->
    <div class="popup__item">
      <span>{{`${parameterKey}: `}}</span>
      <span 
        v-if="isColor" 
        class="color" 
        :style="{'background-color': parameter, 'border': `2px solid ${getBorderColor(parameter)}`}"
      ></span>
      <span v-if="!isArray">{{parameter}}</span>
      <div class="popup__nested-list" v-if="isArray">
        <span v-for="(value, index) in parameter" v-bind:key="index">
          <span v-if="!isArrayOfObjects">{{value}}</span>
          <span v-if="isArrayOfObjects">
            <ParametersComponent 
              v-for="(param, key) in value" v-bind:key="param.toString()" 
              :parameter="param" 
              :parameterKey="key"></ParametersComponent>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParametersComponent',
  props: ['parameter','parameterKey'],
  computed: {
    isArray() {
      if (this.parameter.constructor === Array && this.parameter.length) {
        return true
      } else {
        return false
      }
    },
    isArrayOfObjects() {
      // очень слабая проверка на то является ли содержимое массива объектом
      if (this.isArray && typeof this.parameter[0] === 'object') {
        return true
      } else {
        return false
      }
    },
    isColor() {
      // так же проверять на то является ли что то картинкой я бы не стал, думаю нужно придумать более универсальный метод, но времени совсем нет
      if (/^#[0-9A-F]{6}$/i.test(this.parameter)) {
        console.log('1')
        return true
      } else {
        console.log('2')
        return false
      }
    }
  },
  methods: {
    getBorderColor(bgColor, lightColor = '#d3d3d3', darkColor = '#000') {
      let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
      let r = parseInt(color.substring(0, 2), 16); // hexToR
      let g = parseInt(color.substring(2, 4), 16); // hexToG
      let b = parseInt(color.substring(4, 6), 16); // hexToB
      return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
        darkColor : lightColor;
    }
  }
}
</script>

<style lang="scss">
.popup__item {
  display: flex;
}
// так не делаю обычно
.popup__item > span {
  margin: 0 5px;
}
.color {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid white;
}
.popup__nested-list > span {
  padding: 0 3px;
}
</style>

