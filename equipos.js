
const datosEquipos = [
    {
        nombre: "Colo-Colo",
        jugadores: ["Esteban Pavez", "Arturo Vidal", "Lucas Cepeda", "Brayan Cortés"]
    },
    {
        nombre: "U. de Chile",
        jugadores: ["Marcelo Díaz", "Charles Aránguiz", "Leandro Fernández", "Gabriel Castellón"]
    },
    {
        nombre: "U. Católica",
        jugadores: ["Fernando Zampedri", "Gonzalo Tapia", "Jader Gentil", "Sebastián Pérez"]
    },
    {
        nombre: "Cobreloa",
        jugadores: ["Rodolfo González", "Cristián Insaurralde", "Juan Leiva", "Nicolás Avellaneda"]
    }
];

function cargarEquipos() {
    const contenedor = document.getElementById('contenedorEquipos');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    datosEquipos.forEach(function(equipo) {
        const acordeon = document.createElement('details');
        acordeon.className = 'equipo-acordeon';

        let filasJugadores = '';
        equipo.jugadores.forEach(function(jugador, index) {
            filasJugadores += `
                <tr>
                    <td class="col-numero">${index + 1}</td>
                    <td class="col-nombre">${jugador}</td>
                </tr>
            `;
        });

        acordeon.innerHTML = `
            <summary class="equipo-summary">
                <span class="nombre-club">${equipo.nombre}</span>
                <span class="badge-total">${equipo.jugadores.length} Jugadores</span>
            </summary>
            <div class="tabla-contenedor">
                <table class="tabla-Jugadores">
                    <thead>
                        <tr>
                            <th class="col-numero">#</th>
                            <th class="col-nombre">Nombre del Jugador</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filasJugadores}
                    </tbody>
                </table>
            </div>
        `;

        contenedor.appendChild(acordeon);
    });
}

const btnEquipos = document.getElementById('btnHubEquipos');
if (btnEquipos) {
    btnEquipos.addEventListener('click', function() {
        mostrarVista('VistaEquipos');
        cargarEquipos();
    });
}