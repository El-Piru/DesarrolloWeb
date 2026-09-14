
const vistas = document.querySelectorAll('.vista-content');


function mostrarVista(idVista) {
    vistas.forEach(function(vista) {
        vista.classList.remove('active');
    });
    const vistaSeleccionada = document.getElementById(idVista);
    if (vistaSeleccionada) {
        vistaSeleccionada.classList.add('active');
    }
}


document.getElementById('btnHubCrearPartido').addEventListener('click', function() {
    mostrarVista('VistaNuevoPartido');
});

document.getElementById('btnHubEnVivo').addEventListener('click', function() {
    mostrarVista('VistaEnVivo');
});

const btnEquipos = document.getElementById('btnHubEquipos');
if (btnEquipos) {
    btnEquipos.addEventListener('click', function() {
        mostrarVista('VistaEquipos');
        cargarEquipos();
    }); 
}

const botonesVolver = document.querySelectorAll('.btn-volver');
botonesVolver.forEach(function(boton) {
    boton.addEventListener('click', function() {
        mostrarVista('VistaInicio');
    });
});

const formNuevoPartido = document.getElementById('formNuevoPartido');
if (formNuevoPartido) {
    formNuevoPartido.addEventListener('submit', function(e) {
        e.preventDefault();

        const local = document.getElementById('selectLocal').value;
        const visitante = document.getElementById('selectVisitante').value;
        const estadio = document.getElementById('inputLugar').value || 'Estadio';

        const miniLinea= document.getElementById('infoPartidoMini') || document.getElementById('inforPartidaMini');
        if(miniLinea){
            miniLinea.innerText = `${local} • ${estadio} • ${visitante}`;
        }

        if (local == visitante) {
            alert('!No se puede crear el partido con el mismo equipo.');
            return; 
        }
        alert('Partido creado exitosamente!');

        document.getElementById('marcadorLocalNombre').innerText = local;
        document.getElementById('marcadorVisitaNombre').innerText = visitante;

        document.getElementById('golesLocal').innerText= '0';
        document.getElementById('golesVisita').innerText = '0';

        iniciarCronometro();

        formNuevoPartido.reset();
        mostrarVista('VistaEnVivo');
    }); 
}
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
        equipo.jugadores.forEach(function(jugador,index){
            filasJugadores +=`
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

let segundosTranscurridos = 0;
let intervaloCronometro = null;

function actualizarCronometroDisplay() {
    const minutos = Math.floor(segundosTranscurridos /60);
    const segundos = segundosTranscurridos % 60;

    const minFormateados = minutos < 10 ? '0' + minutos : minutos;
    const segFormateados = segundos < 10 ? '0' + segundos : segundos;

    document.getElementById('cronometroPartido').innerText = minFormateados + ':' + segFormateados;

}

function iniciarCronometro() {

    clearInterval(intervaloCronometro);
    segundosTranscurridos = 0;
    actualizarCronometroDisplay();

    intervaloCronometro = setInterval(function() {
        segundosTranscurridos++;
        actualizarCronometroDisplay();
    },1000);
}

function registrarIncidencia(textoEvento){
    const lista = document.getElementById('ListaEventos');

    const mensajeVacio = lista.querySelector('.Evento-vacio');
    if(mensajeVacio){
        mensajeVacio.remove();
    }


    const minutoActual = Math.floor(segundosTranscurridos / 60) + 1;

    const item = document.createElement('li');
    item.innerHTML = `<strong>Min ${minutoActual}':</strong> ${textoEvento}`;

    lista.append(item);
}

const btnGol = document.getElementById('btnGol');
const modalGol = document.getElementById('modalGol');
const btnGolLocal = document.getElementById('btnGolLocal');
const btnGolVisita = document.getElementById('btnGolVisita');
const btnCancelarGol = document.getElementById('btnCancelarGol');

if (btnGol) {
    btnGol.addEventListener('click', function() {
        const local = document.getElementById('marcadorLocalNombre').innerText;
        const visitante = document.getElementById('marcadorVisitaNombre').innerText;
        btnGolLocal.innerText = `Gol de ${local}`;
        btnGolVisita.innerText = `Gol de ${visitante}`;
        modalGol.style.display = 'flex';
    });
}

if (btnGolLocal) {
    btnGolLocal.addEventListener('click', function() {
        const local = document.getElementById('marcadorLocalNombre').innerText;
        const golesActuales = parseInt(document.getElementById('golesLocal').innerText) || 0;
        document.getElementById('golesLocal').innerText = golesActuales + 1;
        registrarIncidencia(`¡GOL de ${local}!`);
        modalGol.style.display = 'none';
    });
}

if (btnGolVisita) {
    btnGolVisita.addEventListener('click', function() {
        const visitante = document.getElementById('marcadorVisitaNombre').innerText;
        const golesActuales = parseInt(document.getElementById('golesVisita').innerText) || 0;
        document.getElementById('golesVisita').innerText = golesActuales + 1;
        registrarIncidencia(`¡GOL de ${visitante}!`);
        modalGol.style.display = 'none';
    });
}

if (btnCancelarGol) {
    btnCancelarGol.addEventListener('click', function() {
        modalGol.style.display = 'none';
    });
}
