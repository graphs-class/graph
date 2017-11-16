import {DataSet} from 'vis'
import {dfs} from './search'

function xor (p, q) {
  return p && !q
}

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

function connectedEdges (edgeA, edgeB) {
  return edgeA.from === edgeB.from ||
		 edgeA.from === edgeB.to   ||
		 edgeA.to   === edgeB.from ||
		 edgeA.to   === edgeB.to
}

function conectedComponents (others, component) {
  return others
	.filter(edges =>
	  edges.some(otherEdge => 
		component.some(edge => connectedEdges(edge, otherEdge))
	  )
	)
}

function minimalConnectedComponent (others, component) {
  let min
  let pairedComponent
  
  for (let edges of others) {
	const connectedEdges = edges.filter( )
  }
}

/*
export function * boruvka (network, nodes, edges) {
  const components = edges.map(edge => [edge])

  while (components.length > 1) {
	for (let [i, component] of components.entries()) {
	  const others = components.filter((_, j) => i !== j)
	  const connected = conectedComponents(others, component)
	}
  }  
}
*/

function connects (edge, a, b) {
  return (edge.from === a && edge.to === b) ||
	     (edge.from === b && edge.to === a)
}

function connectedTo (edges, node) {
  return edges
	.filter(({to, from}) => from === node || to === node)
	/*.map(edge => ({
	  node: edge.from === node ? edge.to : edge.from,
	  label: edge.label
	}))*/
}

export function * boruvka (network, nodes, edges) {
  const components = edges.map(edge => [edge])
  
  while (components.length > 1) {
	const edges = []
	for (let component of components) {
	  const m = component
		.map(node => connectedTo(edges, node))
		.filter(({from, to}) =>
		  xor(component.includes(from), component.includes(to))
		)
		.sort((a, b) => (+a.label) - (+b.label))
		.shift()
	  for (let node of component) {
	    const m = connectedTo(edges, node)
		  .filter(({from, to}) =>
		    (from === node && !component.includes(to)) ||
		    (to === node && !component.includes(from))	
		  )
		  .sort((a, b) => (+a.label) - (+b.label))
		  .shift()
	  }
	  
	  if (!edges.some(({id}) => m.id)) {
		edges.append(m)
	  }
	  
	  console.log({m, component, edges})
	  yield
	}
  }
}