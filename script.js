
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


const botonesVolver = document.querySelectorAll('.btn-volver');
botonesVolver.forEach(function(boton) {
    boton.addEventListener('click', function() {
        mostrarVista('VistaInicio');
    });
});