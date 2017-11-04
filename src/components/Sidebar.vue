<template>
  <div class="pane pane-sm sidebar">
    <ul class="list-group">
      <li v-for="graph in graphs" class="list-group-item clickable" :class="{active: graph.id === currentGraphId}">
        <div class="media-body" @click.prevent="setCurrentGraphId(graph.id)">
          <strong>{{graph.name}}</strong>
          <p v-if="graph.description">{{graph.description}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'Sidebar',
  computed: {
    ...mapState(['currentGraphId']),
    ...mapGetters(['graphs'])
  },
  methods: {
    ...mapMutations(['setCurrentGraphId'])
  }
}
</script>
