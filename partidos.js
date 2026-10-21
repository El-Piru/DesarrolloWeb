
let historialPartidos = [];
let partidoEnVivo = null;


function obtenerPartidoActivo() {
    return historialPartidos.find(p => p.id === partidoEnVivo && p.estado === 'En Vivo') || null;
}

function hayPartidoActivo() {
    return obtenerPartidoActivo() !== null;
}

document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('inputFecha');
    if (fechaInput) {
        const hoy = new Date();
        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0');
        const day = String(hoy.getDate()).padStart(2, '0');
        const hours = String(hoy.getHours()).padStart(2, '0');
        const minutes = String(hoy.getMinutes()).padStart(2, '0');

        fechaInput.min = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
});


document.getElementById('btnHubCrearPartido')?.addEventListener('click', function() {
    mostrarVista('VistaNuevoPartido');
});


document.getElementById('btnHubPartidos')?.addEventListener('click', function() {
    renderizarVistaPartidos();
    mostrarVista('VistaPartidos');
});


document.getElementById('btnAdminPartidos')?.addEventListener('click', function() {
    renderizarVistaPartidos();
    mostrarVista('VistaPartidos');
});

document.getElementById('btnAdminReset')?.addEventListener('click', function() {
    const confirmar = confirm('¿Estás seguro de que deseas reiniciar todo el torneo? Se borrarán todos los partidos registrados.');
    if (confirmar) {
        historialPartidos = [];
        partidoEnVivo = null;
        renderizarVistaPartidos();
        alert('Torneo reiniciado. Todos los partidos fueron eliminados.');
    }
});


const formNuevoPartido = document.getElementById('formNuevoPartido');
if (formNuevoPartido) {
    formNuevoPartido.addEventListener('submit', function(e) {
        e.preventDefault();

        const local = document.getElementById('selectLocal').value;
        const visitante = document.getElementById('selectVisitante').value;

        if (local === visitante) {
            alert('¡No se puede crear el partido con el mismo equipo!');
            return;
        }

        const estadio = document.getElementById('inputLugar').value || 'Estadio';
        const fecha = document.getElementById('inputFecha').value || new Date().toLocaleDateString();

        const hoy = new Date();
        hoy.setSeconds(0, 0);

        const fechaPartido = fecha ? new Date(fecha) : hoy;
        const esProgramado = fechaPartido > hoy;
        const estadoInicial = esProgramado ? 'Programado' : 'En Vivo';

        if (hayPartidoActivo() && !esProgramado) {
            alert('Ya hay un partido en vivo. Finalízalo antes de iniciar otro.');
            return;
        }

        const fechaFormateada = fechaPartido.toLocaleString([], {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const partidoActivo = {
            id: Date.now(),
            local: local,
            visitante: visitante,
            estadio: estadio,
            fecha: fechaFormateada,
            estado: estadoInicial,
            golesLocal: 0,
            golesVisita: 0,
            incidencias: []
        };
        historialPartidos.push(partidoActivo);

        if (esProgramado) {
            alert(`Partido programado para el ${fechaFormateada}.`);
            formNuevoPartido.reset();
            renderizarVistaPartidos();
            mostrarVista('VistaPartidos');
            return;
        }

    
        const miniLinea = document.getElementById('infoPartidoMini') || document.getElementById('inforPartidaMini');
        if (miniLinea) {
            miniLinea.innerText = `${local} • ${estadio} • ${visitante}`;
        }

        document.getElementById('marcadorLocalNombre').innerText = local;
        document.getElementById('marcadorVisitaNombre').innerText = visitante;
        document.getElementById('golesLocal').innerText = '0';
        document.getElementById('golesVisita').innerText = '0';

        iniciarCronometro();
        partidoEnVivo = partidoActivo.id;
        alert('Partido en vivo iniciado entre ' + local + ' y ' + visitante + '!');
        formNuevoPartido.reset();
        renderizarVistaPartidos();
        mostrarVista('VistaEnVivo');
    });
}


function renderizarVistaPartidos() {
    const lista = document.getElementById('listaPartidos');
    if (!lista) return;

    lista.innerHTML = '';

    historialPartidos.forEach(p => {
        const item = document.createElement('li');
        item.className = 'tarjeta-partido';

        const divInfo = document.createElement('div');
        divInfo.className = 'InfoPartido';

        const spanEstadio = document.createElement('span');
        spanEstadio.className = 'estadio';
        spanEstadio.textContent = p.estadio;

        const spanFecha = document.createElement('span');
        spanFecha.className = 'fecha';
        spanFecha.textContent = p.fecha;

        divInfo.appendChild(spanEstadio);
        divInfo.appendChild(spanFecha);

        const divLocal = document.createElement('div');
        divLocal.className = 'Local';
        divLocal.textContent = p.local;

        const divEstado = document.createElement('div');
        divEstado.className = 'estado';

        const strongVs = document.createElement('strong');
        strongVs.textContent = 'VS';

        const smallEstado = document.createElement('small');
        smallEstado.textContent = p.estado;

        divEstado.appendChild(strongVs);
        divEstado.appendChild(smallEstado);

        const divVisita = document.createElement('div');
        divVisita.className = 'Visitante';
        divVisita.textContent = p.visitante;

        const divGolesLocal = document.createElement('div');
        divGolesLocal.className = 'golesLocal';
        divGolesLocal.textContent = p.golesLocal;

        const divGolesVisita = document.createElement('div');
        divGolesVisita.className = 'golesVisita';
        divGolesVisita.textContent = p.golesVisita;

        item.appendChild(divInfo);
        item.appendChild(divLocal);
        item.appendChild(divEstado);
        item.appendChild(divVisita);
        item.appendChild(divGolesLocal);
        item.appendChild(divGolesVisita);

        const badge = document.getElementById('userBadge')?.innerText || '';
        if (badge.includes('Admin') && p.estado !== 'Finalizado' && p.estado !== 'Suspendido') {
            const btnSuspender = document.createElement('button');
            btnSuspender.className = 'btn-suspender';
            btnSuspender.textContent = 'Suspender Partido';
            btnSuspender.onclick = function() {
                if (confirm(`¿Suspender el partido entre ${p.local} y ${p.visitante}?`)) {
                    p.estado = 'Suspendido';
                    renderizarVistaPartidos();
                }
            };
            item.appendChild(btnSuspender);
        }

        if (p.estado === 'Programado') {
            const btnIniciar = document.createElement('button');
            btnIniciar.className = 'btn-iniciar-partido';
            btnIniciar.textContent = 'Iniciar Partido';
            btnIniciar.onclick = function() {
                if (hayPartidoActivo()) {
                    alert('Ya hay un partido en vivo. Terminar partido antes de iniciar otro');
                    return;
                }

                document.getElementById('marcadorLocalNombre').innerText = p.local;
                document.getElementById('marcadorVisitaNombre').innerText = p.visitante;
                document.getElementById('golesLocal').innerText = '0';
                document.getElementById('golesVisita').innerText = '0';

                const miniLinea = document.getElementById('infoPartidaMini') || document.getElementById('infoPartidoMini');
                if (miniLinea) {
                    miniLinea.innerText = `${p.local} • ${p.estadio} • ${p.visitante}`;
                }

                p.estado = 'En Vivo';
                partidoEnVivo = p.id;
                iniciarCronometro();
                alert(`Comenzó ${p.local} vs ${p.visitante}`);
                renderizarVistaPartidos();
                mostrarVista('VistaEnVivo');
            };
            item.appendChild(btnIniciar);
        }

        lista.appendChild(item);
    });
}