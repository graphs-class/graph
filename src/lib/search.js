export function * dfs (graph, v, marked = new Set(), exploredEdges = new Set()) {
  marked.add(v)

  for (let edge of graph.edgesOf(v)) {
    const {id, to, from} = edge
    const w = to === v ? from : to

    if (!marked.has(w)) {
      marked.add(w)

      const value = [id, 'search']
      exploredEdges.add(id)
      yield value

      yield * dfs(graph, w, marked, exploredEdges)
    } else if (!exploredEdges.has(id)) {
      const value = [id, 'return']
      exploredEdges.add(id)
      yield value
    }
  }
}

export function * bfs (graph, v) {
  const Q = []
  const marked = new Set()
  const exploredEdges = new Set()

  marked.add(v)
  Q.push(v)

  while (Q.length) {
    const v = Q.shift()

    for (let edge of graph.edgesOf(v)) {
      const {id, to, from} = edge
      const w = to === v ? from : to

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
