
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

document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('inputFecha');
    if (fechaInput) {
        const hoy = new Date();

        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0');
        const day = String(hoy.getDate()).padStart(2, '0');
        const hours = String(hoy.getHours()).padStart(2, '0');
        const minutes = String(hoy.getMinutes()).padStart(2, '0');

        fechaInput.min= `${year}-${month}-${day}T${hours}:${minutes}`;
    }
});

document.getElementById('btnHubEnVivo').addEventListener('click', function() {
    mostrarVista('VistaEnVivo');
});

document.getElementById('btnHubPartidos').addEventListener('click', function() {
    mostrarVista('VistaPartidos');
});

document.getElementById('btnHubConfig')?.addEventListener('click', function() {
    mostrarVista('VistaConfig');
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

let partidoEnVivo = null;

const formNuevoPartido = document.getElementById('formNuevoPartido');
if (formNuevoPartido) {
    formNuevoPartido.addEventListener('submit', function(e) {
        e.preventDefault();

        const local = document.getElementById('selectLocal').value;
        const visitante = document.getElementById('selectVisitante').value;

        if (local == visitante) {
            alert('!No se puede crear el partido con el mismo equipo.');
            return; 
        }

        const estadio = document.getElementById('inputLugar').value || 'Estadio';
        const fecha = document.getElementById('inputFecha').value || new Date().toLocaleDateString();

        const hoy = new Date();
        hoy.setSeconds(0, 0);

        const fechaPartido = fecha ? new Date(fecha) : hoy;

        
        const esProgramado = fechaPartido > hoy;
        const estadoInicial = esProgramado ? 'Programado' : 'En Vivo';

        if(hayPartidoActivo() && !esProgramado) {
            alert('Ya hay un partido en vivo. Finalízalo antes de iniciar otro.');
            return;
        }

        const fechaFormateada = fechaPartido.toLocaleString([], {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '');

        partidoActivo = {
            id: Date.now(),
            local: local,
            visitante: visitante,
            estadio: estadio,
            fecha: fechaFormateada,
            estado: estadoInicial,
            golesLocal: 0,
            golesVisita: 0,
            incidencias: []
        }
        historialPartidos.push(partidoActivo);

        if (esProgramado) {
            alert(`Partido programado para el ${fechaFormateada}.`);
            partidoActual = null;
            formNuevoPartido.reset();
            renderizarVistaPartidos();
            mostrarVista('VistaPartidos');
            return;
        }

        const miniLinea= document.getElementById('infoPartidoMini') || document.getElementById('inforPartidaMini');
        if(miniLinea){
            miniLinea.innerText = `${local} • ${estadio} • ${visitante}`;
        }


        document.getElementById('marcadorLocalNombre').innerText = local;
        document.getElementById('marcadorVisitaNombre').innerText = visitante;

        document.getElementById('golesLocal').innerText= '0';
        document.getElementById('golesVisita').innerText = '0';

        iniciarCronometro();
        partidoEnVivo = partidoActivo.id;
        alert('Partido en vivo iniciado entre ' + local + ' y ' + visitante + '!');
        formNuevoPartido.reset();
        renderizarVistaPartidos();
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
        if (!hayPartidoActivo()) {
            alert('No hay un partido activo en este momento.');
            return;
        }

        const local = document.getElementById('marcadorLocalNombre').innerText;
        const golesActuales = parseInt(document.getElementById('golesLocal').innerText) || 0;
        document.getElementById('golesLocal').innerText = golesActuales + 1;
        registrarIncidencia(`¡GOL de ${local}!`);
        modalGol.style.display = 'none';
    });
}

if (btnGolVisita) {
    btnGolVisita.addEventListener('click', function() {
        if (!hayPartidoActivo()) {
            alert('No hay un partido activo en este momento.');
            return;
        }

        const visitante = document.getElementById('marcadorVisitaNombre').innerText;
        const golesActuales = parseInt(document.getElementById('golesVisita').innerText) || 0;
        document.getElementById('golesVisita').innerText = golesActuales + 1;
        registrarIncidencia(`¡GOL de ${visitante}!`);
        modalGol.style.display = 'none';
    });
}

if (btnCancelarGol) {
    btnCancelarGol.addEventListener('click', function() {
        if (!hayPartidoActivo()) {
            alert('No hay un partido activo en este momento.');
            return;
        }
        modalGol.style.display = 'none';
    });
}

let tipoTarjetaActual='Amarilla';

const modalTarjeta = document.getElementById('modalTarjeta');
const btnTarjetaLocal= document.getElementById('btnTarjetaLocal');
const btnTarjetaVisita= document.getElementById('btnTarjetaVisita');
const btnCancelarTarjeta = document.getElementById('btnCancelarTarjeta');
const inputJugador= document.getElementById('inputJugadorTarjeta');

function abrirModalTarjeta(tipo, titulo){
    tipoTarjetaActual = tipo;
    document.getElementById('tituloModalTarjeta').innerText = titulo;

    const local = document.getElementById('marcadorLocalNombre').innerText;
    const visitante = document.getElementById('marcadorVisitaNombre').innerText;

    btnTarjetaLocal.innerText = local;
    btnTarjetaVisita.innerText = visitante;
    inputJugador.value = '';

    modalTarjeta.style.display = 'flex';
}

const btnAmarilla = document.getElementById('btnAmarilla');
if(btnAmarilla){
    btnAmarilla.addEventListener('click', function(){
        if (!hayPartidoActivo()) {
            alert('No hay un partido activo en este momento.');
            return;
        }

        abrirModalTarjeta('Amarilla', 'Tarjeta Amarilla');
    });
}

const btnRoja= document.getElementById('btnRoja');
if(btnRoja){
    btnRoja.addEventListener('click',function(){
        if (!hayPartidoActivo()) {
            alert('No hay un partido activo en este momento.');
            return;
        }

        abrirModalTarjeta('Roja','Tarjeta Roja');
    });
}

if(btnTarjetaLocal){
    btnTarjetaLocal.addEventListener('click', function(){
        const local= document.getElementById('marcadorLocalNombre').innerText;
        const jugador = inputJugador.value.trim();
        const detalle =  jugador ? ` - ${jugador}` : '';
        const icono = tipoTarjetaActual === 'Amarilla'  ? '🟨' : '🟥';


        registrarIncidencia(`${icono} Tarjeta ${tipoTarjetaActual}: ${local}${detalle}`);
        modalTarjeta.style.display='none';
    });
}

if (btnTarjetaVisita) {
    btnTarjetaVisita.addEventListener('click', function() {
        const visitante = document.getElementById('marcadorVisitaNombre').innerText;
        const jugador = inputJugador.value.trim();
        const detalle = jugador ? ` - ${jugador}` : '';
        const icono = tipoTarjetaActual === 'Amarilla' ? '🟨' : '🟥';
        registrarIncidencia(`${icono} Tarjeta ${tipoTarjetaActual}: ${visitante}${detalle}`);
        modalTarjeta.style.display = 'none';
    });
}


if(btnCancelarTarjeta){
    btnCancelarTarjeta.addEventListener('click',function(){
        modalTarjeta.style.display = 'none';
    });
}

function hayPartidoActivo() {
    return obtenerPartidoActivo() !== null;
}

let historialPartidos = [];

const partidoFinalizado = document.getElementById('btnFinalizarPartido');
if(partidoFinalizado){
    partidoFinalizado.addEventListener('click', function(){
        if (!hayPartidoActivo()) {
            alert('No hay un partido activo en este momento.');
            return;
        }
        
        if(!confirm('¿Estás seguro de finalizar el partido?')) return;

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
        items.forEach(function(item){
            if (!item.classList.contains('Evento-vacio')){
                partido.incidencias.push(item.textContent);
            }
        });

        document.getElementById('golesLocal').textContent = '0';
        document.getElementById('golesVisita').textContent = '0';

        document.getElementById('marcadorLocalNombre').textContent = 'Local';
        document.getElementById('marcadorVisitaNombre').textContent = 'Visita';

        document.getElementById('infoPartidoMini').textContent = 'Local • Estadio • Visita';

        const listaEventos = document.getElementById('ListaEventos');
        if (listaEventos) {
            listaEventos.innerHTML = '<li class="Evento-vacio">No hay incidencias registradas.</li>';
        }

        alert('El partido ha finalizado.');

        renderizarVistaPartidos();
        mostrarVista('VistaInicio');
})}

function obtenerPartidoActivo() {
    return historialPartidos.find(p => p.id === partidoEnVivo && p.estado === 'En Vivo') || null;
}

const btnGuardarConfig = document.getElementById('btnGuardarConfig');
if (btnGuardarConfig) {
    btnGuardarConfig.addEventListener('click', function() {
        const nombre = document.getElementById('nombreArbitro').value.trim();
        if (!nombre) {
            alert('Por favor, ingresa un nombre válido.');
            return;
        }
        document.getElementById('userBadge').innerText = `Árbitro: ${nombre}`;
        const saludo = document.getElementById('saludoUsuario');
        if (saludo) {
            saludo.innerText = `¡Hola, ${nombre}!`;
        }
        localStorage.setItem('nombreArbitroGuardado', nombre);
        alert('¡Configuración y perfil guardados correctamente!');
        mostrarVista('VistaInicio');
    });
}

 

const btnCambio= document.getElementById('btnCambio');
const modalCambio = document.getElementById('modalCambio');
const inputJugadorSale=document.getElementById('inputJugadorSale');
const inputJugadorEntra = document.getElementById('inputJugadorEntra');
const btnCambioLocal = document.getElementById('btnCambioLocal');
const btnCambioVisita = document.getElementById('btnCambioVisita');
const btnCancelarCambio = document.getElementById('btnCancelarCambio');

if (btnCambio){
    btnCambio.addEventListener('click' , function() {
        const local = document.getElementById('marcadorLocalNombre').innerText;
        const visitante = document.getElementById('marcadorVisitaNombre').innerText;

        btnCambioLocal.innerText = local;
        btnCambioVisita.innerText = visitante;

        inputJugadorSale.value = '';
        inputJugadorEntra.value = '';

        modalCambio.style.display = 'flex';
    });
}

if(btnCambioLocal){
    btnCambioLocal.addEventListener('click' , function(){
        const Local = document.getElementById('marcadorLocalNombre').innerText;
        const sale = inputJugadorSale.value.trim() || 'Jugador';
        const entra = inputJugadorEntra.value.trim() || 'Jugador';

        registrarIncidencia(`Cambio en ${Local}: Sale ${sale} -> entra ${entra}`);
        modalCambio.style.display = 'none';
    });
}

if(btnCambioVisita){
    btnCambioVisita.addEventListener('click' , function(){
        const visitante = document.getElementById('marcadorVisitaNombre').innerText;
        const sale = inputJugadorSale.value.trim() || 'Jugador';
        const entra = inputJugadorEntra.value.trim() || 'Jugador';

        registrarIncidencia(`Cambio en ${visitante}: Sale ${sale} -> entra ${entra}`);
        modalCambio.style.display = 'none';
    });
}

if(btnCancelarCambio){
    btnCancelarCambio.addEventListener('click',function(){
        modalCambio.style.display = 'none';
    })
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

        lista.appendChild(item);
})}
