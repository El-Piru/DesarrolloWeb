const inicioSesion = document.getElementById('formLogin');
if (inicioSesion) {
    inicioSesion.addEventListener('submit', async function(e) {
        e.preventDefault();

        const errorLogin = document.getElementById('errorLogin');
        errorLogin.hidden = true;

        const usuario = document.getElementById('inputUsuario').value.trim();
        const clave = document.getElementById('inputPassword').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, clave })
            });
            const resultado = await response.json();
            
            if(!response.ok) {
                alert(resultado.mensaje || 'No fue posible iniciar sesión.');
                return;
            }

            document.getElementById('userBadge').innerText = `${resultado.rol}: ${resultado.usuario}`;
            alert('Inicio de sesión exitoso. Bienvenido ' + resultado.usuario + '!');

            if(resultado.rol === 'Admin') {
                mostrarVista('VistaMenuAdmin');
            } else{
                mostrarVista('VistaMenuArbitro');
            }
        } catch (error) {
            console.error('No se pudo conectar con la API:', error);
            errorLogin.hidden = false;
        }
    });
}

const btnCambiarRol = document.getElementById('cambiarRol');
if (btnCambiarRol) {
    btnCambiarRol.addEventListener('click', function() {
        mostrarVista('VistaInicioSesión');
    });
}

document.getElementById('btnRegistro')?.addEventListener('click', function() {
    mostrarVista('VistaRegistro');
});