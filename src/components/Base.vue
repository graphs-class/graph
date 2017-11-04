<template>
  <div class="window">
    <header class="toolbar toolbar-header">
      <h1 class="title">UFPA Graphs 2017</h1>
    </header>

    <div class="window-content">
      <sidebar></sidebar>
      <graph></graph>
    </div>

    <footer class="toolbar toolbar-footer">
      <h1 class="title">
        <a href="https://github.com/lubien" target="_blank">João Ferreira</a> |
        <a href="https://github.com/pablocabral" target="_blank">Pablo Cabral</a>
      </h1>
    </footer>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Sidebar from './Sidebar.vue'
import Graph from './Graph'

export default {
  name: 'HelloWorld',
  components: {Sidebar, Graph},
  computed: {
    ...mapGetters(['currentGraph'])
  },
  methods: {
    ...mapActions([])
  }
}
</script>
