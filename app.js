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
        if (idVista === 'VistaInicioSesión') {
            panelUsuario.style.display = 'none';
        } else {
            panelUsuario.style.display = 'flex';
        }
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


document.getElementById('btnAdminArbitros')?.addEventListener('click', function() {
    const lista = users.map(u => `• ${u.user} (${u.rol})`).join('\n');
    alert('CUERPO ARBITRAL REGISTRADO:\n\n' + lista);
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