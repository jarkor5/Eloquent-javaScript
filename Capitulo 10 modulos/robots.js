import { grafoCamino } from "./caminos.js";
import randomItem from 'random-item';
import dijkstra from 'dijkstrajs';

export function robotAleatorio(estado) {
    return { direccion: randomItem(Object.keys(grafoCamino[estado.lugar])) };
}

export const rutaCorreo = ["aldea A", "aldea E", "aldea D", "aldea C", "aldea B", "aldea A"];

export function robotRuta(estado, memoria = []) {
    if (memoria.length === 0) memoria = rutaCorreo;
    return { direccion: memoria[0], memoria: memoria.slice(1) };
}

export function encontrarRuta(desde, hasta) {
    return dijkstra.find_path(grafoCamino, desde, hasta);
}

export function robotInteligente(estado, memoria = []) {
    if (memoria.length === 0) {
        let paquete = estado.paquetes[0];
        memoria = encontrarRuta(estado.lugar, paquete.direccion);
    }
    return { direccion: memoria[0], memoria: memoria.slice(1) };
}
