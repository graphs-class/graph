export function * dfs (network, v, marked = new Set(), exploredEdges = new Set()) {
  marked.add(v)

  for (let i = 0; i < network.body.nodes[v].edges.length; i++) {
    const edge = network.body.nodes[v].edges[i]
    const {id, toId: w} = edge

    if (!marked.has(w)) {
      marked.add(w)

      const value = [id, 'search']
      exploredEdges.add(id)
      yield value

      yield * dfs(network, w, marked, exploredEdges)
    } else if (!exploredEdges.has(id)) {
      const value = [id, 'return']
      exploredEdges.add(id)
      yield value
    }
  }
}

export function * bfs (network, v) {
  const Q = []
  const marked = new Set()
  const exploredEdges = new Set()

  marked.add(v)
  Q.push(v)

  while (Q.length) {
    const v = Q.shift()

    for (let i = 0; i < network.body.nodes[v].edges.length; i++) {
      const edge = network.body.nodes[v].edges[i]
      const {id, toId: w} = edge

      if (!marked.has(w)) {
        const value = [id, 'search']
        exploredEdges.add(id)
        yield value

        Q.push(w)
        marked.add(w)
      } else if (!exploredEdges.has(id)) {
        const value = [id, 'return']
        exploredEdges.add(id)
        yield value
      }
    }
  }
}
