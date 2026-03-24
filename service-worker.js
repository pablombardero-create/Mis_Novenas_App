const SW_VERSION = "1.0.1";
const CACHE_NAME = "novenas-cache-v1";
const ARCHIVOS = [
    "./index.html",
    "./App.js",
    "./novenas.js",
    "./Style.css",
    "./manifest.json",
    "./icono-192.png",
    "./icono-512.png",
    "./Portada1.jpg",
    "./Dolindo.jpg",
    "./SagradoCorazonz.jpg",
    "./Jesus_Divina_Misericordia.jpg",
    "./EspirituSanto.jpg",
    "./AngelCustodio.jpg",
    "./Castidad.jpg"
];

// ─────────────────────────────────────────
// INSTALACIÓN Y ACTIVACIÓN
// ─────────────────────────────────────────

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ARCHIVOS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Responder desde caché si está disponible
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});

// ─────────────────────────────────────────
// MENSAJES DESDE LA APP
// ─────────────────────────────────────────
// La app le manda mensajes al SW para programar o cancelar recordatorios.
// Formato del mensaje:
//   { tipo: "programar", recordatorios: [...] }
//   { tipo: "cancelar", idNovena: "abandono" }
//   { tipo: "marcarRezado", idNovena: "abandono", dia: 3 }

self.addEventListener("message", event => {
    const { tipo } = event.data;

    if (tipo === "programar") {
        programarNotificaciones(event.data.recordatorios);
    }
    else if (tipo === "cancelar") {
        cancelarNotificacionesNovena(event.data.idNovena);
    }
    else if (tipo === "marcarRezado") {
        marcarDiaRezado(event.data.idNovena, event.data.dia);
    }
});

// ─────────────────────────────────────────
// PROGRAMAR NOTIFICACIONES
// ─────────────────────────────────────────
// Recibe un array de objetos:
// { idNovena, nombreNovena, timestamp, esRecordatorio }
// esRecordatorio = true → es el aviso de "¿todavía no has rezado?"

async function programarNotificaciones(recordatorios) {
    // Comprobamos si el navegador soporta notificaciones programadas (Chrome Android)
    const soportaProgramadas = "showTrigger" in Notification.prototype;

    for (const r of recordatorios) {
        const tag = `novena_${r.idNovena}_${r.timestamp}`;

        if (soportaProgramadas) {
            // ✅ Chrome Android: notificación programada real (funciona con app cerrada)
            await self.registration.showNotification(
                r.esRecordatorio ? "¿Aún no has rezado hoy?" : "Momento de oración",
                {
                    body: r.esRecordatorio
                        ? `Todavía estás a tiempo de rezar tu novena: ${r.nombreNovena}`
                        : `Recuerda rezar hoy: ${r.nombreNovena}`,
                    icon: "icono-192.png",
                    badge: "icono-192.png",
                    tag: tag,
                    data: { idNovena: r.idNovena, timestamp: r.timestamp },
                    showTrigger: new TimestampTrigger(r.timestamp),
                    renotify: false,
                    requireInteraction: false
                }
            );
        } else {
            // ⚠️ Fallback: guardamos en IndexedDB y revisamos con sync periódico
            await guardarRecordatorioPendiente(r);
        }
    }
}

// ─────────────────────────────────────────
// CANCELAR NOTIFICACIONES DE UNA NOVENA
// ─────────────────────────────────────────

async function cancelarNotificacionesNovena(idNovena) {
    const notificaciones = await self.registration.getNotifications({ includeTriggered: true });
    for (const n of notificaciones) {
        if (n.data && n.data.idNovena === idNovena) {
            n.close();
        }
    }
    // También limpiamos las pendientes en IndexedDB
    await limpiarRecordatoriosPendientes(idNovena);
}

// ─────────────────────────────────────────
// MARCAR DÍA COMO REZADO
// ─────────────────────────────────────────
// Cancela el recordatorio de 2h de ese día concreto

async function marcarDiaRezado(idNovena, dia) {
    const notificaciones = await self.registration.getNotifications({ includeTriggered: true });
    for (const n of notificaciones) {
        if (n.data && n.data.idNovena === idNovena && n.data.esRecordatorio) {
            // Buscamos si es el recordatorio de hoy
            const hoy = new Date().toISOString().split("T")[0];
            const fechaNot = new Date(n.data.timestamp).toISOString().split("T")[0];
            if (fechaNot === hoy) {
                n.close();
            }
        }
    }
}

// ─────────────────────────────────────────
// CLIC EN NOTIFICACIÓN → abrir la app
// ─────────────────────────────────────────

self.addEventListener("notificationclick", event => {
    event.notification.close();
    const idNovena = event.notification.data?.idNovena;

    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clients => {
            // Si la app ya está abierta, la enfocamos
            for (const client of clients) {
                if (client.url.includes("index.html") && "focus" in client) {
                    client.focus();
                    client.postMessage({ tipo: "abrirNovena", idNovena });
                    return;
                }
            }
            // Si no está abierta, la abrimos
            if (self.clients.openWindow) {
                return self.clients.openWindow(`index.html?novena=${idNovena}`);
            }
        })
    );
});

// ─────────────────────────────────────────
// FALLBACK: IndexedDB + Sync periódico
// Para navegadores sin TimestampTrigger (Firefox, Safari, algunos Android)
// ─────────────────────────────────────────

function abrirDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open("NovenaRecordatorios", 1);
        req.onupgradeneeded = e => {
            e.target.result.createObjectStore("pendientes", { keyPath: "tag" });
        };
        req.onsuccess = e => resolve(e.target.result);
        req.onerror = e => reject(e.target.error);
    });
}

async function guardarRecordatorioPendiente(r) {
    const db = await abrirDB();
    const tag = `novena_${r.idNovena}_${r.timestamp}`;
    const tx = db.transaction("pendientes", "readwrite");
    tx.objectStore("pendientes").put({ tag, ...r });
    return new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
}

async function limpiarRecordatoriosPendientes(idNovena) {
    const db = await abrirDB();
    const tx = db.transaction("pendientes", "readwrite");
    const store = tx.objectStore("pendientes");
    const req = store.getAll();
    req.onsuccess = () => {
        req.result
            .filter(r => r.idNovena === idNovena)
            .forEach(r => store.delete(r.tag));
    };
    return new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
}

// Revisión periódica para el fallback (se activa cuando la app está abierta)
self.addEventListener("periodicsync", event => {
    if (event.tag === "revisar-recordatorios") {
        event.waitUntil(revisarRecordatoriosFallback());
    }
});

async function revisarRecordatoriosFallback() {
    const db = await abrirDB();
    const tx = db.transaction("pendientes", "readonly");
    const req = tx.objectStore("pendientes").getAll();

    req.onsuccess = async () => {
        const ahora = Date.now();
        for (const r of req.result) {
            if (r.timestamp <= ahora) {
                await self.registration.showNotification(
                    r.esRecordatorio ? "¿Aún no has rezado hoy?" : "Momento de oración",
                    {
                        body: r.esRecordatorio
                            ? `Todavía estás a tiempo: ${r.nombreNovena}`
                            : `Recuerda rezar hoy: ${r.nombreNovena}`,
                        icon: "icono-192.png",
                        tag: r.tag,
                        data: { idNovena: r.idNovena, timestamp: r.timestamp, esRecordatorio: r.esRecordatorio }
                    }
                );
                // Borramos el pendiente ya lanzado
                const tx2 = db.transaction("pendientes", "readwrite");
                tx2.objectStore("pendientes").delete(r.tag);
            }
        }
    };
}
