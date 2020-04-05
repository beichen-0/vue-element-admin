<template>
  <div class="fillcontain">
    <p>{{topTitle}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "moneyData",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["topTitle"])
  }
};
</script>

<style>
</style>
