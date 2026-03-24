// Funciones para optimizar el modo oración sin distracciones

    // Declaración de variables
    let pasoCoronilla = 0;
    let coronillaActual = null;
    let secuenciaActual = null;
    let diaActual = 0;
    //Pantalla siempre encendida
    let wakeLock = null;
    // Novenas ocultas
    let tapCount = 0;
    let tapTimer = null;

    //Iniciar aplicación
    const app = document.getElementById("app");
    mostrarInicio();
    setInterval(revisarRecordatorios, 60000); // cada minuto
    revisarRecordatorios(); // al cargar
    async function activarPantalla(){
    try{
        wakeLock = await navigator.wakeLock.request('screen');
    }
    catch(e){
        console.log("No se pudo activar wake lock");
    }
    }
    // Modo Oración (sin distracciones)
        async function entrarModoOracion(){
        activarPantalla();
        // Pantalla completa
        if(document.documentElement.requestFullscreen){
            document.documentElement.requestFullscreen()
        }
    }
    //Salir Modo Oracion
        function salirModoOracion(){
        if(document.fullscreenElement){
        document.exitFullscreen();
        }
    }
    // Función Salir
    function salir(){
        salirModoOracion();
        secuenciaActual = null;
        mostrarInicio();
    }
// Guardar día actual
    //function guardarDia(idNovena, dia) {
        //  localStorage.setItem(`dia${idNovena}`, dia);
    //}
    //function cargarDia(idNovena) {
        //  return parseInt(localStorage.getItem(`dia${idNovena}`)) || 0;
    //}

// Optimización de imagenes
    function setBackground(imagen) {
        document.body.style.backgroundImage = `url('${imagen}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
    }
// Novenas ocultas - detección de 5 toques en el título
function contarToque(){
    tapCount++;
    clearTimeout(tapTimer);
    if(tapCount >= 5){
        tapCount = 0;
        const yaDesbloqueado = localStorage.getItem("novenasOcultas") === "true";
        if(yaDesbloqueado){
            localStorage.removeItem("novenasOcultas");
            alert("Novenas especiales bloqueadas.");
        } else {
            localStorage.setItem("novenasOcultas", "true");
            alert("\u2728 Novenas especiales desbloqueadas.");
        }
        mostrarInicio();
        return;
    }
    tapTimer = setTimeout(() => { tapCount = 0; }, 2000);
}

// Pantalla inicial
function mostrarInicio(){
    let contenido = `
    <div class="container">
        <h1 onclick="contarToque()" style="cursor:pointer;">Novenas</h1>
        <button onclick="mostrarLista()">Lista de novenas</button>
            `;

    const enCurso = novenasEnCurso();

    if(enCurso.length === 1){
        // Solo una novena en curso → botón directo
        contenido += `<button onclick="rezarNovena('${enCurso[0].id}')">
                        Seguir rezando la novena: ${enCurso[0].nombre} (día ${enCurso[0].dia})
                      </button>`;
    } else if(enCurso.length > 1){
        // Varias novenas → mostrar lista de novenas en curso
        contenido += `<button onclick="mostrarNovenasEnCurso()">Mis novenas en curso</button>`;
    }

    contenido += `</div>`;

    app.innerHTML = contenido;

    // Imagen de fondo de la portada
    setBackground('Portada1.jpg');
}

// Lista de novenas
function mostrarLista(){
    const desbloqueado = localStorage.getItem("novenasOcultas") === "true";
    const visibles = novenas.filter(n => !n.oculta || desbloqueado);
    let lista = "<h1>Lista de novenas</h1>";
    if(desbloqueado) lista += `<p style="color:#ffd700; font-size:0.85em; margin-bottom:8px;">\u2728 Novenas especiales visibles</p>`;
    visibles.forEach(novena => {
        lista += `<button onclick="abrirNovena('${novena.id}')">${novena.nombre}</button>`;
    });
    lista += `<br><button onclick="mostrarInicio()">Volver</button>`;
    app.innerHTML = `<div class="container">${lista}</div>`;

    // Cambiar imagen de fondo a la portada
    setBackground('Portada1.jpg')
}

// --------------------
// REZAR CORONILLA
// --------------------
  
    // Inicio de coronilla en modo secuencia
        function iniciarCoronillaSecuencia(id){
        coronillaActual = id;
        pasoCoronilla = 0;
        
    mostrarPasoCoronilla();
}
    // Empezar coronilla
    function rezarCoronilla(id){
        console.log("ID recibido:", id);
        console.log("Datos:", contenidoNovenas[id]);
        entrarModoOracion();
        coronillaActual = id;
        pasoCoronilla = 0;
        const novenaData = contenidoNovenas[id];
        if(!novenaData || !novenaData.coronilla){
            console.error("No hay coronilla para:", id);
            alert("Esta novena no tiene coronilla disponible");
            return;
        }
        mostrarPasoCoronilla();
    }
    // Salir de la coronilla
        function salirCoronilla(){
            coronillaActual = null;
            secuenciaActual = null; // romper flujo
            salirModoOracion();
            mostrarInicio();
        }
    // Mostrar paso con contador por misterio
      function mostrarPasoCoronilla(){
        console.log("coronillaActual:", coronillaActual);
        console.log("contenido:", contenidoNovenas[coronillaActual]);    
         if(!coronillaActual || !contenidoNovenas[coronillaActual]){
            console.error("Coronilla no válida:", coronillaActual);
            alert("Error al cargar la coronilla");
            secuenciaActual = null;
            mostrarInicio();
            return;
        }   
        const pasos = contenidoNovenas[coronillaActual].coronilla;
        if(!pasos){
           alert("No hay pasos en esta coronilla");
            return;
        }   
        const texto = pasos[pasoCoronilla];
        let contador = "";
        let puntos = "";
            // LÓGICA DE DETECCIÓN DE REPETICIONES
                // 1. Contamos cuántas oraciones iguales hay hacia atrás
                    let numActual = 0;
                    let i = pasoCoronilla;
                    while(i >= 0 && pasos[i] === texto) {
                    numActual++;
                    i--;
                    }
                // 2. Contamos cuántas oraciones iguales hay hacia adelante para saber el total
                    let j = pasoCoronilla + 1;
                    while(j < pasos.length && pasos[j] === texto) {
                    j++;
                    }
                    let totalRepeticiones = numActual + (j - (pasoCoronilla + 1));
                // 3. Solo mostramos el contador si hay más de una repetición (evita contar títulos o preces sueltas)
                    if(totalRepeticiones > 1) {
                        contador = `Repetición ${numActual} de ${totalRepeticiones}`;
                        for(let k = 1; k <= totalRepeticiones; k++){
                        puntos += (k <= numActual) ? "● " : "○ ";
                        }
                    }
        // Renderizado en pantalla
            app.innerHTML = `
            <div class="container">
                <div class="contador">${contador}</div>
                <div class="rosario">${puntos}</div>
                <div class="texto-coronilla">${texto}</div> 
                <div class="botones">
                <button onclick="anterior()">Anterior</button>
                <button onclick="siguientePasoCoronilla()">Continuar</button>
                <button onclick="salirCoronilla()">Salir</button>
                </div>
            </div>
            `;
        }

    // Funciones navegación
        function siguientePasoCoronilla(){
            let pasos = contenidoNovenas[coronillaActual].coronilla;
                if(pasoCoronilla < pasos.length - 1){
                pasoCoronilla++;
                mostrarPasoCoronilla();
                } else {
        // 👇 CASO NOVENA → obligatorio
           if(secuenciaActual){
                secuenciaActual.paso = "letania";
                mostrarPaso();
            }    
        // 👇 CASO SUELTO → preguntar
            else {
                const data = contenidoNovenas[coronillaActual];
                if(data && data.letanias){
                    const quiere = confirm("¿Quieres rezar las letanías?");
                    if(quiere){
                        rezarLetanias(coronillaActual);
                    } else {
                        mostrarInicio();
                    }
                } else {
                    mostrarInicio();
                }
            }
            }
        }
        function anteriorPasoCoronilla(){
            if(pasoCoronilla > 0){
            pasoCoronilla--;
            mostrarPasoCoronilla();
            }
        }
// --------------------
// REZAR Novena
// --------------------

//Rezar novena
    function rezarNovena(id){
       entrarModoOracion();
        let inicio = localStorage.getItem("inicioNovena_" + id);
        if(!inicio){
            iniciarNovena(id);
            return;
        }
        mostrarInicioNovena(id);
    }
    // Primera pantalla de la novena
        function mostrarInicioNovena(id){
            const novena = getNovena(id);
        const dia = calcularDiaNovena(id);
        app.innerHTML = `
            <div class="container">
                <h2>Día ${dia}</h2>
                <h1>${novena.nombre}</h1>
                <button onclick="iniciarFlujoNovena('${id}')">Continuar</button>
                <button onclick="cambiarDiaManual('${id}')">Cambiar día</button>
                <button onclick="mostrarInicio()">Inicio</button>
            </div>
            `;
        }
    //Iniciar flujo de la novena (día → coronilla → letanías)
        function iniciarFlujoNovena(id){
        const dia = calcularDiaNovena(id);
        secuenciaActual = {
            id: id,
            dia: dia,
            paso: "dia",
            bloque: 0
        };
        mostrarPaso();
    }
        // Movimiento dentro de la novena
        function siguientePaso(){
        if(!secuenciaActual) return;
        if(secuenciaActual.paso === "dia"){
            secuenciaActual.paso = "coronilla";
        }
        else if(secuenciaActual.paso === "coronilla"){
            secuenciaActual.paso = "letania";
        }
        else {
            finalizarSecuencia();
            return;
        }
        mostrarPaso();
        }
            //Avance de bloques
            function siguienteBloque(){
                const { id, dia, bloque } = secuenciaActual;
                const data = contenidoNovenas[id];
                const totalBloques = data.novena[dia-1].contenido.length;
                if(bloque < totalBloques - 1){
                    secuenciaActual.bloque++;
                    mostrarPaso();
                } else {
                    siguientePaso(); // pasa a coronilla
                }
            }
            function anterior(){
                 // 1. Si estamos en coronilla
                    if(coronillaActual !== null){
                    anteriorPasoCoronilla();
                    return;
                    }
                // 2. Si estamos en novena (bloques)
                    if(secuenciaActual && secuenciaActual.paso === "dia"){
                    anteriorBloque();
                    return;
                    }
                }
            function anteriorBloque(){
                if(!secuenciaActual) return;
                if(secuenciaActual.paso !== "dia") return;
                if(secuenciaActual.bloque > 0){
                    secuenciaActual.bloque--;
                    mostrarPaso();
                }
            }
            function salirFlujoNovena(){
                const id = secuenciaActual.id;
                secuenciaActual = null;
                salirModoOracion();
                abrirNovena(id);
            }

        async function finalizarSecuencia(){
            // Si no hay secuencia (uso libre de coronilla)
                if(!secuenciaActual){
                    alert("Has terminado la coronilla.");
                    secuenciaActual = null;
                    mostrarInicio();
                    return;
                }
            const { id, dia } = secuenciaActual;
            registrarRezoCompletado(id);
            if (dia === 1) {
                const quiereRecordatorio = confirm("¡Has terminado el primer día! ¿Te gustaría programar un recordatorio?");
                if (quiereRecordatorio) {
                programarRecordatorio(id, true);
                return;
                }
            }      
            if(dia === getTotalDiasNovena(id)){
            await eliminarRecordatorio(id);
            mostrarFelicitacion(id, dia);
            return;
            }
        alert(`Has terminado el día ${dia}. ¡Ánimo!`);
            secuenciaActual = null;
            mostrarInicio();
        }
        
        function mostrarPaso(){
            const {id, paso} = secuenciaActual;
            const data = contenidoNovenas[id];
            if(paso === "dia"){
            mostrarDiaNovena(id); 
            }
            else if(paso === "coronilla"){
            if(data && data.coronilla) {
                iniciarCoronillaSecuencia(id); // 👈 cambio clave
            } else {
                secuenciaActual.paso = "letania";
                mostrarPaso();
            }       
            }
            else if(paso === "letania"){
            if(data && data.letanias){
                rezarLetanias(id); 
            } else {
                finalizarSecuencia();
            }
            }
        }
    // Saber día de la novena
        function getTotalDiasNovena(id){
            const data = contenidoNovenas[id];
            return data?.novena?.length || 9;
        }
        function iniciarNovena(id){
            let hoy = new Date().toISOString().split("T")[0];
            localStorage.setItem("inicioNovena_"+id, hoy);
            secuenciaActual = {
                id: id,
                dia: 1,
                paso: "dia",
                bloque: 0
            };
            mostrarPaso();
        }
        function calcularDiaNovena(id){
            const inicio = localStorage.getItem("inicioNovena_" + id);
                if(!inicio) return 1; 
            const fechaInicio = new Date(inicio);
            const hoy = new Date();
            const diferencia = Math.floor((hoy - fechaInicio) / (1000*60*60*24));
            let totalDias = getTotalDiasNovena(id);
            let dia = diferencia + 1;
                if(dia > totalDias) dia = totalDias;
                return dia;
         }
        // Mostrar día de la novena
            function mostrarDiaNovena(id){
                const data = contenidoNovenas[id];
            // 👇 Seguridad: si no hay secuencia, la creamos
                if(!secuenciaActual){
                const dia = calcularDiaNovena(id);
                secuenciaActual = {
                    id: id,
                    dia: dia,
                    paso: "dia",
                    bloque: 0
                };
                }
                const dia = secuenciaActual.dia;
                const bloqueIndex = secuenciaActual.bloque;
                const diaData = data.novena[dia-1];
                const bloque = diaData.contenido[bloqueIndex];
            // 👇 Seguridad extra
                if(!bloque){
                    finalizarSecuencia();
                return;
                }
                let texto = bloque.texto;
                if(Array.isArray(texto)){
                    texto = texto.join("<br><br>");
                }
                texto = texto.trim();
                const novena = novenas.find(n => n.id === id);
               if(novena && novena.imagen){
                     setBackground(novena.imagen);
                }
            // Renderizado del bloque con botones de navegación
                app.innerHTML = `
                <div class="container">
                    <div class="oracion">${texto}</div>
                    <button onclick="anterior()">Anterior</button>
                    <button onclick="siguienteBloque()">Siguiente</button>
                    <button onclick="salirFlujoNovena()">Salir</button>
                </div>
                `;
            }
    // Modo día manual
    function cambiarDiaManual(id){
        let totalDias = getTotalDiasNovena(id);
        let dia = prompt(`¿Qué día de la novena quieres rezar? (1-${totalDias})`);
            if(!dia) return;
            dia = parseInt(dia);
            if(isNaN(dia) || dia < 1 || dia > totalDias) return;
        // Ajustamos la fecha guardada para que calcularDiaNovena devuelva el día correcto
            let hoy = new Date();
            let nuevaFecha = new Date(hoy);
            nuevaFecha.setDate(hoy.getDate() - (dia - 1));
            localStorage.setItem("inicioNovena_" + id, nuevaFecha.toISOString().split("T")[0]);
        // Creamos la secuencia explícitamente con el día elegido
            secuenciaActual = { id, dia, paso: "dia", bloque: 0 };
        mostrarDiaNovena(id);
    }

// Novenas en curso
    // Devuelve novenas en curso
    function novenasEnCurso(){
        let enCurso = [];
        novenas.forEach(novena => {
            const inicio = localStorage.getItem("inicioNovena_" + novena.id);
            if(inicio){
                const dia = calcularDiaNovena(novena.id);
                if(dia >= 1 && dia <= getTotalDiasNovena(novena.id)){ // novena no completada
                    enCurso.push({
                        id: novena.id,
                        nombre: novena.nombre,
                        dia: dia
                    });
                }
            }
        });
        return enCurso;
    }
    // Muestra novenas en curso
    function mostrarNovenasEnCurso(){
        const enCurso = novenasEnCurso();
        if(enCurso.length === 0){
            alert("No tienes novenas en curso");
            secuenciaActual = null;
            mostrarInicio();
            return;
        }
        let lista = "<h1>Novenas en curso</h1>";
        enCurso.forEach(novena => {
            lista += `<button onclick="rezarNovena('${novena.id}')">
                        ${novena.nombre} (día ${novena.dia})
                      </button>`;
        });
        lista += `<br><button onclick="mostrarInicio()">Volver</button>`;
        app.innerHTML = `<div class="container">${lista}</div>`;
    }
// Pantalla de novena
    // Uso interno - ve la lista de novenas y devuelve la que coincide con el id
    function getNovena(id) {
        return novenas.find(n => n.id === id);
    }
    // Crea los botones de la pantalla de novena según las características de cada novena
       // Crea los botones de la pantalla de novena según las características de cada novena
       function crearBotonesNovena(id, novena) {
         const botonesConfig = [
         ['rezarNovena', 'Rezar novena'],
         ['rezarCoronilla', 'Rezar coronilla'],
         novena.tieneLetanias && ['rezarLetanias', 'Rezar letanías'],
         novena.tieneOracion && ['rezarOracion', 'Oración'],
         ['programarRecordatorio', 'Programar recordatorio']
        ].filter(Boolean);
        return botonesConfig
            .map(([funcion, texto]) => 
                `<button onclick="window.${funcion}('${id}')">${texto}</button>`
            )
            .join('');
        }
        window.rezarCoronilla = rezarCoronilla;
        window.rezarNovena = rezarNovena;
        window.rezarLetanias = rezarLetanias;
        window.rezarOracion = rezarOracion;
        window.programarRecordatorio = programarRecordatorio;
    // Renderiza la pantalla de la novena con su imagen de fondo y los botones correspondientes
        function abrirNovena(id) {
            const novena = getNovena(id);
            const botones = crearBotonesNovena(id, novena);
        app.innerHTML = `
            <div class="container">
                <h1>${novena.nombre}</h1>
                ${botones}
                <br>
                <button onclick="mostrarLista()">Volver</button>
            </div>
        `;
        setBackground(novena.imagen);
    }
// --------------------
// REZAR Letanías y Oración
// --------------------
// Rezar Letanías
    function rezarLetanias(id){
        const data = contenidoNovenas[id];
        if(!data || !data.letanias){
            alert("Esta novena no tiene letanías");
            return;
        }
        let texto = data.letanias;
        if(Array.isArray(texto)) texto = texto.join("\n\n");
        texto = texto.trim();
        // Si estamos en flujo, el botón finaliza la secuencia; si no, vuelve a la novena
            const botonAccion = secuenciaActual
            ? `<button onclick="finalizarSecuencia()">Terminar</button>`
            : `<button onclick="abrirNovena('${id}')">Volver</button>`;
        app.innerHTML = `
        <div class="container">
            <h1>Letanías</h1>
            <div class="letanias">${texto}</div>
            ${botonAccion}
        </div>
        `;
    }
// Rezar Oración
function rezarOracion(id){
    const data = contenidoNovenas[id];

    if(!data || !data.oracion){
        alert("Esta novena no tiene oración");
        return;
    }

    let texto = data.oracion;

    if(Array.isArray(texto)){
        texto = texto.join("\n\n");
    }

    texto = texto.trim();

    app.innerHTML = `
    <div class="container">
        <h1>Oración</h1>
    <div class="oracion">
        ${texto}
    </div>
    <button onclick="abrirNovena('${id}')">Volver</button>
    </div>
    `;
}
// ══════════════════════════════════════════════════
// SISTEMA DE RECORDATORIOS
// ══════════════════════════════════════════════════

// ── Registro del Service Worker ──────────────────
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(reg => {
            console.log("Service Worker registrado");
            // Escuchamos mensajes del SW (p.ej. para abrir novena desde notificación)
            navigator.serviceWorker.addEventListener("message", event => {
                if (event.data.tipo === "abrirNovena") {
                    rezarNovena(event.data.idNovena);
                }
            });
        })
        .catch(err => console.error("Error al registrar SW:", err));
}

// Si la app se abrió desde una notificación (URL con ?novena=xxx)
window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const novenaParam = params.get("novena");
    if (novenaParam) {
        // Limpiamos la URL sin recargar
        history.replaceState({}, "", "index.html");
        rezarNovena(novenaParam);
    }
});

// ── Pedir permiso de notificaciones ──────────────
async function pedirPermisoNotificaciones() {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission === "denied") return false;
    const resultado = await Notification.requestPermission();
    return resultado === "granted";
}

// ── Pantalla para programar recordatorio ─────────
// esSeguimiento = true → viene de terminar el día 1 (solo pide hora)
// esSeguimiento = false → el usuario lo activa manualmente (pide fecha y hora)
function programarRecordatorio(id, esSeguimiento = false) {
    const novena = novenas.find(n => n.id === id);
    const titulo = esSeguimiento
        ? "¿A qué hora quieres rezar cada día?"
        : "¿Cuándo quieres empezar la novena?";
    const inputType = esSeguimiento ? "time" : "datetime-local";

    app.innerHTML = `
    <div class="container">
        <h1>Recordatorio</h1>
        <p style="color:white; margin-bottom:20px;">${titulo}</p>
        <input type="${inputType}" id="fechaRecordatorio"
               style="padding:10px; border-radius:8px; border:none; width:80%;">
        <br><br>
        <button onclick="guardarNuevoRecordatorio('${id}', ${esSeguimiento})">Guardar recordatorio</button>
        <button onclick="${esSeguimiento ? "mostrarInicio()" : `abrirNovena('${id}')`}">Tal vez luego</button>
    </div>
    `;
}

// ── Guardar y programar el recordatorio ──────────
async function guardarNuevoRecordatorio(id, esSeguimiento) {
    const valorInput = document.getElementById("fechaRecordatorio").value;
    if (!valorInput) {
        alert("Por favor, selecciona una fecha u hora.");
        return;
    }

    const tienePermiso = await pedirPermisoNotificaciones();
    if (!tienePermiso) {
        alert("Sin permiso de notificaciones no podemos avisarte. Actívalas en los ajustes del móvil.");
        return;
    }

    // Construimos la fecha de inicio del recordatorio
    let fechaBase;
    let horaProgramada;

    if (esSeguimiento) {
        const [h, m] = valorInput.split(":");
        fechaBase = new Date();
        fechaBase.setHours(parseInt(h), parseInt(m), 0, 0);
        // Si la hora elegida ya pasó hoy, empezamos mañana
        if (fechaBase <= new Date()) {
            fechaBase.setDate(fechaBase.getDate() + 1);
        }
        horaProgramada = valorInput;
    } else {
        fechaBase = new Date(valorInput);
        horaProgramada = `${String(fechaBase.getHours()).padStart(2, "0")}:${String(fechaBase.getMinutes()).padStart(2, "0")}`;
    }

    // Guardamos en localStorage para referencia interna
    const registro = { id, inicio: fechaBase.getTime(), hora: horaProgramada };
    const todos = JSON.parse(localStorage.getItem("recordatorios")) || [];
    const filtrados = todos.filter(r => r.id !== id);
    filtrados.push(registro);
    localStorage.setItem("recordatorios", JSON.stringify(filtrados));

    // Calculamos los timestamps de los 9 días y los enviamos al Service Worker
    const totalDias = getTotalDiasNovena(id);
    const novena = novenas.find(n => n.id === id);
    const notificaciones = [];

    for (let dia = 0; dia < totalDias; dia++) {
        const fechaDia = new Date(fechaBase);
        fechaDia.setDate(fechaBase.getDate() + dia);

        // Notificación principal a la hora elegida
        notificaciones.push({
            idNovena: id,
            nombreNovena: novena.nombre,
            timestamp: fechaDia.getTime(),
            esRecordatorio: false
        });

        // Recordatorio de 2h después si no ha rezado
        const fechaRecordatorio = new Date(fechaDia);
        fechaRecordatorio.setHours(fechaRecordatorio.getHours() + 2);
        notificaciones.push({
            idNovena: id,
            nombreNovena: novena.nombre,
            timestamp: fechaRecordatorio.getTime(),
            esRecordatorio: true
        });
    }

    // Enviamos al Service Worker
    const sw = await navigator.serviceWorker.ready;
    sw.active.postMessage({ tipo: "programar", recordatorios: notificaciones });

    alert("¡Recordatorio guardado! Te avisaremos cada día a las " + horaProgramada + ".");
    secuenciaActual = null;
    mostrarInicio();
}

// ── Cancelar recordatorio (al terminar la novena) ─
async function eliminarRecordatorio(id) {
    // Quitamos de localStorage
    let todos = JSON.parse(localStorage.getItem("recordatorios")) || [];
    todos = todos.filter(r => r.id !== id);
    localStorage.setItem("recordatorios", JSON.stringify(todos));

    // Cancelamos las notificaciones programadas en el SW
    if ("serviceWorker" in navigator) {
        const sw = await navigator.serviceWorker.ready;
        sw.active.postMessage({ tipo: "cancelar", idNovena: id });
    }
}

// ── Marcar día como rezado (cancela el aviso de 2h) ─
async function registrarRezoCompletado(id) {
    const hoyString = new Date().toISOString().split("T")[0];
    localStorage.setItem(`ultimoRezo_${id}`, hoyString);

    if ("serviceWorker" in navigator) {
        const sw = await navigator.serviceWorker.ready;
        sw.active.postMessage({ tipo: "marcarRezado", idNovena: id });
    }
}

// ── Finalizar novena con mensaje de felicitación ──
// Reemplaza el finalizarSecuencia() que tenías — añade el mensaje al completar
// IMPORTANTE: esto solo afecta al fragmento de "día === totalDías",
// el resto de tu finalizarSecuencia queda igual.
function mostrarFelicitacion(id, dia) {
    const novena = novenas.find(n => n.id === id);
    app.innerHTML = `
    <div class="container">
        <h1>🎉 ¡Enhorabuena!</h1>
        <p style="color:white; text-align:center; font-size:1.1em; margin: 20px 0;">
            Has completado la novena <strong>${novena.nombre}</strong>.<br><br>
            Que esta novena haya sido una gracia para ti.
        </p>
        <button onclick="mostrarInicio()">Volver al inicio</button>
    </div>
    `;
    setBackground(novena.imagen);
}

// ══════════════════════════════════════════════════
// FIN DEL BLOQUE DE RECORDATORIOS
// ══════════════════════════════════════════════════