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
      "Buenas profe, le aviso que voy unos minutos demorado porque se cortó el tránsito en el acceso principal por un operativo vial. Apenas llegue me pongo al día."
    ],
    entrega: [
      "Hola profe, le escribo porque al momento de hacer el push final al repositorio me tiró un pantallazo azul por un error crítico de sistema y se bloqueó el entorno local. Ya estoy terminando de reconstruir el build para subirlo hoy mismo.",
      "Buenas profe, tuve un fallo crítico en el sistema operativo justo antes de exportar la entrega y estoy recuperando el respaldo desde la nube. En breve le comparto el enlace funcional."
    ],
    visto: [
      "Hola profe, disculpe la demora en responder. Estuve sin acceso al correo institucional por una actualización de seguridad en mi dispositivo y recién acabo de sincronizar los mensajes.",
      "Buenas profe, perdón por responder recién ahora; tuve un inconveniente médico familiar que me obligó a estar desconectado toda la tarde, pero ya retomé todo."
    ],
    dormido: [
      "Hola profe, le pido mil disculpas. Tuve un cuadro febril durante la madrugada y recién me despierto tras haber tomado medicación; ya me estoy conectando/yendo para no perderme el resto de la clase.",
      "Buenas profe, disculpe el retraso: hubo un corte general de suministro eléctrico en mi zona durante la madrugada que desconfiguró las alarmas y los equipos. Ya estoy en camino."
    ],
    corte: [
      "Hola profe, le aviso por datos móviles que se registró una caída masiva de fibra óptica en todo el barrio y estamos sin suministro estable. Apenas vuelva la conexión subo todo al campus.",
      "Buenas profe, disculpe las molestias: estamos con baja tensión y cortes intermitentes de red en la zona, por lo que me resulta imposible mantener la sesión estable."
    ]
  },
  grupo: {
    tarde: [
      "Chicos perdón!! Se quedó clavado el colectivo por un choque en el acceso y no avanza hace 20 minutos. Arranquen sin mí que apenas baje me sumo directo.",
      "Gente mil disculpas, me tiró pantallazo azul la compu justo antes de salir/conectarme y quedó reiniciando eternamente. Ya estoy yendo."
    ],
    entrega: [
      "Chicos no me maten, me tiró pantallazo azul Windows justo haciendo el último commit y estoy levantando todo de nuevo para no subir código roto. En 20 minutos lo dejo impecable.",
      "Gente tuve un fallo local con las dependencias justo cuando estaba exportando mi parte, estoy usando los datos del celu para terminar de subir los cambios."
    ],
    visto: [
      "Perdón colgué mal!! Me quedé sin batería en la calle y recién llego a casa a enchufar el teléfono. Ahí leo todo lo que mandaron y me pongo con lo mío.",
      "Chicos mil perdón por desaparecer, tuve un día caótico con trámites y recién agarro el celular. Ya me pongo al día con el tablero."
    ],
    dormido: [
      "Chicos me quiero morir, me quedé dormido con el celu en modo no molestar después de estudiar hasta tarde. Ya mismo me pongo a full con lo que falta.",
      "Gente perdón!! Se me apagó el teléfono a la noche y no sonó la alarma. Ya estoy despierto y activo, díganme qué necesitan que cubra ya."
    ],
    corte: [
      "Chicos estoy sin luz ni wifi en toda la manzana desde hace una hora, les escribo con el 5 % de batería que me queda en el celu. Apenas vuelva me conecto.",
      "Gente se cayó internet en toda la zona oeste y me anda pésimo el 4G. Les mando captura de la pantalla y apenas vuelva la red pusheo."
    ]
  },
  jefe: {
    tarde: [
      "Hola, buen día. Te aviso que voy a demorarme unos minutos en ingresar por una contingencia en el transporte público en mi zona. Ya estoy en tránsito y recupero el tiempo al cierre.",
      "Buen día, estoy experimentando una intermitencia en el arranque del equipo tras una actualización crítica del sistema; ya estoy iniciando sesión."
    ],
    entrega: [
      "Hola, te actualizo sobre el entregable: sufrí un crash crítico del sistema operativo en el entorno local que requirió recuperación del workspace. Estimo tenerlo subido en el próximo bloque.",
      "Buenas, estoy finalizando la revisión de integridad de los archivos tras un error de sincronización en el servidor remoto. Te envío el link validado apenas complete el check."
    ],
    visto: [
      "Hola, disculpá la demora en el retorno. Estuve en una ventana de mantenimiento sin acceso a notificaciones y recién acabo de visualizar tu mensaje.",
      "Buenas, perdón por la respuesta tardía; estaba cerrando una incidencia prioritaria sin conexión externa. Ya mismo lo reviso."
    ],
    dormido: [
      "Hola, buen día. Te pido disculpas por la demora en conectarme; tuve una indisposición física temprana que me retrasó el inicio de jornada, pero ya estoy operativo al 100 %.",
      "Buen día, disculpá el retraso en el ingreso: tuve un inconveniente doméstico urgente a primera hora. Ya me encuentro conectado y recupero este bloque."
    ],
    corte: [
      "Hola, te aviso desde red móvil que tenemos una interrupción masiva del proveedor de fibra óptica en el sector sin horario confirmado de restablecimiento. Sigo operando con tethering.",
      "Buen día, estamos atravesando un corte de suministro eléctrico en la zona; mantengo seguimiento desde el teléfono mientras se normaliza el servicio."
    ]
  }
};

const pesosDestinatario = { profe: 1.15, grupo: 4.35, jefe: 0.45 };
const pesosSituacion = { tarde: 3.12, entrega: 1.48, visto: 2.74, dormido: 0.63, corte: 4.89 };
let indiceMensaje = 0;

document.getElementById('btnGenerar').addEventListener('click', () => {
  const dest = document.getElementById('destinatario').value;
  const sit = document.getElementById('situacion').value;
  const grav = parseInt(gravedadInput.value, 10);
  const desp = parseInt(desesperacionInput.value, 10);

  const opciones = bancoExcusas[dest][sit];
  const elegida = opciones[indiceMensaje % opciones.length];
  indiceMensaje++;

  const calculo =
    91.24 -
    grav * 2.13 +
    desp * 0.47 +
    pesosDestinatario[dest] +
    pesosSituacion[sit];

  const prob = Math.min(98.76, Math.max(38.14, calculo)).toFixed(2);
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
const bsodHora = document.getElementById('bsodHora');
let intervaloBsod;
let intervaloReloj;

function actualizarRelojBsod() {
  const ahora = new Date();
  bsodHora.textContent =
    ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) +
    ' - ' +
    ahora.toLocaleDateString('es-AR');
}

document.getElementById('btnBsod').addEventListener('click', () => {
  actualizarRelojBsod();
  let pct = 12;
  bsodPorcentaje.textContent = pct;
  bsodOverlay.classList.remove('hidden');
  document.documentElement.classList.add('bsod-active');
  document.body.classList.add('bsod-active');

  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }

  clearInterval(intervaloReloj);
  intervaloReloj = setInterval(actualizarRelojBsod, 1000);

  clearInterval(intervaloBsod);
  intervaloBsod = setInterval(() => {
    if (pct < 99) {
      pct += 2;
      bsodPorcentaje.textContent = Math.min(99, pct);
    }
  }, 1100);
});

function cerrarBsod() {
  bsodOverlay.classList.add('hidden');
  document.documentElement.classList.remove('bsod-active');
  document.body.classList.remove('bsod-active');
  clearInterval(intervaloBsod);
  clearInterval(intervaloReloj);
  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
}

bsodOverlay.addEventListener('click', cerrarBsod);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarBsod();
});
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) cerrarBsod();
});