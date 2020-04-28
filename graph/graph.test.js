/*
1. addVertex를 넣는다.
2. addEdge
3. addDirectedEdge
4. isConnected
5. hasVertex
6. getGraph
*/


class Graph {
    constructor() {
        this.vertexes = {};
    }
    
    addVertex(vertex) {
        if(!this.hasVertex(vertex)) {
            this.vertexes[vertex] = [];
        }
    }

    hasVertex(vertex) {
        return !!Object.keys(this.vertexes).find((v) => v === vertex);
    }
    vertexCount() {
        return Object.keys(this.vertexes).length;
    }

    addEdge(v1, v2) {
        if(!this.hasVertex(v1) || !this.hasVertex(v2)) {
            return;
        }
        this.vertexes[v1] = [...this.vertexes[v1], v2];
        this.vertexes[v2] = [...this.vertexes[v2], v1];
        
    }
    isConnected(from, to) {
        if(!this.hasVertex(from) || !this.hasVertex(to)) {
            return;
        }
        
        return !!this.vertexes[from].find(v => v === to);
    }

    addDirectedEdge(from, to) {
        if(!this.hasVertex(from) || !this.hasVertex(to)) {
            return;
        }
        this.vertexes[from] = [...this.vertexes[from], to];
    }

}

describe('graph', () => {

    test('getGraph', () => {
        const graph = new Graph();
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addEdge('A','B');
        graph.addDirectedEdge('A','C');
    })

    test('addDirectedEdge', () => {
        const graph = new Graph();
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        graph.addDirectedEdge('A','B');
        expect(graph.isConnected('A','B')).toBeTruthy();
        expect(graph.isConnected('B','A')).toBeFalsy();
        graph.addDirectedEdge('B','A');
        expect(graph.isConnected('B','A')).toBeTruthy();
        expect(graph.isConnected('B','C')).toBeFalsy();

    });
    test('addEdge', () => {
        const graph = new Graph();
        graph.addVertex('A');

        graph.addEdge('A','C');
        expect(graph.isConnected('A','C')).toBeFalsy();

        graph.addVertex('B');
        graph.addEdge('A','B');
        expect(graph.isConnected('A','B')).toBeTruthy();
        expect(graph.isConnected('B','A')).toBeTruthy();
        graph.addVertex('C');
        graph.addEdge('B','C');
        expect(graph.isConnected('B','C')).toBeTruthy();
        expect(graph.isConnected('C','B')).toBeTruthy();


    })

    test('addVertex', () => {
        const graph = new Graph();
        expect(graph).toBeDefined();

        graph.addVertex('A');
        expect(graph.hasVertex('A')).toBeTruthy();
  })
    test('hasVertex', () => {
        const graph = new Graph();
        graph.addVertex('A');
        expect(graph.hasVertex('A')).toBeTruthy();
        graph.addVertex('B');
        expect(graph.hasVertex('B')).toBeTruthy();
      expect(graph.hasVertex('C')).toBeFalsy();
    })
    test('vertexCount', () => {
        const graph = new Graph();
        graph.addVertex('A');
        expect(graph.vertexCount()).toBe(1);
        graph.addVertex('A');
        expect(graph.vertexCount()).toBe(1);
        graph.addVertex('B');
        expect(graph.vertexCount()).toBe(2);


    })
});