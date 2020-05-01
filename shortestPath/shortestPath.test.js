class Graph {
    constructor() {
        this.vertexes = {};
    }
    addVertex(vertex) {
        if (!this.hasVertex(vertex)) {
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
        if (!this.hasVertex(v1) || !this.hasVertex(v2)) {
            return;
        }
        this.vertexes[v1] = [...this.vertexes[v1], v2];
        this.vertexes[v2] = [...this.vertexes[v2], v1];

    }
    isConnected(from, to) {
        if (!this.hasVertex(from) || !this.hasVertex(to)) {
            return;
        }


        return !!this.vertexes[from].find(v => v === to);
    }

    addDirectedEdge(from, to) {
        if (!this.hasVertex(from) || !this.hasVertex(to)) {
            return;
        }
        if (this.hasEdge(from, to)) {
            return;
        }
        this.vertexes[from] = [...this.vertexes[from], to];
    }
    getGraph() {
        return this.vertexes;
    }
    hasEdge(from, to) {
        if (!this.hasVertex(from) || !this.hasVertex(to)) {
            return false;
        }
        return !!this.vertexes[from].find(v => v === to)
    }

    bfs(from) {
        const queue = [from];
        const result = [from];
        const visited = [from];
        while (queue.length != 0) {
            const vertex = queue.shift();
            for(let i = 0; i < this.vertexes[vertex].length; i++) {
                if(!visited.find(v => v === this.vertexes[vertex][i])) {
                    queue.push(this.vertexes[vertex][i]);
                    visited.push(this.vertexes[vertex][i]);
                    result.push(this.vertexes[vertex][i]);
                }
            }
        }
        return result;
    }

    BFSshortestPath(from, target) {
        const queue = [[from]];
        // const result = [from];
        const visited = [from];
        while (queue.length != 0) {
            const history = queue.shift();
            const vertex = history[history.length - 1];
            for(let i = 0; i < this.vertexes[vertex].length; i++) {
                if(!visited.find(v => v === this.vertexes[vertex][i])) {
                    if(this.vertexes[vertex][i] === target) {
                        return [...history, this.vertexes[vertex][i]];
                    }
                    queue.push([...history, this.vertexes[vertex][i]]);
                    visited.push(this.vertexes[vertex][i]);
                }
            }
        }
        return [];
    }
}

describe('BFS', () => {
    test('BFSshortestPath', () => {
        const undirectedGraph = new Graph();

        undirectedGraph.addVertex("A");
        undirectedGraph.addVertex("B");
        undirectedGraph.addVertex("C");
        undirectedGraph.addVertex("D");
        undirectedGraph.addEdge('A', 'B');
        undirectedGraph.addEdge('A', 'C');
        undirectedGraph.addEdge('B', 'D');
        undirectedGraph.addEdge('C', 'D');

        expect(undirectedGraph.BFSshortestPath('A','B')).toEqual(['A', 'B']);
        expect(undirectedGraph.BFSshortestPath('A','D')).toEqual(['A', 'B', 'D']);

        const graph = new Graph();
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addVertex('E');
        graph.addVertex('G');
        graph.addVertex('K');
        graph.addVertex('F');

        graph.addEdge('A','B');
        graph.addEdge('A','D');
        graph.addEdge('A','C');
        graph.addEdge('B','K');
        graph.addEdge('B','F');
        graph.addEdge('F','K');
        graph.addEdge('C','F');
        graph.addEdge('C','D');
        graph.addEdge('C','G');
        graph.addEdge('D','G');

        expect(graph.BFSshortestPath('A','K')).toEqual(['A', 'B', 'K']);
        expect(graph.BFSshortestPath('A','E')).toEqual([]);
        expect(graph.BFSshortestPath('A','G')).toEqual(['A','D','G']);


    })

    test('directedBFS', () => {
        const graph = new Graph();
        graph.addVertex("A");
        graph.addVertex("B");
        graph.addVertex("C");
        graph.addVertex("D");
        graph.addDirectedEdge('A', 'B');
        graph.addDirectedEdge('A', 'C');
        graph.addDirectedEdge('B', 'D');
        graph.addDirectedEdge('C', 'D');

        expect(graph.bfs('A')).toEqual(['A', 'B', 'C', 'D']);
        expect(graph.bfs('B')).toEqual(['B', 'D']);

    });

    test('unDirectedBFS', () => {
        const undirectedGraph = new Graph();

        undirectedGraph.addVertex("A");
        undirectedGraph.addVertex("B");
        undirectedGraph.addVertex("C");
        undirectedGraph.addVertex("D");
        undirectedGraph.addEdge('A', 'B');
        undirectedGraph.addEdge('A', 'C');
        undirectedGraph.addEdge('B', 'D');
        undirectedGraph.addEdge('C', 'D');

        expect(undirectedGraph.bfs('A')).toEqual(['A', 'B', 'C', 'D']);
        expect(undirectedGraph.bfs('B')).toEqual(['B', 'A', 'D', 'C']);
    });





});