import { grafoCamino } from "./caminos.js";

export function crearEstadoPueblo(lugar, paquetes) {
    return { lugar, paquetes };
}

export function mover(estado, destino) {
    if (!grafoCamino[estado.lugar][destino]) return estado;

    let paquetes = estado.paquetes.map(p =>
        p.lugar !== estado.lugar ? p : { lugar: destino, direccion: p.direccion }
    ).filter(p => p.lugar !== p.direccion);

    return crearEstadoPueblo(destino, paquetes);
}
