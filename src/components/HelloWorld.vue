<template>
  <div class="hello">
    <iris-button @button-click="handleClick" :text="text" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IrisButton } from "@alkami/iris-vue";

export default Vue.extend({
  name: "HelloWorld",
  components: {
    IrisButton,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      text: "Click me!",
    };
  },
  methods: {
    handleClick() {
      this.text = "Clicked!";
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
