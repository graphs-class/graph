import * as search from './search'
import * as minimumSpanningTree from './minimum-spanning-tree'

const COLOR_PRIMARY = '#8e44ad'
const COLOR_SECONDARY = '#27ae60'

export function * dfs (graph, start) {
  let n = 1

  for (let [edgeId, path] of search.dfs(graph, start)) {
    const edge = graph.edges.get(edgeId)
    const {from, to} = edge

    const {nodes, edges} = graph
    graph.updateEdge({id: edgeId, label: `(${n++}) ${path}`})
      graph.updateNode({id: from, color: COLOR_PRIMARY})
      graph.updateNode({id: to, color: COLOR_SECONDARY})

      const toFocus = path === 'return' ? from : to
      graph.focusNode(toFocus)

      yield
    }
  }

export function * bfs (graph, start) {
  let n = 1

  for (let [edgeId, path] of search.bfs(graph, start)) {
    const edge = graph.edges.get(edgeId)
    const {from, to} = edge

    graph.updateEdge({id: edgeId, label: `(${n++}) ${path}`})

    graph.updateNode({id: from, color: COLOR_PRIMARY})
    graph.updateNode({id: to, color: COLOR_SECONDARY})

    const toFocus = path === 'return' ? from : to
    graph.focusNode(toFocus)

    yield
  }
}

export function * prim (graph, start) {
  const backupEdges = edges.get().slice()
  edges.remove(edges.map(({id}) => id))

  for (let edge of minimumSpanningTree.prim(graph, start)) {
    edges.add(edge)
    yield
  }
}

export function * kruskal (graph, nodes, edges) {
  const backupEdges = edges.get().slice()
  edges.remove(edges.map(({id}) => id))

  for (let edge of minimumSpanningTree.kruskal(graph, nodes, backupEdges)) {
    edges.add(edge)
    yield
  }
}

export function * boruvka (graph, nodes, edges) {
  const backupEdges = edges.get()

  if (!backupEdges.every(({label}) => +label)) {
    return alert('Cannot run Boruvka algorithm on a non-weighted graph')
  }

  edges.remove(edges.map(({id}) => id))

  for (let edge of minimumSpanningTree.boruvka(graph, nodes, backupEdges)) {
    edges.add(edge)
    yield
  }
}
