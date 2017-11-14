import {dfs, bfs} from './search'
import {prim, kruskal} from './minimum-spanning-tree'

export function * animatedDfs (network, nodes, edges, start) {
  let n = 1

  for (let [edgeId, path] of dfs(network, start)) {
    const edge = edges.get(edgeId)
    const {from, to} = edge

    edges.update({id: edgeId, label: `(${n++}) ${path}`})

    nodes.update({id: from, color: 'red'})
    nodes.update({id: to, color: 'blue'})

    const toFocus = path === 'return' ? from : to
    network.view.focus(toFocus, {
      scale: 1.5,
      animation: {
        duration: 500, easingFunction: 'easeInOutQuad'
      }
    })

    yield
  }
}

export function * animatedBfs (network, nodes, edges, start) {
  let n = 1

  for (let [edgeId, path] of bfs(network, start)) {
    const edge = edges.get(edgeId)
    const {from, to} = edge

    edges.update({id: edgeId, label: `(${n++}) ${path}`})

    nodes.update({id: from, color: 'red'})
    nodes.update({id: to, color: 'blue'})

    const toFocus = path === 'return' ? from : to
    network.view.focus(toFocus, {
      scale: 1.5,
      animation: {
        duration: 500, easingFunction: 'easeInOutQuad'
      }
    })

    yield
  }
}

export function * animatePrim (network, nodes, edges, start) {
  const backupEdges = edges.get().slice()
  edges.remove(edges.map(({id}) => id))

  for (let edge of prim(network, nodes, backupEdges, start)) {
    edges.add(edge)
    yield
  }
}

export function * animateKruskal (network, nodes, edges) {
  const backupEdges = edges.get().slice()
  edges.remove(edges.map(({id}) => id))

  for (let edge of kruskal(network, nodes, backupEdges)) {
    edges.add(edge)
    yield
  }
}
