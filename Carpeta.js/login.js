let users = [];
async function cargarUsuarios() {
    try {
        const response = await fetch('users.json');
        if (!response.ok) {
            throw new Error('Error al cargar los usuarios.json');
        }
        users = await response.json();
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        const errorLogin = document.getElementById('errorLogin');
        errorLogin.hidden = false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    cargarUsuarios();
});

const inicioSesion = document.getElementById('formLogin');
if (inicioSesion) {
    inicioSesion.addEventListener('submit', function(e) {
        e.preventDefault();

        if (users.length === 0) {
            document.getElementById('errorLogin').hidden = false;
            return;
        }
        const usuario = document.getElementById('inputUsuario').value.trim();
        const contrasena = document.getElementById('inputPassword').value.trim();

        const usuarioEncontrado = users.find(u => u.user === usuario && u.pass === contrasena);
        if (usuarioEncontrado) {
            userBadge.innerText = `${usuarioEncontrado.rol}: ${usuarioEncontrado.user}`;
            alert('Inicio de sesión exitoso. Bienvenido, ' + usuarioEncontrado.user + '!');

            if (usuarioEncontrado.rol === 'Admin') {
                mostrarVista('VistaMenuAdmin');
            }
            else if (usuarioEncontrado.rol === 'Árbitro'){
                mostrarVista('VistaMenuArbitro');
            }
        }
        else {
            alert('Usuario o Contraseña incorrectos. Inténtelo denuevo.');
        }
    });
}

const btnCambiarRol = document.getElementById('cambiarRol');
if (btnCambiarRol) {
    btnCambiarRol.addEventListener('click', function() {
        mostrarVista('VistaInicioSesión');
    });
}