import dijkstra from 'dijkstrajs';

export function construirGrafo(caminos) {
    let grafo = Object.create(null);
    for (let [desde, hasta] of caminos) {
        if (!(desde in grafo)) grafo[desde] = {};
        if (!(hasta in grafo)) grafo[hasta] = {};
        grafo[desde][hasta] = 1;
        grafo[hasta][desde] = 1;
    }
    return grafo;
}
