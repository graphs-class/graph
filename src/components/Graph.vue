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
    </template>

    <div ref="network" class="network"></div>
  </div>
</template>

<script>
import vis from 'vis'
import {mapGetters, mapMutations} from 'vuex'
import {animatedDfs, animatedBfs, animatePrim} from '../lib/animations'

// Vis doesn't work properly inside a Vue component state
let network

export default {
  name: 'Graph',
  data: () => ({
    nodes: false,
    edges: false,
    options: {},

    selected: false,
    animation: false
  }),
  mounted () {
    const container = this.$refs.network
    const data = {
      nodes: [],
      edges: []
    }
    const options = {}
    network = new vis.Network(container, data, options)

    network.on('click', this.onClick)
    network.on('doubleClick', this.onDoubleClick)

    window.network = network

    if (!this.currentGraph && this.graphs.length) {
      this.setCurrentGraphId(this.graphs[0].id)
    }
  },
  watch: {
    graph () {
      if (!this.graph) {
        return
      }

      network.setData({
        nodes: this.graph.nodes,
        edges: this.graph.edges
      })
      network.setOptions(this.graph.options)
    }
  },
  computed: {
    ...mapGetters(['currentGraph', 'graphs']),

    graph () {
      if (this.animation) {
        return {edges: this.edges, nodes: this.nodes, options: this.options}
      }

      return this.currentGraph
    }
  },
  methods: {
    ...mapMutations(['setCurrentGraphId']),

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
      this.nodes = new vis.DataSet(this.currentGraph.nodes)
      this.edges = new vis.DataSet(this.currentGraph.edges)
      this.options = this.currentGraph.options
      this.animation = true

      const animate = ({
        dfs: animatedDfs,
        bfs: animatedBfs,
        prim: animatePrim
      })[algorithm]

      const start = this.selected
      this.focusOnNode(start)
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
