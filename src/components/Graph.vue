<template>
  <div ref="network" class="network"></div>
</template>

<script>
import vis from 'vis'
import {mapGetters, mapMutations} from 'vuex'

// Vis doesn't work properly inside a Vue component state
let network, nodes, edges

export default {
  name: 'Graph',

  props: {
    graph: [Boolean, Object],
    onClick: Function,
    onDoubleClick: Function,
  },

  data: () => ({
    nodes: null,
    edges: null,
  }),

  mounted () {
    if (network) {
      network.destroy()
      network = false
    }

    const container = this.$refs.network
    this.nodes = nodes = new vis.DataSet(this.graph.nodes)
    this.edges = edges = new vis.DataSet(this.graph.edges)
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

  computed: {
  },

  methods: {
    focusNode (id) {
      network.view.focus(id, {
        scale: 1.5,
        animation: {
          duration: 500, easingFunction: 'easeInOutQuad'
        }
      })
    },

    updateNode(data) {
      nodes.update(data)
    },

    updateEdge(data) {
      edges.update(data)
    },

    edgesOf(v) {
      return this.edges
        .get({
          filter({to, from}) {
            return to === v || from === v
          }
        })
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
