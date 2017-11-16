<template>
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

      <header v-else-if="selected" class="toolbar toolbar-header">
        <div class="toolbar-actions">
          <button @click="animateSearch('dfs')" class="btn btn-default">
            <span class="icon icon-search icon-text"></span>
            Depth First Search
          </button>

          <button @click="animateSearch('bfs')" class="btn btn-default">
            <span class="icon icon-search icon-text"></span>
            Breadth First Search
          </button>

		  <button @click="animateSearch('prim')" class="btn btn-default">
            <span class="icon icon-search icon-text"></span>
            Prim
          </button>
        </div>
      </header>

      <header v-else class="toolbar toolbar-header">
        <div class="toolbar-actions">
          <button @click="animateSearch('kruskal')" class="btn btn-default">
            <span class="icon icon-search icon-text"></span>
            Kruskal
          </button>
		  
		  <button @click="animateSearch('boruvka')" class="btn btn-default">
            <span class="icon icon-search icon-text"></span>
            Boruvka
          </button>
        </div>
      </header>
    </template>

    <div ref="network" class="network"></div>
  </div>
</template>

<script>
import vis from 'vis'
import {mapGetters, mapMutations} from 'vuex'
import {animatedDfs, animatedBfs, animatePrim, animateKruskal, animateBoruvka} from '../lib/animations'

// Vis doesn't work properly inside a Vue component state
let network

export default {
  name: 'Graph',
  data: () => ({
    nodes: false,
    edges: false,
    options: {},

    selected: false,
    animation: false,
    backup: {nodes: false, edges: false}
  }),
  mounted () {
    this.mountNetwork()

    if (!this.currentGraph && this.graphs.length) {
      this.setCurrentGraphId(this.graphs[0].id)
    }
  },
  watch: {
    graph () {
      if (!this.graph) {
        return
      }

      this.mountNetwork()
    }
  },
  computed: {
    ...mapGetters(['currentGraph', 'graphs']),

    graph () {
      return this.currentGraph
    }
  },
  methods: {
    ...mapMutations(['setCurrentGraphId']),

    mountNetwork () {
      if (!this.graph) {
        return
      }

      if (network) {
        network.destroy()
        network = false
      }

      const container = this.$refs.network
      this.nodes = new vis.DataSet(this.graph.nodes)
      this.edges = new vis.DataSet(this.graph.edges)
      const data = {
        nodes: this.nodes,
        edges: this.edges
      }
      const options = this.graph.options
      network = new vis.Network(container, data, options)

      network.on('click', this.onClick)
      network.on('doubleClick', this.onDoubleClick)

      window.network = network
    },

    onClick (event) {
      this.selectNode(event.nodes[0])
    },

    onDoubleClick (event) {
      this.focusOnNode(event.nodes[0])
    },

    selectNode (id) {
      this.selected = id
    },

    focusOnNode (id) {
      network.view.focus(id, {
        scale: 1.5,
        animation: {
          duration: 500, easingFunction: 'easeInOutQuad'
        }
      })
    },

    time (n) {
      return new Promise(resolve => {
        setTimeout(resolve, n)
      })
    },

    animateSearch: async function (algorithm) {
      this.backup.nodes = this.graph.nodes
      this.backup.edges = this.graph.edges
      this.animation = true

      const animate = ({
        dfs: animatedDfs,
        bfs: animatedBfs,
        prim: animatePrim,
        kruskal: animateKruskal,
		boruvka: animateBoruvka
      })[algorithm]

      const start = this.selected
      this.focusOnNode(start)
      console.log({network})
      const it = animate(network, this.nodes, this.edges, start)

      let done = false
      await this.time(1000)
      while (this.animation && !done) {
        const next = it.next()
        done = next.done
        await this.time(1000)
      }
    },

    stopAnimation () {
      this.animation = false
      this.graph.nodes = this.backup.nodes
      this.graph.edges = this.backup.edges
      this.mountNetwork()
    }
  }
}
</script>

<style scoped>
.pane {
  overflow-y: hidden
}
.network {
  width: 100%;
  height: 100%;
}
</style>
