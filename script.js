
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
        if (local == visitante) {
            alert('Error! No se puede crear el partido con el mismo equipo.');
            return; 
        }
        alert('Partido creado exitosamente!');
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
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card-form';
        let listaJugadores = '<ul>';
        equipo.jugadores.forEach(function(jugador) {
            listaJugadores += '<li> ' + jugador + '</li>';
        });
        listaJugadores += '</ul>';

        tarjeta.innerHTML = '<h3> ' + equipo.nombre + '</h3>' + listaJugadores;
        contenedor.appendChild(tarjeta);
    });
}





