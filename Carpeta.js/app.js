const vistas = document.querySelectorAll('.vista-content');


function mostrarVista(idVista) {
    vistas.forEach(function(vista) {
        vista.classList.remove('active');
    });

    const vistaSeleccionada = document.getElementById(idVista);
    if (vistaSeleccionada) {
        vistaSeleccionada.classList.add('active');
    }

    const panelUsuario = document.querySelector('.usuario-panel');
    if (panelUsuario) {
        if (idVista === 'VistaInicioSesión' || idVista === 'VistaRegistro') {
            panelUsuario.style.display = 'none';
        } else {
            panelUsuario.style.display = 'flex';
        }
    }
    const login = document.getElementById('btnLogin');
    const registro = document.getElementById('btnRegistro');
    switch (idVista) {
        case 'VistaInicioSesión':
            login.style.display = 'none';
            registro.style.display = 'flex';
            break;
        case 'VistaRegistro':
            registro.style.display = 'none';
            login.style.display = 'flex';
            break;
        default:
            login.style.display = 'none';
            registro.style.display = 'none';
            break;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    mostrarVista('VistaInicioSesión');

    const nombreGuardado = localStorage.getItem('nombreArbitroGuardado');
    if (nombreGuardado) {
        const userBadge = document.getElementById('userBadge');
        if (userBadge) userBadge.innerText = `Árbitro: ${nombreGuardado}`;

        const saludo = document.getElementById('saludoUsuario');
        if (saludo) saludo.innerText = `¡Hola, ${nombreGuardado}!`;
    }
});


document.getElementById('btnHubConfig')?.addEventListener('click', function() {
    mostrarVista('VistaConfig');
});


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
        mostrarVista('VistaMenuArbitro');
    });
}


document.getElementById('btnAdminArbitros')?.addEventListener('click', async function() {
    try {
        const response = await fetch('/api/usuarios');
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de árbitros.');
        }

        const usuarios = await response.json();
        const arbitros = usuarios.filter(u => u.rol === 'Arbitro');
        const listaArbitros = arbitros.map(a => `• ${a.user}`).join('\n');

        if (listaArbitros.length === 0) {
            alert('No hay árbitros registrados.');
        } else {
            alert('CUERPO ARBITRAL REGISTRADO:\n\n' + listaArbitros);
        }

    } catch (error) {
        console.error('Error al obtener la lista de árbitros:', error);
        alert('No se pudo obtener la lista de árbitros. Inténtelo más tarde.');
    }
});


const botonesVolver = document.querySelectorAll('.btn-volver');
botonesVolver.forEach(function(boton) {
    boton.addEventListener('click', function() {
        const badge = document.getElementById('userBadge')?.innerText || '';
        if (badge.includes('Admin')) {
            mostrarVista('VistaMenuAdmin');
        } else {
            mostrarVista('VistaMenuArbitro');
        }
    });
});