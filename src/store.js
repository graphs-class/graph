import Vue from 'vue'
import Vuex from 'vuex'
import graphs from './graphs'

Vue.use(Vuex)

const state = {
  currentGraphId: false,
  graphs: graphs
}

const mutations = {
  setCurrentGraphId (state, id) {
    state.currentGraphId = id
  }
}

window.state = state

const actions = {
}

const getters = {
  graphs ({graphs}) {
    return graphs
  },

  currentGraph ({graphs, currentGraphId}) {
    return graphs[currentGraphId]
  }
}

export default new Vuex.Store({state, mutations, actions, getters})
