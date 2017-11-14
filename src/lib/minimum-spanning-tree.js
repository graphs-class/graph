import {DataSet} from 'vis'
import {dfs} from './search'

function sameSet (A, B) {
  return contains(A, B) && contains(B, A)
}

function contains (A, B) {
  return Array.from(B.values()).every(v => A.has(v))
}

function hasCycle (network) {
  const anyEdgeId = network.body.edgeIndices[0]
  const {from} = network.body.edges[anyEdgeId]
  return Array.from(dfs(network, from.id))
    .some(([edgeId], i, ref) =>
      ref.slice(i + 1).find(([otherId]) => edgeId === otherId)
    )
}

export function * prim (network, nodes, edges, v) {
  const edgeSet = new DataSet(edges)
  const N = new Set(nodes.map(({id}) => id))
  const T = new Set([v])
  const V = new Set(nodes.map(({id}) => id).filter(id => id !== v))

  while (!sameSet(N, T)) {
    const {from, to, label} = edgeSet.get({
      filter ({from, to}) {
        return (T.has(from) && V.has(to)) ||
               (V.has(from) && T.has(to))
      }
    })
      .reduce((a, b) => +a.label < +b.label ? a : b)

    const k = V.has(from) ? from : to
    T.add(k)
    V.delete(k)

    yield {from, to, label}
  }
}

export function * kruskal (network, nodes, edges) {
  const H = edges.sort((a, b) => (+a.label) - (+b.label))
  let T = H.shift()

  while (H.length) {
    yield T
    if (hasCycle(network)) {
      return alert('Graph has cycle')
    }
    T = H.shift()
  }
}
