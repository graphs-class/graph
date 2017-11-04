let id = 0

export default [
  {
    id: id++,
    name: 'First',
    description: '10/17/2017',

    options: {
      layout: {
        randomSeed: 2,
        hierarchical: false
      }
    },

    nodes: [
      {id: 1, label: '1'},
      {id: 2, label: '2'},
      {id: 3, label: '3'},
      {id: 4, label: '4'},
      {id: 5, label: '5'},
      {id: 6, label: '6'},
      {id: 7, label: '7'}
    ],

    edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 3},
      {from: 3, to: 4},
      {from: 3, to: 5},
      {from: 3, to: 6},
      {from: 3, to: 7},
      {from: 4, to: 5}
    ]
  },

  {
    id: id++,
    name: 'Second',
    description: '10/31/2017',

    options: {
      layout: {
        randomSeed: 2,
        hierarchical: false
      }
    },

    nodes: [
      {id: 'A', label: 'A'},
      {id: 'B', label: 'B'},
      {id: 'C', label: 'C'},
      {id: 'D', label: 'D'},
      {id: 'E', label: 'E'},
      {id: 'F', label: 'F'}
    ],

    edges: [
      {from: 'A', to: 'B'},
      {from: 'A', to: 'C'},
      {from: 'B', to: 'C'},
      {from: 'B', to: 'D'},
      {from: 'B', to: 'F'},
      {from: 'C', to: 'D'},
      {from: 'C', to: 'E'},
      {from: 'D', to: 'E'},
      {from: 'D', to: 'F'},
      {from: 'E', to: 'F'}
    ]
  },

  {
    id: id++,
    name: 'Extra',

    options: {
      layout: {
        randomSeed: 2,
        hierarchical: {
          direction: 'UD',
          sortMethod: 'directed'
        }
      }
    },

    nodes: Array.from(Array(12), (_, i) => ({id: i + 1, label: `${i + 1}`})),

    edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 1, to: 4},
      {from: 2, to: 5},
      {from: 2, to: 6},
      {from: 4, to: 7},
      {from: 4, to: 8},
      {from: 5, to: 9},
      {from: 5, to: 10},
      {from: 7, to: 11},
      {from: 7, to: 12}
    ]
  }
]
