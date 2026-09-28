// Funciones para optimizar el modo oración sin distracciones

    // Declaración de variables
    let pasoCoronilla = 0;
    let coronillaActual = null;
    let secuenciaActual = null;
    let diaActual = 0;
    // Pantalla siempre encendida
    let wakeLock = null;
    // Novenas ocultas
    let tapCount = 0;
    let tapTimer = null;
    // Botón de retroceso físico
    let ultimoBackPress = 0;

    // ¿App nativa (Android/Capacitor) o versión web?
    const esAppNativa = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());

    // Marca el body para poder aplicar estilos distintos según la plataforma
        if (esAppNativa) {
            document.body.classList.add('app-nativa');
            const { App } = Capacitor.Plugins;
            App.addListener('backButton', () => {

        // Si está rezando, salimos de esa pantalla y volvemos al menú
            if (secuenciaActual || coronillaActual) {
                salirModoOracion();
                coronillaActual = null;
                secuenciaActual = null;
                mostrarInicio();
                return;
            }
            const contenedor = document.querySelector('.container');
            const enInicio = contenedor && contenedor.dataset.pantalla === 'inicio';
            if (enInicio) {
                const ahora = Date.now();
                if (ahora - ultimoBackPress < 2000) {
                    App.exitApp();
                } else {
                    ultimoBackPress = ahora;
                    mostrarAvisoSalir();
                }
            return;
            }

        // Cualquier otra pantalla → volvemos al menú principal
            mostrarInicio();
            });
        }
           
    //Iniciar aplicación
    const app = document.getElementById("app");
    const VERSION_APP = "2.0.1";
    const historialNovedades = {
        "2.0.0": [
            "Nueva pantalla de \"Contáctanos\" para enviarnos sus sugerencias, novenas nuevas que le gustaría ver, o errores que encuentre.",
            "El modo oración ahora oculta también la barra inferior del móvil y silencia las notificaciones mientras reza.",
            "El botón Atrás del teléfono ya funciona como se espera: le lleva al menú principal, y con doble pulsación puede salir de la app.",
            "Pequeñas correcciones de texto y de tamaño de letra."
        ],
        "2.0.1": [
            "Hemos corregido numerosos fallos y mejorado el diseño",
            "Hemos añadido nuevas novenas: Para pedir la Castidad, al Padre Pío y a Santa Teresa",
            "Nueva opción de contacto (el botón del sobre, abajo a la derecha) para avisar de errores o mandar sugerencias"
        ]
    };
    // Novedades que solo se muestran en la versión web
    const historialNovedadesWeb = {
        "2.0.1": [
            "Además de esta versión web, existe una aplicación para móviles Android, con disponibilidad offline y recordatorios diarios para no olvidar la oración o programar el inicio de la novena en la fecha oficial.", 
            "Los recordatorios solo funcionan en la aplicación, por lo que han sido eliminados de la versión web.",
            "Por ahora la aplicación no está disponible en la Play Store. Si desea instalarla, pídala con el botón del sobre (sección contáctanos) y se la enviaremos gratis."
        ]
    };
    iniciarApp();    async function activarPantalla(){
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
        if (window.Capacitor && window.Capacitor.isNativePlatform()) {
            const { ModoInmersivo } = Capacitor.Plugins;
            await ModoInmersivo.activar();
            const permiso = await ModoInmersivo.tienePermisoNoMolestar();
            if (permiso.concedido) {
                await ModoInmersivo.activarNoMolestar();
            } else {
                const yaAvisado = localStorage.getItem("avisoNoMolestar");
            if (!yaAvisado) {
                localStorage.setItem("avisoNoMolestar", "true");
                const quiere = confirm("Para que no le interrumpan mensajes mientras reza, la app puede activar el No Molestar del teléfono. ¿Quiere concederle permiso ahora?");
                if (quiere) {
                    await ModoInmersivo.pedirPermisoNoMolestar();
                }
            }
        }
        } else if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    }

    function salirModoOracion(){
        if (window.Capacitor && window.Capacitor.isNativePlatform()) {
            const { ModoInmersivo } = Capacitor.Plugins;
            ModoInmersivo.desactivar();
            ModoInmersivo.desactivarNoMolestar();
        } else if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }    
// Cartel de actualizaciones
    function iniciarApp(){
        const versionGuardada = localStorage.getItem("ultimaVersionVista");
        if(!versionGuardada){
            const esUsuarioExistente = localStorage.length > 0;
            if(esUsuarioExistente){
                mostrarNovedades();
            } else {
                mostrarBienvenida();
            }
            return;
        }
        if(versionGuardada !== VERSION_APP){
            mostrarNovedades();
            return;
        }
        mostrarInicio();
    }
    
    function mostrarNovedades(){
        let cambios = historialNovedades[VERSION_APP] || [];
        if(!esAppNativa){
            cambios = cambios.concat(historialNovedadesWeb[VERSION_APP] || []);
        }
        const lista = cambios.map(c => `<li style="margin-bottom:10px;">${c}</li>`).join('');        setBackground('Portada1.jpg');
        app.innerHTML = `
            <div class="container">
                <h1>Novedades de esta versión</h1>
                <ul style="text-align:left; color:white; margin: 0 auto 20px; max-width: 90%; padding-left: 20px;">
                    ${lista}
                </ul>
                <button onclick="cerrarPantallaInicial()">Entendido</button>
            </div>
            `;
    }

    function mostrarBienvenida(){
        setBackground('Portada1.jpg');
        app.innerHTML = `
            <div class="container">
                <h1>Bienvenido a Mis Novenas</h1>
                <p style="color:white; text-align:justify; white-space: pre-line; margin-bottom:20px;">
                    Esta aplicación ha sido creada para ayudarte a rezar y a crecer en el amor al Señor. Por eso, no encontrarás anuncios ni pagos obligatorios.

                    Su funcionamiento es sencillo: escoge una novena de la lista y comienza a rezar. Podrás seguir la novena día a día, avanzando por las distintas oraciones y meditaciones, y, cuando corresponda, rezar también la coronilla, las letanías u otras oraciones asociadas.

                    Además, puedes programar recordatorios para no olvidarte de la oración, eligiendo tú mismo la fecha de inicio o siguiendo el día oficial en que comienza cada novena.

                    He procurado que la aplicación sea sencilla e intuitiva. Aun así, si tienes alguna duda, sugerencia o incluso quieres proponer una nueva novena, puedes enviar un mensaje desde la opción correspondiente en la pantalla de inicio.

                    Espero que esta aplicación te ayude a perseverar en la oración y a acercarte cada día un poco más al Señor.

                    Y, por supuesto, <strong>¡no te olvides de rezar al menos un Padre Nuestro por mí!</strong>
                </p>
                <button onclick="cerrarPantallaInicial()">Empezar</button>
            </div>
            `;
    }

    function cerrarPantallaInicial(){
        localStorage.setItem("ultimaVersionVista", VERSION_APP);
        mostrarInicio();
    }

    // Función Salir
    function salir(){
        salirModoOracion();
        secuenciaActual = null;
        mostrarInicio();
    }

// Optimización de imagenes
function setBackground(imagen) {
    document.body.style.backgroundImage = `url('${imagen}')`;
    document.body.style.backgroundSize = esAppNativa ? "cover" : "contain";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundColor = "#000";
}
// Aviso para salir de la app
    function mostrarAvisoSalir(){
        const aviso = document.createElement('div');
        aviso.className = 'aviso-salir';
        aviso.textContent = 'Pulsa Atrás otra vez para salir';
        document.body.appendChild(aviso);
        setTimeout(() => aviso.remove(), 1800);
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
            alert("✨ Novenas especiales desbloqueadas.");
        }
        mostrarInicio();
        return;
    }
    tapTimer = setTimeout(() => { tapCount = 0; }, 2000);
}

// Pantalla inicial
function mostrarInicio(){
    
    let contenido = `
    <div class="container" data-pantalla="inicio">
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
        contenido += `<button class="boton-contacto" onclick="mostrarContacto()" title="Contáctanos">✉</button>`;
    app.innerHTML = contenido;
    setBackground('Portada1.jpg');
}

// Lista de novenas
function mostrarLista(){
    const desbloqueado = localStorage.getItem("novenasOcultas") === "true";
    const visibles = novenas.filter(n => !n.oculta || desbloqueado);
    let botones = "";
    visibles.forEach(novena => {
        botones += `<button onclick="abrirNovena('${novena.id}')">${novena.nombre}</button>`;
    });
    const aviso = desbloqueado
        ? `<p style="color:#ffd700; font-size:0.85em; margin-bottom:8px;"> Novenas en desarrollo visibles</p>`
        : "";
    app.innerHTML = `
        <div class="container scroll-interno">
            <div class="cabecera-fija">
                <h1>Lista de novenas</h1>
                ${aviso}
            </div>
            <div class="cuerpo-scroll">
                ${botones}
            </div>
            <div class="pie-fijo">
                <button onclick="mostrarInicio()">Volver</button>
            </div>
        </div>
        `;
    setBackground('Portada1.jpg');
}

// --------------------
// REZAR CORONILLA
// --------------------

    function iniciarCoronillaSecuencia(id){
        coronillaActual = id;
        pasoCoronilla = 0;
        mostrarPasoCoronilla();
    }

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

    function salirCoronilla(){
        coronillaActual = null;
        secuenciaActual = null;
        salirModoOracion();
        mostrarInicio();
    }

    function mostrarPasoCoronilla(){
    if(!coronillaActual || !contenidoNovenas[coronillaActual]){
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
    let numActual = 0;
    let i = pasoCoronilla;
    while(i >= 0 && pasos[i] === texto) { numActual++; i--; }
    let j = pasoCoronilla + 1;
    while(j < pasos.length && pasos[j] === texto) { j++; }
    let totalRepeticiones = numActual + (j - (pasoCoronilla + 1));
    if(totalRepeticiones > 1) {
        contador = `Repetición ${numActual} de ${totalRepeticiones}`;
        for(let k = 1; k <= totalRepeticiones; k++){
            puntos += (k <= numActual) ? "● " : "○ ";
        }
    }
    const contenedorExistente = document.querySelector('.texto-coronilla');
    if(contenedorExistente && contenedorExistente.textContent.trim() === texto.trim()){
        document.querySelector('.contador').textContent = contador;
        document.querySelector('.rosario').textContent = puntos;
        return;
    }
    app.innerHTML = `
        <div class="container scroll-interno">
            <div class="cabecera-fija">
                <div class="contador">${contador}</div>
                <div class="rosario">${puntos}</div>
            </div>
            <div class="cuerpo-scroll">
                <div class="texto-coronilla">${texto}</div>
            </div>
            <div class="pie-fijo botones">
                <button onclick="anterior()">Anterior</button>
                <button onclick="siguientePasoCoronilla()">Continuar</button>
                <button onclick="salirCoronilla()">Salir</button>
            </div>
        </div>
        `;
}

    function siguientePasoCoronilla(){
        let pasos = contenidoNovenas[coronillaActual].coronilla;
        if(pasoCoronilla < pasos.length - 1){
            pasoCoronilla++;
            mostrarPasoCoronilla();
        } else {
            if(secuenciaActual){
                secuenciaActual.paso = "letania";
                mostrarPaso();
            } else {
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
        } else {
            // Estamos en el primer paso de la coronilla
            if(secuenciaActual && secuenciaActual.paso === "coronilla"){
                // La coronilla forma parte de una novena en curso:
                // volvemos al último bloque del día que se acaba de leer
                const { id, dia } = secuenciaActual;
                const totalBloques = contenidoNovenas[id].novena[dia-1].contenido.length;
                coronillaActual = null;
                secuenciaActual.paso = "dia";
                secuenciaActual.bloque = totalBloques - 1;
                mostrarPaso();
            } else {
                // Coronilla rezada de forma independiente: volvemos al menú de esa novena, no al menú raíz
                const id = coronillaActual;
                coronillaActual = null;
                salirModoOracion();
                abrirNovena(id);
            }
        }
    }

// --------------------
// REZAR Novena
// --------------------

    function rezarNovena(id){
        entrarModoOracion();
        let inicio = localStorage.getItem("inicioNovena_" + id);
        if(!inicio){
            iniciarNovena(id);
            return;
        }
        mostrarInicioNovena(id);
    }

    // ✅ CAMBIO 2: Añadido botón "Abandonar novena" — quitado el check de rezado hoy (se muestra en la lista)
    function mostrarInicioNovena(id){
        const novena = getNovena(id);
        const dia = calcularDiaNovena(id);
        app.innerHTML = `
            <div class="container">
                <h2>Día ${dia}</h2>
                <h1>${novena.nombre}</h1>
                <button onclick="iniciarFlujoNovena('${id}')">Continuar</button>
                <button onclick="cambiarDiaManual('${id}')">Cambiar día</button>
                <button onclick="confirmarAbandonarNovena('${id}')" style="background-color:#8b0000;">Abandonar novena</button>
                <button onclick="mostrarInicio()">Inicio</button>
            </div>
            `;
    }

    // ✅ CAMBIO 2: Confirmación de abandono
    function confirmarAbandonarNovena(id){
        const novena = getNovena(id);
        app.innerHTML = `
            <div class="container">
                <h1>¿Abandonar novena?</h1>
                <p style="color:white; text-align:center; margin: 20px 0;">
                    ¿Estás seguro de que quieres abandonar la novena <strong>${novena.nombre}</strong>?<br><br>
                    Si continúas perderás tu progreso y deberás volver a empezar.
                </p>
                <button onclick="abandonarNovena('${id}')" style="background-color:#8b0000;">Sí, abandonar</button>
                <button onclick="mostrarInicioNovena('${id}')">No, volver</button>
            </div>
            `;
    }

    // ✅ CAMBIO 2: Borrar progreso y volver al inicio
    async function abandonarNovena(id){
        localStorage.removeItem("inicioNovena_" + id);
        localStorage.removeItem(`ultimoRezo_${id}`);
        await eliminarRecordatorio(id);
        secuenciaActual = null;
        salirModoOracion();
        mostrarInicio();
    }

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

    function siguienteBloque(){
        const { id, dia, bloque } = secuenciaActual;
        const data = contenidoNovenas[id];
        const totalBloques = data.novena[dia-1].contenido.length;
        if(bloque < totalBloques - 1){
            secuenciaActual.bloque++;
            mostrarPaso();
        } else {
            siguientePaso();
        }
    }

    function anterior(){
        if(coronillaActual !== null){
            anteriorPasoCoronilla();
            return;
        }
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
        } else {
            // Ya estamos en el primer bloque: salimos al menú de la novena
            salirFlujoNovena();
        }
    }

    function salirFlujoNovena(){
        const id = secuenciaActual.id;
        secuenciaActual = null;
        salirModoOracion();
        abrirNovena(id);
    }

    async function finalizarSecuencia(){
        if(!secuenciaActual){
            alert("Has terminado la coronilla.");
            secuenciaActual = null;
            mostrarInicio();
            return;
        }
        salirModoOracion();
        const { id, dia } = secuenciaActual;
        await registrarRezoCompletado(id);
        if (dia === 1) {
            if(esAppNativa){
                mostrarPreguntaRecordatorio(id);
                return;
            }
            alert("¡Primer día completado! Ánimo con el resto de la novena.");
            secuenciaActual = null;
            mostrarInicio();
            return;
        }
        if(dia === getTotalDiasNovena(id)){
            await eliminarRecordatorio(id);
            mostrarFelicitacion(id);
            return;
        }
        alert(`Has terminado el día ${dia}. ¡Ánimo!`);
        secuenciaActual = null;
        mostrarInicio();
    }
    function mostrarPreguntaRecordatorio(id){
        app.innerHTML = `
            <div class="container">
                <h1>¡Primer día completado!</h1>
                <p style="color:white; text-align:center; margin: 20px 0;">
                    ¿Te gustaría programar un recordatorio diario para esta novena?
                </p>
                <button onclick="programarRecordatorio('${id}', true)">Sí</button>
                <button onclick="secuenciaActual=null; mostrarInicio();">No</button>
            </div>
            `;
    }
        function mostrarPaso(){
        const {id, paso} = secuenciaActual;
        const data = contenidoNovenas[id];
        if(paso === "dia"){
            mostrarDiaNovena(id);
        }
        else if(paso === "coronilla"){
            if(data && data.coronilla) {
                iniciarCoronillaSecuencia(id);
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

    function mostrarDiaNovena(id){
    const data = contenidoNovenas[id];
    if(!secuenciaActual){
        const dia = calcularDiaNovena(id);
        secuenciaActual = { id, dia, paso: "dia", bloque: 0 };
    }
    const dia = secuenciaActual.dia;
    const bloqueIndex = secuenciaActual.bloque;
    const diaData = data.novena[dia-1];
    const bloque = diaData.contenido[bloqueIndex];
    if(!bloque){
        finalizarSecuencia();
        return;
    }
    let texto = bloque.texto;
    if(Array.isArray(texto)){
        texto = texto.join("<br><br>");
    }
    texto = texto.trim();
    const tituloHTML = bloque.titulo ? `<h3>${bloque.titulo}</h3>` : "";
    const novena = novenas.find(n => n.id === id);
    if(novena && novena.imagen){
        setBackground(novena.imagen);
    }
    app.innerHTML = `
        <div class="container scroll-interno">
            <div class="cabecera-fija">
                <h2>Día ${dia}</h2>
                ${tituloHTML}
            </div>
            <div class="cuerpo-scroll">
                <div class="texto-justificado">${texto}</div>
            </div>
            <div class="pie-fijo botones">
                <button onclick="anterior()">Anterior</button>
                <button onclick="siguienteBloque()">Siguiente</button>
                <button onclick="salirFlujoNovena()">Salir</button>
            </div>
        </div>
        `;
}

    function cambiarDiaManual(id){
        let totalDias = getTotalDiasNovena(id);
        let dia = prompt(`¿Qué día de la novena quieres rezar? (1-${totalDias})`);
        if(!dia) return;
        dia = parseInt(dia);
        if(isNaN(dia) || dia < 1 || dia > totalDias) return;
        let hoy = new Date();
        let nuevaFecha = new Date(hoy);
        nuevaFecha.setDate(hoy.getDate() - (dia - 1));
        localStorage.setItem("inicioNovena_" + id, nuevaFecha.toISOString().split("T")[0]);
        secuenciaActual = { id, dia, paso: "dia", bloque: 0 };
        mostrarDiaNovena(id);
    }

// Novenas en curso
    function novenasEnCurso(){
        let enCurso = [];
        novenas.forEach(novena => {
            const inicio = localStorage.getItem("inicioNovena_" + novena.id);
            if(inicio){
                const dia = calcularDiaNovena(novena.id);
                if(dia >= 1 && dia <= getTotalDiasNovena(novena.id)){
                    enCurso.push({ id: novena.id, nombre: novena.nombre, dia });
                }
            }
        });
        return enCurso;
    }

    // ✅ CAMBIO 1: Lista de novenas en curso con icono de estado rezado/pendiente
    function mostrarNovenasEnCurso(){
        const enCurso = novenasEnCurso();
        if(enCurso.length === 0){
            alert("No tienes novenas en curso");
            secuenciaActual = null;
            mostrarInicio();
            return;
        }
        const hoy = new Date().toISOString().split("T")[0];
        let lista = "<h1>Novenas en curso</h1>";
        enCurso.forEach(novena => {
            const ultimoRezo = localStorage.getItem(`ultimoRezo_${novena.id}`);
            const rezadoHoy = ultimoRezo === hoy;
            const icono = rezadoHoy ? "✅" : "⏳";
            lista += `<button onclick="rezarNovena('${novena.id}')">
                        ${icono} ${novena.nombre} — día ${novena.dia}
                      </button>`;
        });
        lista += `<br><button onclick="mostrarInicio()">Volver</button>`;
        app.innerHTML = `<div class="container">${lista}</div>`;
    }

// Pantalla de novena
    function getNovena(id) {
        return novenas.find(n => n.id === id);
    }

    function crearBotonesNovena(id, novena) { 
        const botonesConfig = [
            ['rezarNovena', 'Rezar novena'],
            novena.tieneCoronilla !== false && ['rezarCoronilla', 'Rezar coronilla'],
            novena.tieneLetanias && ['rezarLetanias', 'Rezar letanías'],
            novena.tieneOracion && ['rezarOracion', 'Oración'],
            esAppNativa && ['programarRecordatorio', 'Programar recordatorio']
        ].filter(Boolean);
        return botonesConfig
            .map(([funcion, texto]) =>
                `<button onclick="window.${funcion}('${id}')">${texto}</button>`
            )
        .   join('');
    }    
    
    window.rezarCoronilla = rezarCoronilla;
    window.rezarNovena = rezarNovena;
    window.rezarLetanias = rezarLetanias;
    window.rezarOracion = rezarOracion;
    window.programarRecordatorio = programarRecordatorio;
    window.confirmarAbandonarNovena = confirmarAbandonarNovena; 
    window.abandonarNovena = abandonarNovena;                   
    window.mostrarInicioNovena = mostrarInicioNovena;           

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

    function rezarLetanias(id){
    entrarModoOracion();
    const data = contenidoNovenas[id];
    if(!data || !data.letanias){
        alert("Esta novena no tiene letanías");
        return;
    }
    let texto = data.letanias;
    if(Array.isArray(texto)) texto = texto.join("\n\n");
    texto = texto.trim();
    const botonAccion = secuenciaActual
        ? `<button onclick="finalizarSecuencia()">Terminar</button>`
        : `<button onclick="salirModoOracion(); abrirNovena('${id}')">Volver</button>`;
    app.innerHTML = `
    <div class="container scroll-interno">
        <div class="cabecera-fija">
            <h1>Letanías</h1>
        </div>
        <div class="cuerpo-scroll">
            <div class="letanias">${texto}</div>
        </div>
        <div class="pie-fijo">
            ${botonAccion}
        </div>
    </div>
    `;
}

function rezarOracion(id){
    entrarModoOracion();
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
    <div class="container scroll-interno">
        <div class="cabecera-fija">
            <h1>Oración</h1>
        </div>
        <div class="cuerpo-scroll">
            <div class="oracion">${texto}</div>
        </div>
        <div class="pie-fijo">
            <button onclick="salirModoOracion(); abrirNovena('${id}')">Volver</button>
        </div>
    </div>
    `;
}

// ══════════════════════════════════════════════════
// SISTEMA DE RECORDATORIOS
// ══════════════════════════════════════════════════
// Genera un id numérico entero estable a partir de idNovena + timestamp
// (LocalNotifications exige que el id sea un número entero)
function idNotificacionNativa(idNovena, timestamp){
    const texto = idNovena + "_" + timestamp;
    let hash = 0;
    for(let i = 0; i < texto.length; i++){
        hash = (hash * 31 + texto.charCodeAt(i)) >>> 0;
    }
    return hash % 2147483647;
}

let pedirPermisoNotificaciones, guardarNuevoRecordatorio, eliminarRecordatorio, registrarRezoCompletado;

if (esAppNativa) {

    // ────────────────────────────────────────────
    // VERSIÓN APP (Android) — notificaciones nativas
    // ────────────────────────────────────────────
    const { LocalNotifications } = Capacitor.Plugins;

    LocalNotifications.addListener("localNotificationActionPerformed", (event) => {
        const idNovena = event.notification?.extra?.idNovena;
        if (idNovena) rezarNovena(idNovena);
    });

    pedirPermisoNotificaciones = async function(){
        const actual = await LocalNotifications.checkPermissions();
        if (actual.display === "granted") return true;
        const solicitado = await LocalNotifications.requestPermissions();
        return solicitado.display === "granted";
    };

    guardarNuevoRecordatorio = async function(id, esSeguimiento){
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
        let fechaBase, horaProgramada;
        if (esSeguimiento) {
            const [h, m] = valorInput.split(":");
            fechaBase = new Date();
            fechaBase.setHours(parseInt(h), parseInt(m), 0, 0);
            if (fechaBase <= new Date()) fechaBase.setDate(fechaBase.getDate() + 1);
            horaProgramada = valorInput;
        } else {
            fechaBase = new Date(valorInput);
            horaProgramada = `${String(fechaBase.getHours()).padStart(2,"0")}:${String(fechaBase.getMinutes()).padStart(2,"0")}`;
        }

        const registro = { id, inicio: fechaBase.getTime(), hora: horaProgramada };
        const todos = JSON.parse(localStorage.getItem("recordatorios")) || [];
        const filtrados = todos.filter(r => r.id !== id);
        filtrados.push(registro);
        localStorage.setItem("recordatorios", JSON.stringify(filtrados));

        const totalDias = getTotalDiasNovena(id);
        const novena = novenas.find(n => n.id === id);
        const notificaciones = [];

        for (let dia = 0; dia < totalDias; dia++) {
            const fechaDia = new Date(fechaBase);
            fechaDia.setDate(fechaBase.getDate() + dia);
            notificaciones.push({
                id: idNotificacionNativa(id, fechaDia.getTime()),
                title: "Momento de oración",
                body: `Recuerda rezar hoy: ${novena.nombre}`,
                schedule: { at: fechaDia, allowWhileIdle: true },
                extra: { idNovena: id, timestamp: fechaDia.getTime(), esRecordatorio: false }
            });

            const fechaRecordatorio = new Date(fechaDia);
            fechaRecordatorio.setHours(fechaRecordatorio.getHours() + 2);
            notificaciones.push({
                id: idNotificacionNativa(id, fechaRecordatorio.getTime()),
                title: "¿Aún no has rezado hoy?",
                body: `Todavía estás a tiempo de rezar tu novena: ${novena.nombre}`,
                schedule: { at: fechaRecordatorio, allowWhileIdle: true },
                extra: { idNovena: id, timestamp: fechaRecordatorio.getTime(), esRecordatorio: true }
            });
        }

        await LocalNotifications.schedule({ notifications: notificaciones });

        alert("¡Recordatorio guardado! Te avisaremos cada día a las " + horaProgramada + ".");
        secuenciaActual = null;
        mostrarInicio();
    };

    eliminarRecordatorio = async function(id){
        let todos = JSON.parse(localStorage.getItem("recordatorios")) || [];
        todos = todos.filter(r => r.id !== id);
        localStorage.setItem("recordatorios", JSON.stringify(todos));

        const pendientes = await LocalNotifications.getPending();
        const aCancelar = pendientes.notifications
            .filter(n => n.extra && n.extra.idNovena === id)
            .map(n => ({ id: n.id }));
        if (aCancelar.length > 0) {
            await LocalNotifications.cancel({ notifications: aCancelar });
        }
    };

    registrarRezoCompletado = async function(id){
        const hoyString = new Date().toISOString().split("T")[0];
        localStorage.setItem(`ultimoRezo_${id}`, hoyString);

        const pendientes = await LocalNotifications.getPending();
        const hoy = new Date();
        const aCancelar = pendientes.notifications
            .filter(n => {
                if (!n.extra || n.extra.idNovena !== id || !n.extra.esRecordatorio) return false;
                return new Date(n.extra.timestamp).toDateString() === hoy.toDateString();
            })
            .map(n => ({ id: n.id }));
        if (aCancelar.length > 0) {
            await LocalNotifications.cancel({ notifications: aCancelar });
        }
    };

} else {
     eliminarRecordatorio = async function(id) {
        try {
            let todos = JSON.parse(localStorage.getItem("recordatorios")) || [];
            todos = todos.filter(r => r.id !== id);
            localStorage.setItem("recordatorios", JSON.stringify(todos));
            if ("serviceWorker" in navigator) {
                const reg = await navigator.serviceWorker.getRegistration();
                if (reg && reg.active) reg.active.postMessage({ tipo: "cancelar", idNovena: id });
            }
        } catch (e) {
            console.log("No se pudo cancelar el recordatorio:", e);
        }
    };

    registrarRezoCompletado = async function(id) {
        try {
            const hoyString = new Date().toISOString().split("T")[0];
            localStorage.setItem(`ultimoRezo_${id}`, hoyString);
            if ("serviceWorker" in navigator) {
                const reg = await navigator.serviceWorker.getRegistration();
                if (reg && reg.active) reg.active.postMessage({ tipo: "marcarRezado", idNovena: id });
            }
        } catch (e) {
            console.log("No se pudo registrar el rezo:", e);
        }
    };

    // ────────────────────────────────────────────
    // VERSIÓN WEB (GitHub Pages) — se mantiene el sistema anterior, sin tocar
    // ────────────────────────────────────────────
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js")
            .then(reg => {
                console.log("Service Worker registrado");
                navigator.serviceWorker.addEventListener("message", event => {
                    if (event.data.tipo === "abrirNovena") {
                        rezarNovena(event.data.idNovena);
                    }
                });
            })
            .catch(err => console.error("Error al registrar SW:", err));
    }

    window.addEventListener("load", () => {
        const params = new URLSearchParams(window.location.search);
        const novenaParam = params.get("novena");
        if (novenaParam) {
            history.replaceState({}, "", "index.html");
            rezarNovena(novenaParam);
        }
    });

    pedirPermisoNotificaciones = async function() {
        if (!("Notification" in window)) return false;
        if (Notification.permission === "granted") return true;
        if (Notification.permission === "denied") return false;
        const resultado = await Notification.requestPermission();
        return resultado === "granted";
    };

    guardarNuevoRecordatorio = async function(id, esSeguimiento) {
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
        let fechaBase, horaProgramada;
        if (esSeguimiento) {
            const [h, m] = valorInput.split(":");
            fechaBase = new Date();
            fechaBase.setHours(parseInt(h), parseInt(m), 0, 0);
            if (fechaBase <= new Date()) fechaBase.setDate(fechaBase.getDate() + 1);
            horaProgramada = valorInput;
        } else {
            fechaBase = new Date(valorInput);
            horaProgramada = `${String(fechaBase.getHours()).padStart(2,"0")}:${String(fechaBase.getMinutes()).padStart(2,"0")}`;
        }
        const registro = { id, inicio: fechaBase.getTime(), hora: horaProgramada };
        const todos = JSON.parse(localStorage.getItem("recordatorios")) || [];
        const filtrados = todos.filter(r => r.id !== id);
        filtrados.push(registro);
        localStorage.setItem("recordatorios", JSON.stringify(filtrados));
        const totalDias = getTotalDiasNovena(id);
        const novena = novenas.find(n => n.id === id);
        const notificaciones = [];
        for (let dia = 0; dia < totalDias; dia++) {
            const fechaDia = new Date(fechaBase);
            fechaDia.setDate(fechaBase.getDate() + dia);
            notificaciones.push({ idNovena: id, nombreNovena: novena.nombre, timestamp: fechaDia.getTime(), esRecordatorio: false });
            const fechaRecordatorio = new Date(fechaDia);
            fechaRecordatorio.setHours(fechaRecordatorio.getHours() + 2);
            notificaciones.push({ idNovena: id, nombreNovena: novena.nombre, timestamp: fechaRecordatorio.getTime(), esRecordatorio: true });
        }
        const sw = await navigator.serviceWorker.ready;
        if (sw.active) {
            sw.active.postMessage({ tipo: "programar", recordatorios: notificaciones });
        } else {
            alert("Hubo un problema al guardar el recordatorio. Cierra y vuelve a abrir la app e inténtalo de nuevo.");
            return;
        }
        alert("¡Recordatorio guardado! Te avisaremos cada día a las " + horaProgramada + ".");
        secuenciaActual = null;
        mostrarInicio();
    };
}

function formatearFechaParaInput(fecha){
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth()+1).padStart(2,'0');
    const d = String(fecha.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}T08:00`;
}

function programarRecordatorio(id, esSeguimiento = false) {
    const titulo = esSeguimiento
        ? "¿A qué hora quieres rezar cada día?"
        : "¿Cuándo quieres empezar la novena?";
    const inputType = esSeguimiento ? "time" : "datetime-local";
    const novena = novenas.find(n => n.id === id);
    let botonFechaOficial = "";
    if(!esSeguimiento && novena && novena.fechaOficial){
        const fechaOficial = calcularFechaOficialInicio(novena.fechaOficial);
        if(fechaOficial){
            const valorISO = formatearFechaParaInput(fechaOficial);
            const textoBoton = `Usar fecha oficial de inicio (${fechaOficial.getDate()}/${fechaOficial.getMonth()+1})`;
            botonFechaOficial = `<button onclick="document.getElementById('fechaRecordatorio').value='${valorISO}'">${textoBoton}</button>`;
        }
    }
    app.innerHTML = `
    <div class="container">
        <h1>Recordatorio</h1>
        <p style="color:white; margin-bottom:20px;">${titulo}</p>
        <input type="${inputType}" id="fechaRecordatorio"
               style="padding:10px; border-radius:8px; border:none; width:80%;">
        ${botonFechaOficial}
        <br><br>
        <button onclick="guardarNuevoRecordatorio('${id}', ${esSeguimiento})">Guardar recordatorio</button>
        <button onclick="${esSeguimiento ? "mostrarInicio()" : `abrirNovena('${id}')`}">Tal vez luego</button>
    </div>
    `;
}

function mostrarFelicitacion(id) {
    localStorage.removeItem("inicioNovena_" + id);
    localStorage.removeItem(`ultimoRezo_${id}`);
    const novena = novenas.find(n => n.id === id);
    app.innerHTML = `
    <div class="container">
        <h1>¡Novena terminada!</h1>
        <p style="color:white; text-align:center; font-size:1.1em; margin: 20px 0;">
            Has completado la novena <strong>${novena.nombre}</strong>.<br><br>
            Que el Señor te conceda lo que has pedido.
        </p>
        <button onclick="mostrarInicio()">Volver al inicio</button>
    </div>
    `;
    setBackground(novena.imagen);
}

// ══════════════════════════════════════════════════
// FIN DEL BLOQUE DE RECORDATORIOS
// ══════════════════════════════════════════════════

// ══════════════════════════════════════════════════
// BLOQUE CONTACTO
// ══════════════════════════════════════════════════
function mostrarContacto(){
    app.innerHTML = `
    <div class="container">
        <h1>Contáctanos</h1>
        <p style="color:white; margin-bottom:20px;">
            ¿Alguna sugerencia, una novena que le gustaría ver aquí, o algún fallo que haya encontrado? Cuéntenoslo con confianza, leemos todos los mensajes.
        </p>
        <textarea id="textoContacto" maxlength="500" rows="6"
            style="width:80%; padding:10px; border-radius:8px; border:none; font-family:inherit; font-size:1em; resize:vertical;"
            oninput="actualizarContadorContacto()"></textarea>
        <div id="contadorContacto" style="color:white; font-size:0.85em; margin:6px 0 20px;">500 caracteres restantes</div>
        <button onclick="enviarContacto()">Enviar</button>
        <button onclick="mostrarInicio()">Atrás</button>
    </div>
    `;
}

function actualizarContadorContacto(){
    const campo = document.getElementById('textoContacto');
    const restantes = 500 - campo.value.length;
    document.getElementById('contadorContacto').textContent = `${restantes} caracteres restantes`;
}

function enviarContacto(){
    const texto = document.getElementById('textoContacto').value.trim();
    if(!texto){
        alert('Escriba algo antes de enviar, por favor.');
        return;
    }
    const asunto = encodeURIComponent('Sugerencia desde Mis Novenas');
    const cuerpo = encodeURIComponent(texto);
    window.location.href = `mailto:SF.MADRID.HOGAR@gmail.com?subject=${asunto}&body=${cuerpo}`;
    //window.location.href = `mailto:?bcc=SF.MADRID.HOGAR@gmail.com&subject=${asunto}&body=${cuerpo}`;
    }
// ══════════════════════════════════════════════════
// FIN BLOQUE CONTACTO
// ══════════════════════════════════════════════════