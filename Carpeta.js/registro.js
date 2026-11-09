const formRegistro = document.getElementById('formRegistro');
if (formRegistro) {
    formRegistro.addEventListener('submit', async function(e) {
        e.preventDefault();

        const errorRegistro = document.getElementById('errorRegistro');
        errorRegistro.hidden = true;

        const usuario = document.getElementById('inputUsuarioRegistro').value.trim();
        const clave = document.getElementById('inputPasswordRegistro').value;

        try {
            const response = await fetch('/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, clave })
            });
            const resultado = await response.json();
            
            if(!response.ok) {
                alert(resultado.mensaje || 'No fue posible registrar el usuario.');
                return;
            }
            
            alert(resultado.mensaje);
            formRegistro.reset();
            mostrarVista('VistaInicioSesión');
        } catch (error) {
            console.error('No se pudo conectar con la API:', error);
            errorRegistro.hidden = false;
        }
    });
}

document.getElementById('btnLogin')?.addEventListener('click', function() {
    mostrarVista('VistaInicioSesión');
});