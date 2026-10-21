const users = [
    { user: 'admin', pass: '1234', rol: 'Admin' },
    { user: 'arbitro', pass: '1234', rol: 'Árbitro' }
];


const inicioSesion = document.getElementById('formLogin');
if (inicioSesion) {
    inicioSesion.addEventListener('submit', function(e) {
        e.preventDefault();

        const usuario = document.getElementById('inputUsuario').value.trim();
        const contrasena = document.getElementById('inputPassword').value.trim();

        const usuarioEncontrado = users.find(u => u.user === usuario && u.pass === contrasena);

        if (usuarioEncontrado) {
            const userBadge = document.getElementById('userBadge');
            if (userBadge) {
                userBadge.innerText = `${usuarioEncontrado.rol}: ${usuarioEncontrado.user}`;
            }

            alert('Inicio de sesión exitoso. Bienvenido, ' + usuarioEncontrado.user + '!');

            if (usuarioEncontrado.rol === 'Admin') {
                mostrarVista('VistaMenuAdmin');
            } else if (usuarioEncontrado.rol === 'Árbitro') {
                mostrarVista('VistaMenuArbitro');
            }
        } else {
            alert('Usuario o Contraseña incorrectos. Inténtelo de nuevo.');
        }
    });
}

const btnCambiarRol = document.getElementById('cambiarRol');
if (btnCambiarRol) {
    btnCambiarRol.addEventListener('click', function() {
        mostrarVista('VistaInicioSesión');
    });
}