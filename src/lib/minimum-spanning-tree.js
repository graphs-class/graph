export function * prim (network, nodes, edges, v) {
  const T = new Set([v])
  const V = new Set(nodes.map(x => x).filter(({id}) => id !== v))

  let minEdge = network.body.nodes[0]
  for (let i = 1; i < network.body.nodes[v].edges.length; i++) {
    const {id, from: {id: fromId}, to: {id: toId}} = network.body.nodes[v].edges[i]

    console.log(edges.get(id))

    let j, k

    if (T.has(fromId) && V.has(toId)) {
      j = fromId
      k = toId
    }

    if (T.has(toId) && V.has(fromId)) {
      j = toId
      k = fromId
    }

    if (j && k) {
      minEdge = Math.min(minEdge, +edges.get(id).label)
    }
  }
  console.log({T, V})

  yield
}
