<template>
  <div class="window">
    <header class="toolbar toolbar-header">
      <h1 class="title">UFPA Graphs 2017</h1>
    </header>

    <div class="window-content">
      <sidebar></sidebar>

      <div class="pane">
        <template>
          <header v-if="animation" class="toolbar toolbar-header">
            <div class="toolbar-actions">
              <button @click="stopAnimation" class="btn btn-default">
                <span class="icon icon-stop icon-text"></span>
                Finish
              </button>
            </div>
          </header>

          <header v-else-if="selectedNode" class="toolbar toolbar-header">
            <div class="toolbar-actions">
              <button @click="animate('dfs')" class="btn btn-default">
                <span class="icon icon-search icon-text"></span>
                Depth First Search
              </button>

              <button @click="animate('bfs')" class="btn btn-default">
                <span class="icon icon-search icon-text"></span>
                Breadth First Search
              </button>

          <button @click="animate('prim')" class="btn btn-default">
                <span class="icon icon-search icon-text"></span>
                Prim
              </button>
            </div>
          </header>

          <header v-else class="toolbar toolbar-header">
            <div class="toolbar-actions">
              <button @click="animate('kruskal')" class="btn btn-default">
                <span class="icon icon-search icon-text"></span>
                Kruskal
              </button>

              <button @click="animate('boruvka')" class="btn btn-default">
                <span class="icon icon-search icon-text"></span>
                Boruvka
              </button>

              |

              <span>Click on some node for more algorithms</span>
            </div>
          </header>
        </template>

        <graph
          ref="graph"
          v-if="!!graph"
          :key="graph.id"
          :graph="graph"
          :onClick="onClickNode"
          :onDoubleClick="onDoubleClickNode"
        >
        </graph>
      </div>
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
import * as algorithms from '../lib/animations'

export default {
  name: 'Base',

  components: {Sidebar, Graph},

  data: () => ({
    selectedNode: false,
    animation: false,
    animationGraph: false,
  }),

  computed: {
    ...mapGetters(['currentGraph']),

    graph() {
      return this.animation
        ? this.animationGraph
        : this.currentGraph
    }
  },

  methods: {
    onClickNode({nodes}) {
      if (nodes.length)
        this.selectedNode = nodes[0]
    },

    onDoubleClickNode({nodes}) {
      if (nodes.length)
        this.$refs.graph.focusNode(nodes[0])
    },

    async animate(algorithm) {
      this.animationGraph = {
        nodes: this.currentGraph.nodes.slice(),
        edges: this.currentGraph.edges.slice(),
        options: this.currentGraph.options
      }
      this.animation = true

      let it

      if (['kruskal', 'boruvka'].includes(algorithm)) {
        it = algorithms[algorithm](this.$refs.graph)
      } else {
        const start = this.selectedNode
        this.$refs.graph.focusNode(start)
        it = algorithms[algorithm](this.$refs.graph, start)
      }

      const time = n =>
        new Promise(resolve =>
          setTimeout(resolve, n)
        )

      let done = false

      await time(1000)

      while (this.animation && !done) {
        const next = it.next()
        done = next.done
        await time(1000)
      }
    },

    stopAnimation () {
      this.animation = false
    }
  }
}
</script>
