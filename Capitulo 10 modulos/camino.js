import { construirGrafo } from "./grafo.js";

export const caminos = [
    ["aldea A", "aldea B"],
    ["aldea A", "aldea C"],
    ["aldea B", "aldea D"],
    ["aldea C", "aldea D"],
    ["aldea D", "aldea E"]
];

export const grafoCamino = construirGrafo(caminos);
