const gravedadInput = document.getElementById('gravedad');
const desesperacionInput = document.getElementById('desesperacion');
const gravedadVal = document.getElementById('gravedadVal');
const desesperacionVal = document.getElementById('desesperacionVal');

gravedadInput.addEventListener('input', () => {
  gravedadVal.textContent = `${gravedadInput.value} / 10`;
});

desesperacionInput.addEventListener('input', () => {
  desesperacionVal.textContent = `${desesperacionInput.value} / 10`;
});

const bancoExcusas = {
  profe: {
    tarde: [
      "Hola profe, disculpe la demora. Hubo una falla de señalización en el ramal y quedamos detenidos entre estaciones sin posibilidad de bajar. Ya estoy en camino y entro en silencio para no interrumpir.",
      "Buenas profe, le aviso que voy unos minutos demorado porque se cortó la fibra óptica de la zona y tuve que salir corriendo a conectarme desde otro punto. Apenas llegue me pongo al día."
    ],
    entrega: [
      "Hola profe, le escribo porque al momento de hacer el push final al repositorio me tiró un pantallazo azul por un error crítico de sistema y se bloqueó el entorno local. Ya estoy terminando de reconstruir el build para subirlo hoy mismo.",
      "Buenas profe, tuve un fallo crítico en el sistema operativo justo antes de exportar la entrega y estoy recuperando el respaldo desde la nube. En breve le comparto el enlace funcional."
    ],
    visto: [
      "Hola profe, disculpe la demora en responder. Estuve sin acceso al correo institucional por una actualización de seguridad en mi dispositivo y recién acabo de sincronizar los mensajes.",
      "Buenas profe, perdón por responder recién ahora; tuve un inconveniente médico familiar que me obligó a estar desconectado toda la tarde, pero ya retomé todo."
    ]
  },
  grupo: {
    tarde: [
      "Chicos perdón!! Se quedó clavado el colectivo por un choque en el acceso y no avanza hace 20 minutos. Arranquen sin mí que apenas baje me sumo directo.",
      "Gente mil disculpas, me tiró pantallazo azul la compu justo antes de salir/conectarme y quedó reiniciando eternamente. Ya estoy yendo."
    ],
    entrega: [
      "Chicos no me maten, me tiró pantallazo azul Windows justo haciendo el último commit y estoy levantando todo de nuevo para no subir código roto. En 20 minutos lo dejo impecable.",
      "Gente tuve un corte de luz en toda la cuadra justo cuando estaba exportando mi parte, estoy usando los datos del celu para terminar de subir los cambios."
    ],
    visto: [
      "Perdón colgué mal!! Me quedé sin batería en la calle y recién llego a casa a enchufar el teléfono. Ahí leo todo lo que mandaron y me pongo con lo mío.",
      "Chicos mil perdón por desaparecer, tuve un día caótico con trámites y recién agarro el celular. Ya me pongo al día con el tablero."
    ]
  },
  jefe: {
    tarde: [
      "Hola, buen día. Te aviso que voy a demorarme unos minutos en ingresar por una contingencia en el transporte público en mi zona. Ya estoy en tránsito y recupero el tiempo al cierre.",
      "Buen día, estoy experimentando una intermitencia masiva del proveedor de internet en mi domicilio; ya estoy migrando a red móvil de respaldo para conectarme."
    ],
    entrega: [
      "Hola, te actualizo sobre el entregable: sufrí un crash crítico del sistema operativo en el entorno local que requirió recuperación del workspace. Estimo tenerlo subido en el próximo bloque.",
      "Buenas, estoy finalizando la revisión de integridad de los archivos tras un error de sincronización en el servidor remoto. Te envío el link validado apenas complete el check."
    ],
    visto: [
      "Hola, disculpá la demora en el retorno. Estuve en una ventana de mantenimiento sin acceso a notificaciones y recién acabo de visualizar tu mensaje.",
      "Buenas, perdón por la respuesta tardía; estaba cerrando una incidencia prioritaria sin conexión externa. Ya mismo lo reviso."
    ]
  }
};

document.getElementById('btnGenerar').addEventListener('click', () => {
  const dest = document.getElementById('destinatario').value;
  const sit = document.getElementById('situacion').value;
  const grav = parseInt(gravedadInput.value, 10);
  const desp = parseInt(desesperacionInput.value, 10);

  const opciones = bancoExcusas[dest][sit];
  const elegida = opciones[Math.floor(Math.random() * opciones.length)];

  const base = 94.5 - (grav * 1.85) + (desp * 0.42) + (Math.random() * 1.99);
  const prob = Math.min(98.76, Math.max(41.18, base)).toFixed(2);
  const riesgo = (100 - parseFloat(prob)).toFixed(2);

  document.getElementById('placeholder').classList.add('hidden');
  document.getElementById('resultado').classList.remove('hidden');

  document.getElementById('probCreer').textContent = `${prob.replace('.', ',')} %`;
  document.getElementById('riesgoRepregunta').textContent = `${riesgo.replace('.', ',')} %`;
  document.getElementById('textoExcusa').textContent = elegida;

  document.getElementById('consejoExtra').textContent =
    parseFloat(prob) > 75
      ? "Alta verosimilitud. Enviar sin emojis."
      : "Riesgo moderado. Usá el pantallazo azul de abajo.";
});

document.getElementById('btnCopiar').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('textoExcusa').textContent);
  const btn = document.getElementById('btnCopiar');
  btn.textContent = '✅ ¡Copiado!';
  setTimeout(() => { btn.textContent = '📋 Copiar texto'; }, 2000);
});

const bsodOverlay = document.getElementById('bsodOverlay');
const bsodPorcentaje = document.getElementById('bsodPorcentaje');
let intervaloBsod;

document.getElementById('btnBsod').addEventListener('click', () => {
  const ahora = new Date();
  document.getElementById('bsodHora').textContent =
    ahora.toLocaleTimeString('es-AR') + ' - ' + ahora.toLocaleDateString('es-AR');
  let pct = 12;
  bsodPorcentaje.textContent = pct;
  bsodOverlay.classList.remove('hidden');

  clearInterval(intervaloBsod);
  intervaloBsod = setInterval(() => {
    if (pct < 99) {
      pct += Math.floor(Math.random() * 4) + 1;
      bsodPorcentaje.textContent = Math.min(99, pct);
    }
  }, 900);
});

function cerrarBsod() {
  bsodOverlay.classList.add('hidden');
  clearInterval(intervaloBsod);
}

bsodOverlay.addEventListener('click', cerrarBsod);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarBsod(); });