
document.getElementById('btnHubEnVivo')?.addEventListener('click', function() {
    mostrarVista('VistaEnVivo');
});


let segundosTranscurridos = 0;
let intervaloCronometro = null;

function actualizarCronometroDisplay() {
    const minutos = Math.floor(segundosTranscurridos / 60);
    const segundos = segundosTranscurridos % 60;

    const minFormateados = minutos < 10 ? '0' + minutos : minutos;
    const segFormateados = segundos < 10 ? '0' + segundos : segundos;

    const crono = document.getElementById('cronometroPartido');
    if (crono) {
        crono.innerText = minFormateados + ':' + segFormateados;
    }
}

function iniciarCronometro() {
    clearInterval(intervaloCronometro);
    segundosTranscurridos = 0;
    actualizarCronometroDisplay();

    intervaloCronometro = setInterval(function() {
        segundosTranscurridos++;
        actualizarCronometroDisplay();
    }, 1000);
}

function registrarIncidencia(textoEvento) {
    const lista = document.getElementById('ListaEventos');
    if (!lista) return;

    const mensajeVacio = lista.querySelector('.Evento-vacio');
    if (mensajeVacio) {
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
        if (!hayPartidoActivo()) {
            alert('No hay un partido activo en este momento.');
            return;
        }
        const local = document.getElementById('marcadorLocalNombre').innerText;
        const visitante = document.getElementById('marcadorVisitaNombre').innerText;
        btnGolLocal.innerText = `Gol de ${local}`;
        btnGolVisita.innerText = `Gol de ${visitante}`;
        modalGol.style.display = 'flex';
    });
}

if (btnGolLocal) {
    btnGolLocal.addEventListener('click', function() {
        if (!hayPartidoActivo()) return;
        const local = document.getElementById('marcadorLocalNombre').innerText;
        const golesActuales = parseInt(document.getElementById('golesLocal').innerText) || 0;
        document.getElementById('golesLocal').innerText = golesActuales + 1;
        registrarIncidencia(`¡GOL de ${local}!`);
        modalGol.style.display = 'none';
    });
}

if (btnGolVisita) {
    btnGolVisita.addEventListener('click', function() {
        if (!hayPartidoActivo()) return;
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


let tipoTarjetaActual = 'Amarilla';
const modalTarjeta = document.getElementById('modalTarjeta');
const btnTarjetaLocal = document.getElementById('btnTarjetaLocal');
const btnTarjetaVisita = document.getElementById('btnTarjetaVisita');
const btnCancelarTarjeta = document.getElementById('btnCancelarTarjeta');
const inputJugador = document.getElementById('inputJugadorTarjeta');

function abrirModalTarjeta(tipo, titulo) {
    tipoTarjetaActual = tipo;
    document.getElementById('tituloModalTarjeta').innerText = titulo;

    const local = document.getElementById('marcadorLocalNombre').innerText;
    const visitante = document.getElementById('marcadorVisitaNombre').innerText;

    btnTarjetaLocal.innerText = local;
    btnTarjetaVisita.innerText = visitante;
    inputJugador.value = '';

    modalTarjeta.style.display = 'flex';
}

document.getElementById('btnAmarilla')?.addEventListener('click', function() {
    if (!hayPartidoActivo()) {
        alert('No hay un partido activo en este momento.');
        return;
    }
    abrirModalTarjeta('Amarilla', 'Tarjeta Amarilla');
});

document.getElementById('btnRoja')?.addEventListener('click', function() {
    if (!hayPartidoActivo()) {
        alert('No hay un partido activo en este momento.');
        return;
    }
    abrirModalTarjeta('Roja', 'Tarjeta Roja');
});

btnTarjetaLocal?.addEventListener('click', function() {
    const local = document.getElementById('marcadorLocalNombre').innerText;
    const jugador = inputJugador.value.trim();
    const detalle = jugador ? ` - ${jugador}` : '';
    const icono = tipoTarjetaActual === 'Amarilla' ? '🟨' : '🟥';

    registrarIncidencia(`${icono} Tarjeta ${tipoTarjetaActual}: ${local}${detalle}`);
    modalTarjeta.style.display = 'none';
});

btnTarjetaVisita?.addEventListener('click', function() {
    const visitante = document.getElementById('marcadorVisitaNombre').innerText;
    const jugador = inputJugador.value.trim();
    const detalle = jugador ? ` - ${jugador}` : '';
    const icono = tipoTarjetaActual === 'Amarilla' ? '🟨' : '🟥';

    registrarIncidencia(`${icono} Tarjeta ${tipoTarjetaActual}: ${visitante}${detalle}`);
    modalTarjeta.style.display = 'none';
});

btnCancelarTarjeta?.addEventListener('click', function() {
    modalTarjeta.style.display = 'none';
});


const btnCambio = document.getElementById('btnCambio');
const modalCambio = document.getElementById('modalCambio');
const inputJugadorSale = document.getElementById('inputJugadorSale');
const inputJugadorEntra = document.getElementById('inputJugadorEntra');
const btnCambioLocal = document.getElementById('btnCambioLocal');
const btnCambioVisita = document.getElementById('btnCambioVisita');
const btnCancelarCambio = document.getElementById('btnCancelarCambio');

if (btnCambio) {
    btnCambio.addEventListener('click', function() {
        const local = document.getElementById('marcadorLocalNombre').innerText;
        const visitante = document.getElementById('marcadorVisitaNombre').innerText;

        btnCambioLocal.innerText = local;
        btnCambioVisita.innerText = visitante;

        inputJugadorSale.value = '';
        inputJugadorEntra.value = '';

        modalCambio.style.display = 'flex';
    });
}

btnCambioLocal?.addEventListener('click', function() {
    const local = document.getElementById('marcadorLocalNombre').innerText;
    const sale = inputJugadorSale.value.trim() || 'Jugador';
    const entra = inputJugadorEntra.value.trim() || 'Jugador';

    registrarIncidencia(`Cambio en ${local}: Sale ${sale} -> entra ${entra}`);
    modalCambio.style.display = 'none';
});

btnCambioVisita?.addEventListener('click', function() {
    const visitante = document.getElementById('marcadorVisitaNombre').innerText;
    const sale = inputJugadorSale.value.trim() || 'Jugador';
    const entra = inputJugadorEntra.value.trim() || 'Jugador';

    registrarIncidencia(`Cambio en ${visitante}: Sale ${sale} -> entra ${entra}`);
    modalCambio.style.display = 'none';
});

btnCancelarCambio?.addEventListener('click', function() {
    modalCambio.style.display = 'none';
});


const btnFinalizar = document.getElementById('btnFinalizarPartido');
if (btnFinalizar) {
    btnFinalizar.addEventListener('click', function() {
        if (!hayPartidoActivo()) {
            alert('No hay un partido activo en este momento.');
            return;
        }

        if (!confirm('¿Estás seguro de finalizar el partido?')) return;
        const partido = obtenerPartidoActivo();

        if (typeof intervaloCronometro !== 'undefined') {
            clearInterval(intervaloCronometro);
        }

        const displayTiempo = document.getElementById('cronometroPartido');
        if (displayTiempo) {
            displayTiempo.textContent = '00:00';
        }

        partido.golesLocal = document.getElementById('golesLocal').textContent;
        partido.golesVisita = document.getElementById('golesVisita').textContent;
        partido.estado = 'Finalizado';

        const items = document.querySelectorAll('#ListaEventos li');
        partido.incidencias = [];
        items.forEach(function(item) {
            if (!item.classList.contains('Evento-vacio')) {
                partido.incidencias.push(item.textContent);
            }
        });

        // Limpiar marcador para el siguiente partido
        document.getElementById('golesLocal').textContent = '0';
        document.getElementById('golesVisita').textContent = '0';
        document.getElementById('marcadorLocalNombre').textContent = 'Local';
        document.getElementById('marcadorVisitaNombre').textContent = 'Visita';

        const mini = document.getElementById('infoPartidoMini') || document.getElementById('infoPartidaMini');
        if (mini) mini.textContent = 'Local • Estadio • Visita';

        const listaEventos = document.getElementById('ListaEventos');
        if (listaEventos) {
            listaEventos.innerHTML = '<li class="Evento-vacio">No hay incidencias registradas.</li>';
        }

        alert('El partido ha finalizado.');

        partidoEnVivo = null;
        renderizarVistaPartidos();
        renderizarActas();
        mostrarVista('VistaActas');
    });
}