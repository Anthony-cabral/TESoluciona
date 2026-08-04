import type {
  Article,
  CommandSnippet,
  FAQ,
  Reference
} from "@/features/solutions/types";

const microsoftActivation: Reference = {
  label: "Activar Windows",
  publisher: "Microsoft Support",
  url: "https://support.microsoft.com/en-us/windows/activate-windows-11305dbc-ef5d-1c08-3ba7-4c7a2cb8f404"
};

const microsoftSfc: Reference = {
  label: "Usar System File Checker en Windows",
  publisher: "Microsoft Support",
  url: "https://support.microsoft.com/en-US/Windows/Experience/backup-recovery/using-system-file-checker-in-windows"
};

const outlookProfiles: Reference = {
  label: "Crear un perfil de Outlook",
  publisher: "Microsoft Support",
  url: "https://support.microsoft.com/en-us/outlook/create-an-outlook-profile"
};

const outlookRepairProfile: Reference = {
  label: "Reparar un perfil de Outlook",
  publisher: "Microsoft Support",
  url: "https://support.microsoft.com/en-us/outlook/fix-your-outlook-email-connection-by-repairing-your-profile"
};

const windowsSecurity: Reference = {
  label: "Windows Security App Overview",
  publisher: "Microsoft Support",
  url: "https://support.microsoft.com/en-US/Windows/Security/Windows-Security/windows-security-app-overview"
};

const chromeErrors: Reference = {
  label: "Fix connection and loading errors in Chrome",
  publisher: "Google Chrome Help",
  url: "https://support.google.com/chrome/answer/6098869"
};

const genericFaq: FAQ[] = [
  {
    question: "¿Necesito ser administrador?",
    answer:
      "Para tareas que cambian configuración del sistema, sí. Si solo estás revisando información, normalmente no hace falta."
  },
  {
    question: "¿Debo reiniciar al terminar?",
    answer:
      "Solo cuando la guía lo indique o cuando Windows, Office o el navegador lo soliciten para aplicar cambios."
  }
];

function buildArticle(input: {
  title: string;
  slug: string;
  summary: string;
  categorySlug: string;
  tags: string[];
  keywords: string[];
  difficulty?: Article["difficulty"];
  commands?: CommandSnippet[];
  steps: string[];
  causes: string[];
  symptoms: string[];
  alternatives?: string[];
  verification: string[];
  warnings?: string[];
  references?: Reference[];
  relatedSlugs?: string[];
}): Article {
  return {
    type: "guide",
    title: input.title,
    slug: input.slug,
    summary: input.summary,
    introduction: `${input.title} es una consulta frecuente en soporte técnico. Esta guía resume una forma segura de diagnosticar el caso, aplicar cambios mínimos y verificar el resultado sin depender de trucos riesgosos.`,
    simpleExplanation:
      "La idea es confirmar primero el estado real del equipo o aplicación, aplicar una corrección controlada y revisar si el problema desapareció antes de tocar opciones avanzadas.",
    technicalExplanation:
      "El diagnóstico se basa en herramientas integradas, configuración visible para el usuario y comandos de solo lectura o mantenimiento estándar. Cuando se proponen cambios, se prioriza que sean reversibles y fáciles de documentar.",
    symptoms: input.symptoms,
    causes: input.causes,
    prerequisites: [
      "Guardar el trabajo abierto antes de cambiar configuración.",
      "Tener una cuenta con permisos adecuados si la solución modifica el sistema.",
      "Anotar mensajes exactos, códigos de error o capturas si el problema continúa."
    ],
    primarySteps: input.steps,
    alternatives: input.alternatives ?? [
      "Probar con otra cuenta de Windows para descartar perfil dañado.",
      "Revisar si una política de empresa administra la configuración.",
      "Aplicar actualizaciones pendientes antes de repetir el diagnóstico."
    ],
    commands: input.commands ?? [],
    warnings: input.warnings ?? [
      "No descargues reparadores desconocidos ni ejecutes comandos encontrados en foros sin entender su efecto.",
      "Si el equipo pertenece a una organización, consulta al administrador antes de cambiar políticas o seguridad."
    ],
    verification: input.verification,
    faq: genericFaq,
    relatedSlugs: input.relatedSlugs ?? [],
    author: "Equipo editorial de Tesoluciona",
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-04",
    readingTimeMinutes: Math.max(4, Math.ceil(input.steps.length * 0.8 + 3)),
    difficulty: input.difficulty ?? "basico",
    categorySlug: input.categorySlug,
    tags: input.tags,
    references: input.references ?? [],
    seo: {
      title: `${input.title} | Tesoluciona`,
      description: input.summary,
      canonicalPath: `/articulos/${input.slug}`
    },
    keywords: input.keywords,
    status: "published"
  };
}

export const articles: Article[] = [
  buildArticle({
    title: "Cómo comprobar si Windows está activado",
    slug: "como-comprobar-si-windows-esta-activado",
    summary:
      "Aprende a revisar el estado de activación de Windows desde Configuración y con comandos seguros.",
    categorySlug: "windows",
    tags: ["windows", "activación", "licencia", "slmgr"],
    keywords: ["windows activado", "license status", "slmgr xpr", "activation"],
    symptoms: [
      "Aparece una marca de agua de activación.",
      "No puedes personalizar Windows.",
      "Ves mensajes de licencia en Configuración."
    ],
    causes: [
      "Windows no tiene licencia válida.",
      "Cambió hardware importante.",
      "La edición instalada no coincide con la licencia.",
      "El equipo no puede contactar los servidores de activación."
    ],
    commands: [
      {
        label: "Ver expiración de licencia",
        value: "slmgr /xpr",
        language: "cmd"
      },
      {
        label: "Ver información de licencia",
        value: "slmgr /dlv",
        language: "cmd"
      }
    ],
    steps: [
      "Abre Configuración.",
      "Entra en Sistema y luego Activación.",
      "Revisa el campo Estado de activación.",
      "Si hay error, copia el código exacto antes de usar el solucionador.",
      "Ejecuta slmgr /xpr solo si necesitas confirmación adicional."
    ],
    verification: [
      "El estado debe indicar que Windows está activado.",
      "No debe aparecer marca de agua tras reiniciar.",
      "El comando slmgr /xpr debe indicar activación permanente o una expiración esperada."
    ],
    references: [microsoftActivation],
    relatedSlugs: [
      "que-significa-license-status-notification",
      "como-conocer-la-version-y-compilacion-de-windows"
    ]
  }),
  buildArticle({
    title: "Qué significa License Status Notification",
    slug: "que-significa-license-status-notification",
    summary:
      "Explicación clara del estado License Status Notification y pasos para revisar la activación de Windows.",
    categorySlug: "windows",
    tags: ["windows", "licencia", "activación"],
    keywords: [
      "license status notification",
      "windows not activated",
      "licencia windows"
    ],
    symptoms: [
      "slmgr muestra License Status: Notification.",
      "Windows pide activar la licencia.",
      "Aparecen avisos periódicos de activación."
    ],
    causes: [
      "La activación falló.",
      "El periodo de gracia terminó.",
      "La clave no corresponde a la edición instalada.",
      "El servicio de licencias no validó el equipo."
    ],
    commands: [
      { label: "Detalle de licencia", value: "slmgr /dlv", language: "cmd" },
      {
        label: "Intentar activación online",
        value: "slmgr /ato",
        language: "cmd"
      }
    ],
    steps: [
      "Confirma la edición de Windows instalada.",
      "Revisa el estado de activación en Configuración.",
      "Ejecuta slmgr /dlv y guarda el código de error si aparece.",
      "Usa el solucionador de activación si la licencia digital estaba asociada a tu cuenta.",
      "Contacta al administrador si el equipo usa KMS o licencia empresarial."
    ],
    verification: [
      "El estado deja de mostrar Notification.",
      "Windows muestra activación correcta.",
      "El visor de eventos no registra errores nuevos de Software Protection."
    ],
    references: [microsoftActivation],
    relatedSlugs: ["como-comprobar-si-windows-esta-activado"]
  }),
  buildArticle({
    title: "Cómo actualizar Windows 10 a Windows 11",
    slug: "como-actualizar-windows-10-a-windows-11",
    summary:
      "Revisa compatibilidad, respaldo y rutas seguras antes de actualizar de Windows 10 a Windows 11.",
    categorySlug: "windows",
    tags: ["windows 11", "actualización", "compatibilidad"],
    keywords: ["actualizar windows 10 a windows 11", "windows update", "tpm"],
    symptoms: [
      "Windows Update ofrece Windows 11.",
      "El equipo indica que no cumple requisitos.",
      "La actualización falla o se queda pendiente."
    ],
    causes: [
      "Requisitos de hardware no cumplidos.",
      "TPM o Secure Boot deshabilitados.",
      "Drivers o espacio insuficiente.",
      "Windows Update con componentes dañados."
    ],
    steps: [
      "Haz copia de seguridad de archivos importantes.",
      "Ejecuta Windows Update y aplica actualizaciones pendientes.",
      "Revisa compatibilidad del equipo desde la herramienta oficial de Microsoft si está disponible.",
      "Libera espacio en disco.",
      "Inicia la actualización desde Windows Update cuando aparezca como disponible."
    ],
    verification: [
      "winver debe mostrar Windows 11.",
      "Windows Update no debe mostrar errores pendientes.",
      "Los drivers principales deben aparecer sin alerta en Administrador de dispositivos."
    ],
    commands: [
      { label: "Ver versión instalada", value: "winver", language: "cmd" }
    ],
    references: [microsoftActivation],
    relatedSlugs: [
      "como-reparar-windows-update",
      "como-conocer-la-version-y-compilacion-de-windows"
    ]
  }),
  buildArticle({
    title: "Cómo conocer la versión y compilación de Windows",
    slug: "como-conocer-la-version-y-compilacion-de-windows",
    summary:
      "Encuentra rápidamente la versión, edición y compilación de Windows para soporte o compatibilidad.",
    categorySlug: "windows",
    tags: ["windows", "winver", "versión"],
    keywords: ["winver", "version windows", "compilacion windows"],
    symptoms: [
      "Un instalador pide una compilación mínima.",
      "Soporte técnico solicita la edición de Windows.",
      "No sabes si tienes Windows 10 u 11 actualizado."
    ],
    causes: [
      "Información del sistema no visible a simple vista.",
      "Actualizaciones semestrales o acumulativas pendientes."
    ],
    commands: [
      {
        label: "Abrir información de versión",
        value: "winver",
        language: "cmd"
      },
      {
        label: "Ver información por consola",
        value: 'systeminfo | findstr /B /C:"OS Name" /C:"OS Version"',
        language: "cmd"
      }
    ],
    steps: [
      "Presiona Windows + R.",
      "Escribe winver y pulsa Enter.",
      "Anota versión y compilación.",
      "Para más detalle, abre Configuración > Sistema > Acerca de.",
      "Comparte solo la información necesaria, no números de serie."
    ],
    verification: [
      "Tienes edición, versión y compilación documentadas.",
      "Puedes comparar esa compilación con el requisito del software."
    ],
    relatedSlugs: ["como-actualizar-windows-10-a-windows-11"]
  }),
  buildArticle({
    title: "Cómo reparar Windows Update",
    slug: "como-reparar-windows-update",
    summary:
      "Pasos seguros para diagnosticar y reparar problemas comunes de Windows Update.",
    categorySlug: "windows",
    tags: ["windows update", "actualizaciones", "reparación"],
    keywords: ["reparar windows update", "0x80070002", "windows update error"],
    symptoms: [
      "Actualizaciones se quedan descargando.",
      "Aparecen códigos de error.",
      "Windows pide reiniciar una y otra vez."
    ],
    causes: [
      "Caché de actualización dañada.",
      "Servicios detenidos.",
      "Componentes de sistema dañados.",
      "Conexión o proxy bloqueando descargas."
    ],
    commands: [
      {
        label: "Solucionador desde configuración",
        value: "ms-settings:troubleshoot",
        language: "cmd"
      },
      {
        label: "DISM antes de SFC",
        value: "DISM.exe /Online /Cleanup-image /Restorehealth",
        language: "cmd"
      },
      { label: "SFC", value: "sfc /scannow", language: "cmd" }
    ],
    steps: [
      "Reinicia el equipo.",
      "Ejecuta el solucionador de problemas de Windows Update.",
      "Verifica fecha, hora y conexión.",
      "Ejecuta DISM y luego SFC en consola de administrador.",
      "Revisa nuevamente Windows Update."
    ],
    alternatives: [
      "Pausar y reanudar actualizaciones.",
      "Probar otra red si hay proxy o firewall.",
      "Consultar el historial de actualizaciones para identificar la KB que falla."
    ],
    verification: [
      "Windows Update completa búsqueda sin error.",
      "La actualización se instala o cambia de estado.",
      "No aparecen errores nuevos después del reinicio."
    ],
    references: [microsoftSfc],
    relatedSlugs: [
      "como-ejecutar-sfc-y-dism-correctamente",
      "como-limpiar-la-cache-dns"
    ]
  }),
  buildArticle({
    title: "Cómo ejecutar SFC y DISM correctamente",
    slug: "como-ejecutar-sfc-y-dism-correctamente",
    summary:
      "Orden recomendado para usar DISM y SFC cuando Windows tiene archivos dañados.",
    categorySlug: "windows",
    tags: ["sfc", "dism", "reparación", "cmd"],
    keywords: ["sfc scannow", "dism restorehealth", "reparar archivos windows"],
    difficulty: "intermedio",
    symptoms: [
      "Windows se congela.",
      "Aplicaciones del sistema no abren.",
      "Windows Update falla.",
      "Aparecen errores de archivos corruptos."
    ],
    causes: [
      "Archivos protegidos dañados.",
      "Apagados inesperados.",
      "Actualizaciones incompletas.",
      "Problemas de disco o antivirus interfiriendo."
    ],
    commands: [
      {
        label: "Reparar imagen de Windows",
        value: "DISM.exe /Online /Cleanup-image /Restorehealth",
        language: "cmd"
      },
      {
        label: "Escanear archivos del sistema",
        value: "sfc /scannow",
        language: "cmd"
      },
      {
        label: "Extraer detalles SFC",
        value:
          'findstr /c:"[SR]" %windir%\\Logs\\CBS\\CBS.log > "%userprofile%\\Desktop\\sfcdetails.txt"',
        language: "cmd"
      }
    ],
    steps: [
      "Abre CMD como administrador.",
      "Ejecuta DISM y espera a que termine.",
      "Ejecuta sfc /scannow.",
      "Reinicia si SFC reparó archivos.",
      "Si no pudo reparar, revisa CBS.log o considera reparación in-place."
    ],
    warnings: [
      "No cierres la ventana durante la verificación.",
      "No borres WinSxS manualmente."
    ],
    verification: [
      "SFC muestra que no encontró infracciones o que reparó archivos.",
      "El problema original deja de reproducirse.",
      "Windows Update funciona después de reiniciar."
    ],
    references: [microsoftSfc],
    relatedSlugs: ["como-reparar-windows-update"]
  }),
  buildArticle({
    title: "Cómo habilitar la impresión a doble cara por defecto",
    slug: "como-habilitar-la-impresion-a-doble-cara-por-defecto",
    summary:
      "Configura dúplex como preferencia predeterminada para ahorrar papel en Windows.",
    categorySlug: "impresoras",
    tags: ["impresoras", "doble cara", "duplex"],
    keywords: [
      "impresion doble cara",
      "duplex default",
      "preferencias impresora"
    ],
    symptoms: [
      "Cada documento sale a una cara.",
      "La opción doble cara aparece pero no queda guardada.",
      "Usuarios deben cambiar la preferencia manualmente."
    ],
    causes: [
      "Preferencia configurada solo en la aplicación.",
      "Driver genérico sin dúplex.",
      "Impresora compartida con valores heredados."
    ],
    steps: [
      "Abre Configuración > Bluetooth y dispositivos > Impresoras y escáneres.",
      "Selecciona la impresora.",
      "Entra en Preferencias de impresión.",
      "Activa imprimir por ambas caras o dúplex.",
      "Guarda los cambios como predeterminados."
    ],
    alternatives: [
      "Configurar dúplex desde Panel de control clásico.",
      "Actualizar el driver del fabricante.",
      "Revisar preferencias en el servidor de impresión si es compartida."
    ],
    verification: [
      "Imprime una página de prueba o documento corto.",
      "La opción doble cara aparece activada al abrir Preferencias.",
      "No cambia al reiniciar la aplicación."
    ],
    relatedSlugs: ["como-comprobar-si-un-puerto-esta-abierto"]
  }),
  buildArticle({
    title: "Cómo cambiar puntos por comas en Windows y Excel",
    slug: "como-cambiar-puntos-por-comas-en-windows-y-excel",
    summary:
      "Ajusta separadores decimales y de lista cuando Excel interpreta números incorrectamente.",
    categorySlug: "excel",
    tags: ["excel", "regional", "decimales"],
    keywords: [
      "puntos por comas excel",
      "separador decimal",
      "configuracion regional"
    ],
    symptoms: [
      "Excel trata números como texto.",
      "Los decimales usan punto en vez de coma.",
      "CSV se abre en una sola columna."
    ],
    causes: [
      "Configuración regional distinta al formato del archivo.",
      "Excel usa separadores del sistema.",
      "El CSV usa delimitadores incompatibles."
    ],
    steps: [
      "En Windows abre Configuración > Hora e idioma > Idioma y región.",
      "Revisa Formato regional.",
      "En Configuración regional adicional cambia símbolo decimal y separador de listas si corresponde.",
      "En Excel revisa Archivo > Opciones > Avanzadas > Usar separadores del sistema.",
      "Vuelve a abrir el archivo."
    ],
    alternatives: [
      "Importar el CSV desde Datos > Desde texto/CSV.",
      "Cambiar temporalmente el separador solo en Excel.",
      "Solicitar el archivo con formato regional correcto."
    ],
    verification: [
      "Excel calcula los números correctamente.",
      "Los CSV se separan en columnas.",
      "Las fórmulas no quedan como texto."
    ],
    relatedSlugs: ["como-comprobar-que-version-de-office-esta-instalada"]
  }),
  buildArticle({
    title: "Cómo conocer la dirección IP del equipo",
    slug: "como-conocer-la-direccion-ip-del-equipo",
    summary:
      "Encuentra la IP local del equipo desde Configuración, CMD o PowerShell.",
    categorySlug: "redes",
    tags: ["ip", "redes", "cmd", "powershell"],
    keywords: ["ipconfig", "direccion ip equipo", "ip local"],
    symptoms: [
      "Necesitas conectar otro dispositivo.",
      "Soporte solicita tu IP.",
      "No sabes si estás en la red correcta."
    ],
    causes: [
      "El equipo usa DHCP.",
      "Hay varios adaptadores.",
      "VPN o máquinas virtuales agregan interfaces."
    ],
    commands: [
      { label: "CMD", value: "ipconfig", language: "cmd" },
      {
        label: "PowerShell",
        value: "Get-NetIPAddress -AddressFamily IPv4",
        language: "powershell"
      }
    ],
    steps: [
      "Abre CMD.",
      "Ejecuta ipconfig.",
      "Busca el adaptador activo: Wi-Fi o Ethernet.",
      "Anota Dirección IPv4 y Puerta de enlace predeterminada.",
      "Ignora adaptadores virtuales si no los estás usando."
    ],
    verification: [
      "La IP pertenece al rango de tu red.",
      "La puerta de enlace coincide con la IP del router.",
      "Puedes hacer ping al router."
    ],
    relatedSlugs: [
      "como-saber-la-ip-del-router",
      "como-hacer-ping-y-traceroute"
    ]
  }),
  buildArticle({
    title: "Cómo abrir CMD y PowerShell como administrador",
    slug: "como-abrir-cmd-y-powershell-como-administrador",
    summary:
      "Diferencia entre consola normal y elevada, y cómo abrirla con permisos administrativos.",
    categorySlug: "powershell",
    tags: ["cmd", "powershell", "administrador"],
    keywords: [
      "abrir cmd administrador",
      "powershell administrador",
      "terminal elevada"
    ],
    symptoms: [
      "Un comando dice Acceso denegado.",
      "DISM o SFC no se ejecutan.",
      "No puedes cambiar configuración de red."
    ],
    causes: [
      "La consola está abierta sin privilegios elevados.",
      "La cuenta no pertenece al grupo Administradores.",
      "Una política de empresa bloquea elevación."
    ],
    steps: [
      "Abre Inicio.",
      "Escribe CMD, PowerShell o Terminal.",
      "Haz clic derecho y elige Ejecutar como administrador.",
      "Acepta UAC si confías en la acción.",
      "Confirma que el título indique Administrador."
    ],
    alternatives: [
      "Usar Windows Terminal como administrador.",
      "Usar el menú Win + X.",
      "Pedir credenciales de administrador si el equipo es gestionado."
    ],
    verification: [
      "Los comandos que requieren elevación ya no muestran Acceso denegado.",
      "La ventana indica Administrador en el título."
    ],
    relatedSlugs: ["como-ejecutar-sfc-y-dism-correctamente"]
  }),
  buildArticle({
    title: "Cómo crear un perfil nuevo de Outlook",
    slug: "como-crear-un-perfil-nuevo-de-outlook",
    summary:
      "Crea un perfil limpio de Outlook para aislar problemas de configuración o datos locales.",
    categorySlug: "outlook",
    tags: ["outlook", "perfil", "microsoft 365"],
    keywords: [
      "crear perfil outlook",
      "outlook profiles",
      "mail control panel"
    ],
    symptoms: [
      "Outlook pide credenciales repetidamente.",
      "No sincroniza correctamente.",
      "Un buzón abre en otro equipo pero no en este."
    ],
    causes: [
      "Perfil de Outlook dañado.",
      "Archivo OST problemático.",
      "Configuración antigua o complementos."
    ],
    commands: [
      {
        label: "Abrir selector de perfiles",
        value: "Outlook.exe /profiles",
        language: "cmd"
      }
    ],
    steps: [
      "Cierra Outlook.",
      "Ejecuta Outlook.exe /profiles o mantén Shift al abrir Outlook.",
      "Elige Opciones y luego Nuevo.",
      "Escribe un nombre claro para el perfil.",
      "Agrega la cuenta y prueba abrir Outlook con ese perfil."
    ],
    alternatives: [
      "Usar Panel de control > Mail > Mostrar perfiles.",
      "Configurar que Outlook pregunte qué perfil usar.",
      "Mantener el perfil anterior hasta confirmar que no faltan datos."
    ],
    verification: [
      "Outlook abre sin el error anterior.",
      "El buzón sincroniza y envía correos.",
      "El perfil nuevo aparece en el selector."
    ],
    references: [outlookProfiles],
    relatedSlugs: ["outlook-no-abre-causas-y-soluciones"]
  }),
  buildArticle({
    title: "Outlook no abre: causas y soluciones",
    slug: "outlook-no-abre-causas-y-soluciones",
    summary:
      "Diagnóstico rápido cuando Outlook se queda procesando, no responde o muestra errores al iniciar.",
    categorySlug: "outlook",
    tags: ["outlook", "no abre", "office"],
    keywords: [
      "outlook no abre",
      "cannot start microsoft outlook",
      "processing"
    ],
    symptoms: [
      "Outlook se queda en Procesando.",
      "Aparece No se puede iniciar Microsoft Outlook.",
      "La ventana abre y se cierra."
    ],
    causes: [
      "Complemento defectuoso.",
      "Perfil dañado.",
      "Archivo de datos corrupto.",
      "Office pendiente de reparar o actualizar."
    ],
    commands: [
      { label: "Modo seguro", value: "outlook.exe /safe", language: "cmd" },
      {
        label: "Selector de perfiles",
        value: "outlook.exe /profiles",
        language: "cmd"
      }
    ],
    steps: [
      "Abre Outlook en modo seguro.",
      "Si funciona, deshabilita complementos no esenciales.",
      "Crea un perfil nuevo si el problema continúa.",
      "Ejecuta reparación de Office.",
      "Reinicia y prueba con el perfil nuevo."
    ],
    verification: [
      "Outlook abre normalmente.",
      "Enviar y recibir funciona.",
      "No se reproduce el error con complementos deshabilitados."
    ],
    references: [outlookProfiles, outlookRepairProfile],
    relatedSlugs: [
      "como-crear-un-perfil-nuevo-de-outlook",
      "como-reparar-microsoft-office"
    ]
  }),
  buildArticle({
    title: "Cómo reparar Microsoft Office",
    slug: "como-reparar-microsoft-office",
    summary:
      "Usa reparación rápida o en línea cuando Word, Excel, Outlook o Teams fallan.",
    categorySlug: "microsoft-365",
    tags: ["office", "microsoft 365", "reparación"],
    keywords: ["reparar office", "repair microsoft office", "office no abre"],
    symptoms: [
      "Aplicaciones de Office no abren.",
      "Office se cierra inesperadamente.",
      "Outlook o Excel muestran errores recurrentes."
    ],
    causes: [
      "Archivos de Office dañados.",
      "Actualización incompleta.",
      "Complementos conflictivos.",
      "Perfil de usuario con configuración dañada."
    ],
    steps: [
      "Cierra aplicaciones de Office.",
      "Abre Configuración > Aplicaciones > Aplicaciones instaladas.",
      "Busca Microsoft 365 u Office.",
      "Elige Modificar y prueba Reparación rápida.",
      "Si no funciona, usa Reparación en línea con conexión estable."
    ],
    alternatives: [
      "Actualizar Office antes de reparar.",
      "Probar el modo seguro de la aplicación.",
      "Crear un perfil nuevo de Outlook si solo falla Outlook."
    ],
    verification: [
      "La aplicación abre sin error.",
      "Office muestra producto activado.",
      "No aparecen reparaciones pendientes."
    ],
    references: [outlookRepairProfile],
    relatedSlugs: ["outlook-no-abre-causas-y-soluciones"]
  }),
  buildArticle({
    title: "Cómo comprobar qué versión de Office está instalada",
    slug: "como-comprobar-que-version-de-office-esta-instalada",
    summary:
      "Identifica versión, canal y arquitectura de Office para soporte o compatibilidad.",
    categorySlug: "microsoft-365",
    tags: ["office", "versión", "microsoft 365"],
    keywords: ["version office", "office 32 64 bits", "microsoft 365 version"],
    symptoms: [
      "Un complemento pide Office de 64 bits.",
      "Soporte solicita canal de actualización.",
      "No sabes si Office está actualizado."
    ],
    causes: [
      "Diferentes canales de Microsoft 365.",
      "Instalaciones antiguas de Office.",
      "Arquitectura 32/64 bits distinta a la esperada."
    ],
    steps: [
      "Abre Word, Excel u Outlook.",
      "Ve a Archivo > Cuenta.",
      "Revisa Acerca de la aplicación.",
      "Anota versión, compilación y arquitectura.",
      "Revisa Opciones de actualización si necesitas actualizar."
    ],
    verification: [
      "Tienes versión y compilación documentadas.",
      "La arquitectura coincide con el requisito del complemento."
    ],
    relatedSlugs: ["como-reparar-microsoft-office"]
  }),
  buildArticle({
    title: "Cómo configurar una firma en Outlook",
    slug: "como-configurar-una-firma-en-outlook",
    summary:
      "Crea una firma de correo clara y asígnala a mensajes nuevos y respuestas.",
    categorySlug: "outlook",
    tags: ["outlook", "firma", "correo"],
    keywords: ["firma outlook", "signature outlook", "microsoft 365"],
    symptoms: [
      "Los correos salen sin firma.",
      "La firma se pierde al responder.",
      "El logo no se ve correctamente."
    ],
    causes: [
      "Firma no asignada a la cuenta.",
      "Formato copiado desde Word con estilos pesados.",
      "Imagen enlazada desde una ruta local."
    ],
    steps: [
      "Abre Outlook.",
      "Ve a Archivo > Opciones > Correo > Firmas.",
      "Crea una firma con nombre claro.",
      "Asigna la firma a mensajes nuevos y respuestas.",
      "Envía un correo de prueba."
    ],
    alternatives: [
      "Usar texto simple si hay problemas de formato.",
      "Alojar imágenes en una URL confiable.",
      "Solicitar firma corporativa al administrador."
    ],
    verification: [
      "La firma aparece en correos nuevos.",
      "La respuesta conserva formato legible.",
      "El destinatario ve imágenes o enlaces correctamente."
    ],
    relatedSlugs: ["como-crear-un-perfil-nuevo-de-outlook"]
  }),
  buildArticle({
    title: "Cómo limpiar la caché de Microsoft Teams",
    slug: "como-limpiar-la-cache-de-microsoft-teams",
    summary:
      "Soluciona carga lenta, sesión dañada o problemas visuales limpiando caché local de Teams.",
    categorySlug: "microsoft-365",
    tags: ["teams", "cache", "microsoft 365"],
    keywords: ["limpiar cache teams", "teams lento", "teams no carga"],
    symptoms: [
      "Teams queda cargando.",
      "Los chats no actualizan.",
      "Aparecen errores visuales o sesión inconsistente."
    ],
    causes: [
      "Caché local dañada.",
      "Sesión antigua.",
      "Actualización incompleta.",
      "Conectividad temporal."
    ],
    steps: [
      "Cierra Teams completamente desde el área de notificación.",
      "Abre Configuración de Windows > Aplicaciones.",
      "Busca Microsoft Teams y usa opciones avanzadas si tu versión permite restablecer.",
      "Vuelve a iniciar sesión.",
      "Si usas Teams clásico, consulta rutas de caché según versión antes de borrar carpetas."
    ],
    alternatives: [
      "Probar Teams web.",
      "Actualizar Teams.",
      "Reiniciar el equipo si el proceso queda abierto."
    ],
    verification: [
      "Teams abre y sincroniza chats.",
      "No aparece el error anterior.",
      "La versión queda actualizada."
    ],
    relatedSlugs: ["como-reparar-microsoft-office"]
  }),
  buildArticle({
    title: "Cómo actualizar Google Chrome",
    slug: "como-actualizar-google-chrome",
    summary:
      "Actualiza Chrome desde el propio navegador y verifica que quedó en la versión más reciente disponible.",
    categorySlug: "google-chrome",
    tags: ["chrome", "actualización", "navegador"],
    keywords: ["actualizar chrome", "google chrome update", "chrome version"],
    symptoms: [
      "Chrome muestra aviso de actualización.",
      "Una web pide navegador actualizado.",
      "Extensiones fallan por versión antigua."
    ],
    causes: [
      "Chrome no se reinició tras descargar actualización.",
      "Google Update está bloqueado.",
      "Permisos o políticas impiden actualizar."
    ],
    steps: [
      "Abre Chrome.",
      "Ve al menú de tres puntos > Ayuda > Información de Google Chrome.",
      "Espera la búsqueda de actualizaciones.",
      "Reinicia Chrome cuando lo pida.",
      "Vuelve a la misma pantalla para confirmar."
    ],
    alternatives: [
      "Descargar el instalador oficial si Google Update falla.",
      "Consultar políticas de empresa si el navegador es administrado.",
      "Probar Chrome sin extensiones si el fallo era de carga."
    ],
    verification: [
      "Información de Chrome indica que está actualizado.",
      "El aviso de actualización desaparece.",
      "La web que pedía versión nueva carga correctamente."
    ],
    references: [chromeErrors],
    relatedSlugs: [
      "chrome-no-abre-soluciones",
      "como-borrar-la-cache-del-navegador-correctamente"
    ]
  }),
  buildArticle({
    title: "Cómo actualizar Microsoft Edge",
    slug: "como-actualizar-microsoft-edge",
    summary:
      "Revisa actualizaciones de Edge, reinicia el navegador y valida la versión instalada.",
    categorySlug: "microsoft-edge",
    tags: ["edge", "actualización", "navegador"],
    keywords: ["actualizar edge", "microsoft edge version", "edge update"],
    symptoms: [
      "Edge pide actualizar.",
      "Sitios web no cargan funciones recientes.",
      "La política de empresa administra el navegador."
    ],
    causes: [
      "Actualización descargada sin reiniciar.",
      "Servicio de actualización bloqueado.",
      "Canal administrado por organización."
    ],
    steps: [
      "Abre Edge.",
      "Ve a Configuración y más > Ayuda y comentarios > Acerca de Microsoft Edge.",
      "Espera la comprobación.",
      "Reinicia Edge si lo solicita.",
      "Repite la comprobación."
    ],
    alternatives: [
      "Usar Windows Update.",
      "Descargar instalador oficial de Microsoft Edge.",
      "Consultar políticas si aparece administrado por la organización."
    ],
    verification: [
      "La pantalla Acerca de indica que Edge está actualizado.",
      "No queda aviso de reinicio pendiente."
    ],
    relatedSlugs: ["como-borrar-la-cache-del-navegador-correctamente"]
  }),
  buildArticle({
    title: "Chrome no abre: soluciones",
    slug: "chrome-no-abre-soluciones",
    summary:
      "Pasos prácticos cuando Chrome no inicia, se cierra solo o queda en pantalla blanca.",
    categorySlug: "google-chrome",
    tags: ["chrome", "no abre", "navegador"],
    keywords: ["chrome no abre", "chrome se cierra", "aw snap"],
    symptoms: [
      "Chrome no muestra ventana.",
      "Se cierra inmediatamente.",
      "Solo abre una pantalla en blanco."
    ],
    causes: [
      "Extensión o perfil dañado.",
      "Proceso bloqueado en segundo plano.",
      "Antivirus o política bloqueando Chrome.",
      "Instalación dañada."
    ],
    commands: [
      {
        label: "Abrir Chrome sin extensiones",
        value: "chrome.exe --disable-extensions",
        language: "cmd"
      }
    ],
    steps: [
      "Cierra procesos de Chrome desde Administrador de tareas.",
      "Intenta abrir Chrome de nuevo.",
      "Prueba sin extensiones.",
      "Crea o prueba otro perfil.",
      "Actualiza o reinstala desde fuente oficial si el problema continúa."
    ],
    alternatives: [
      "Restablecer configuración de Chrome.",
      "Probar modo incógnito.",
      "Revisar antivirus o políticas de empresa."
    ],
    verification: [
      "Chrome abre una ventana normal.",
      "Puedes navegar sin cierre inesperado.",
      "Las extensiones conflictivas quedan identificadas."
    ],
    references: [chromeErrors],
    relatedSlugs: ["como-actualizar-google-chrome"]
  }),
  buildArticle({
    title: "Cómo borrar la caché del navegador correctamente",
    slug: "como-borrar-la-cache-del-navegador-correctamente",
    summary:
      "Borra caché, cookies o datos específicos sin eliminar más información de la necesaria.",
    categorySlug: "google-chrome",
    tags: ["cache", "chrome", "edge", "navegador"],
    keywords: [
      "borrar cache navegador",
      "limpiar cookies",
      "clear browsing data"
    ],
    symptoms: [
      "Una web muestra información antigua.",
      "Inicio de sesión falla.",
      "La página carga con estilos rotos."
    ],
    causes: [
      "Archivos estáticos cacheados.",
      "Cookies dañadas.",
      "Datos de sitio inconsistentes.",
      "Cambios recientes en la web."
    ],
    steps: [
      "Prueba recargar con Ctrl + F5.",
      "Borra datos solo del sitio si el problema afecta una web.",
      "Si necesitas borrar todo, abre configuración de privacidad.",
      "Selecciona caché y cookies con un intervalo razonable.",
      "Vuelve a iniciar sesión si borraste cookies."
    ],
    alternatives: [
      "Probar modo incógnito.",
      "Usar otro navegador para comparar.",
      "Borrar solo permisos del sitio afectado."
    ],
    verification: [
      "La web carga recursos actualizados.",
      "El error desaparece en sesión normal.",
      "No se eliminaron contraseñas si no marcaste esa opción."
    ],
    references: [chromeErrors],
    relatedSlugs: ["chrome-no-abre-soluciones"]
  }),
  buildArticle({
    title: "Cómo saber la IP del router",
    slug: "como-saber-la-ip-del-router",
    summary:
      "Encuentra la puerta de enlace predeterminada para acceder al router o diagnosticar la red.",
    categorySlug: "routers",
    tags: ["router", "ip", "gateway"],
    keywords: ["ip router", "puerta de enlace", "default gateway"],
    symptoms: [
      "Necesitas entrar al router.",
      "No sabes qué IP usar en el navegador.",
      "La red no navega pero WiFi conecta."
    ],
    causes: [
      "Router con IP distinta a la común.",
      "VPN o adaptador virtual confundiendo la lectura.",
      "DHCP entregando otra puerta de enlace."
    ],
    commands: [
      { label: "Ver puerta de enlace", value: "ipconfig", language: "cmd" },
      {
        label: "PowerShell",
        value: "Get-NetIPConfiguration",
        language: "powershell"
      }
    ],
    steps: [
      "Abre CMD.",
      "Ejecuta ipconfig.",
      "Busca el adaptador activo.",
      "Copia Puerta de enlace predeterminada.",
      "Abre esa IP en el navegador si necesitas entrar al panel."
    ],
    verification: [
      "La IP responde a ping o abre una página del router.",
      "Coincide con el gateway del adaptador activo."
    ],
    relatedSlugs: ["como-conocer-la-direccion-ip-del-equipo"]
  }),
  buildArticle({
    title: "Cómo renovar la dirección IP con CMD",
    slug: "como-renovar-la-direccion-ip-con-cmd",
    summary:
      "Libera y solicita una nueva IP DHCP cuando la red queda con configuración inválida.",
    categorySlug: "cmd",
    tags: ["cmd", "dhcp", "ipconfig"],
    keywords: ["ipconfig release renew", "renovar ip", "dhcp"],
    symptoms: [
      "Sin internet aunque hay WiFi.",
      "IP comienza por 169.254.",
      "El equipo no recibe gateway."
    ],
    causes: [
      "Lease DHCP vencido o corrupto.",
      "Router sin entregar IP.",
      "Adaptador con estado inconsistente."
    ],
    commands: [
      { label: "Liberar IP", value: "ipconfig /release", language: "cmd" },
      { label: "Renovar IP", value: "ipconfig /renew", language: "cmd" }
    ],
    steps: [
      "Abre CMD como administrador.",
      "Ejecuta ipconfig /release.",
      "Espera a que libere la IP.",
      "Ejecuta ipconfig /renew.",
      "Revisa ipconfig para confirmar IP, máscara y gateway."
    ],
    alternatives: [
      "Desactivar y activar el adaptador.",
      "Reiniciar router.",
      "Probar otro cable o red."
    ],
    verification: [
      "La IP ya no es 169.254.",
      "Hay puerta de enlace.",
      "Puedes hacer ping al router y navegar."
    ],
    relatedSlugs: ["como-saber-la-ip-del-router", "como-limpiar-la-cache-dns"]
  }),
  buildArticle({
    title: "Cómo limpiar la caché DNS",
    slug: "como-limpiar-la-cache-dns",
    summary:
      "Usa ipconfig /flushdns cuando un dominio resuelve mal o cambió recientemente.",
    categorySlug: "dns",
    tags: ["dns", "cmd", "cache"],
    keywords: ["flushdns", "limpiar dns", "cache dns"],
    symptoms: [
      "Un sitio abre en otro equipo pero no en este.",
      "DNS apunta a una IP antigua.",
      "Después de cambiar DNS el problema sigue."
    ],
    causes: [
      "Registro DNS cacheado localmente.",
      "Servidor DNS lento o desactualizado.",
      "VPN alterando resolución."
    ],
    commands: [
      {
        label: "Limpiar caché DNS",
        value: "ipconfig /flushdns",
        language: "cmd"
      }
    ],
    steps: [
      "Abre CMD como administrador.",
      "Ejecuta ipconfig /flushdns.",
      "Cierra y abre el navegador.",
      "Prueba el dominio de nuevo.",
      "Si sigue fallando, cambia temporalmente DNS o prueba otra red."
    ],
    verification: [
      "El comando confirma limpieza de caché.",
      "El dominio resuelve correctamente.",
      "El navegador carga sin error DNS."
    ],
    relatedSlugs: ["como-cambiar-los-servidores-dns"]
  }),
  buildArticle({
    title: "Cómo comprobar si un puerto está abierto",
    slug: "como-comprobar-si-un-puerto-esta-abierto",
    summary:
      "Valida conectividad a un puerto TCP con PowerShell antes de culpar a la aplicación.",
    categorySlug: "redes",
    tags: ["puertos", "powershell", "firewall"],
    keywords: ["test-netconnection", "puerto abierto", "tcp"],
    difficulty: "intermedio",
    symptoms: [
      "Una app no conecta al servidor.",
      "El firewall podría bloquear el puerto.",
      "No sabes si el servicio escucha."
    ],
    causes: [
      "Servicio detenido.",
      "Firewall local o perimetral.",
      "Puerto equivocado.",
      "DNS resolviendo a IP incorrecta."
    ],
    commands: [
      {
        label: "Probar puerto TCP",
        value: "Test-NetConnection servidor.ejemplo.com -Port 443",
        language: "powershell"
      }
    ],
    steps: [
      "Identifica host y puerto.",
      "Abre PowerShell.",
      "Ejecuta Test-NetConnection con el puerto.",
      "Revisa TcpTestSucceeded.",
      "Si falla, prueba por IP y luego por nombre DNS."
    ],
    alternatives: [
      "Usar telnet si está instalado.",
      "Probar desde otra red.",
      "Revisar firewall del servidor."
    ],
    verification: [
      "TcpTestSucceeded aparece True.",
      "La aplicación conecta al mismo host y puerto.",
      "El servicio responde en el servidor."
    ],
    relatedSlugs: ["como-hacer-ping-y-traceroute"]
  }),
  buildArticle({
    title: "Cómo hacer ping y traceroute",
    slug: "como-hacer-ping-y-traceroute",
    summary:
      "Usa ping y tracert para diferenciar cortes locales, DNS y saltos de red problemáticos.",
    categorySlug: "redes",
    tags: ["ping", "traceroute", "redes", "cmd"],
    keywords: ["ping", "tracert", "traceroute", "latencia"],
    symptoms: [
      "Internet lento.",
      "Un servidor no responde.",
      "La conexión falla en una ruta específica."
    ],
    causes: [
      "Pérdida de paquetes.",
      "DNS incorrecto.",
      "Firewall bloqueando ICMP.",
      "Ruta intermedia con latencia alta."
    ],
    commands: [
      { label: "Ping", value: "ping 8.8.8.8", language: "cmd" },
      {
        label: "Traceroute Windows",
        value: "tracert ejemplo.com",
        language: "cmd"
      }
    ],
    steps: [
      "Haz ping a la puerta de enlace.",
      "Haz ping a una IP pública confiable.",
      "Haz ping al dominio.",
      "Ejecuta tracert al destino.",
      "Compara si falla por DNS, red local o ruta externa."
    ],
    verification: [
      "La puerta de enlace responde.",
      "El dominio resuelve si ping por nombre funciona.",
      "Traceroute muestra hasta dónde llega la conexión."
    ],
    relatedSlugs: ["como-saber-la-ip-del-router", "como-limpiar-la-cache-dns"]
  }),
  buildArticle({
    title: "Cómo cambiar los servidores DNS",
    slug: "como-cambiar-los-servidores-dns",
    summary:
      "Cambia DNS de forma controlada en Windows cuando la resolución de nombres falla.",
    categorySlug: "dns",
    tags: ["dns", "windows", "redes"],
    keywords: ["cambiar dns", "dns windows", "servidores dns"],
    difficulty: "intermedio",
    symptoms: [
      "Algunos sitios no abren.",
      "El error menciona DNS.",
      "La red conecta pero no resuelve nombres."
    ],
    causes: [
      "DNS del proveedor con problemas.",
      "Router entregando DNS incorrecto.",
      "VPN o política alterando resolución."
    ],
    steps: [
      "Anota los DNS actuales.",
      "Abre Configuración > Red e Internet.",
      "Selecciona el adaptador activo.",
      "Edita DNS y coloca servidores confiables aprobados por tu organización.",
      "Limpia caché DNS y prueba."
    ],
    alternatives: [
      "Cambiar DNS en el router.",
      "Usar DNS automático si estás en una empresa.",
      "Probar otra red antes de cambiar configuración permanente."
    ],
    commands: [
      {
        label: "Limpiar después del cambio",
        value: "ipconfig /flushdns",
        language: "cmd"
      }
    ],
    verification: [
      "nslookup resuelve dominios.",
      "Los sitios abren.",
      "No hay fuga de DNS si usas VPN corporativa."
    ],
    relatedSlugs: ["como-limpiar-la-cache-dns"]
  }),
  buildArticle({
    title: "Cómo comprobar el estado de Microsoft Defender",
    slug: "como-comprobar-el-estado-de-microsoft-defender",
    summary:
      "Revisa protección en tiempo real, historial y alertas desde Seguridad de Windows.",
    categorySlug: "ciberseguridad",
    tags: ["defender", "windows security", "antivirus"],
    keywords: [
      "microsoft defender estado",
      "windows security",
      "antivirus windows"
    ],
    symptoms: [
      "Quieres confirmar si el antivirus está activo.",
      "Aparece un icono amarillo o rojo.",
      "Un archivo fue bloqueado."
    ],
    causes: [
      "Protección desactivada.",
      "Otro antivirus tomó control.",
      "Amenaza pendiente de acción.",
      "Política de empresa administra Defender."
    ],
    commands: [
      {
        label: "Abrir Seguridad de Windows",
        value: "windowsdefender:",
        language: "cmd"
      }
    ],
    steps: [
      "Abre Seguridad de Windows.",
      "Revisa Protección antivirus y contra amenazas.",
      "Confirma protección en tiempo real.",
      "Abre Historial de protección si hay alertas.",
      "Actualiza inteligencia de seguridad si está desactualizada."
    ],
    verification: [
      "Los indicadores aparecen en verde o con acciones claras.",
      "No hay amenazas pendientes.",
      "La protección en tiempo real está activa si no usas otro antivirus."
    ],
    references: [windowsSecurity],
    relatedSlugs: ["por-que-microsoft-defender-aparece-desactivado"]
  }),
  buildArticle({
    title: "Por qué Microsoft Defender aparece desactivado",
    slug: "por-que-microsoft-defender-aparece-desactivado",
    summary:
      "Causas comunes cuando Defender se muestra apagado y cómo diferenciar una configuración normal de un riesgo.",
    categorySlug: "ciberseguridad",
    tags: ["defender", "antivirus", "seguridad"],
    keywords: [
      "defender desactivado",
      "windows security disabled",
      "antivirus"
    ],
    symptoms: [
      "Windows Security dice que Defender está desactivado.",
      "No puedes activar protección en tiempo real.",
      "Aparece administrado por la organización."
    ],
    causes: [
      "Otro antivirus activo.",
      "Política corporativa.",
      "Servicio detenido.",
      "Malware o configuración dañada."
    ],
    steps: [
      "Revisa si hay otro antivirus instalado y activo.",
      "Comprueba si el equipo pertenece a una organización.",
      "Abre Seguridad de Windows y revisa acciones recomendadas.",
      "Actualiza Windows.",
      "Si no hay antivirus alternativo, investiga servicios y políticas antes de navegar."
    ],
    alternatives: [
      "Desinstalar antivirus de terceros si no lo necesitas.",
      "Consultar al administrador de TI.",
      "Ejecutar análisis sin conexión si sospechas malware."
    ],
    verification: [
      "Hay una solución antivirus activa.",
      "Windows Security no muestra alertas críticas.",
      "La protección en tiempo real queda controlada por una fuente conocida."
    ],
    references: [windowsSecurity],
    relatedSlugs: ["como-comprobar-el-estado-de-microsoft-defender"]
  }),
  buildArticle({
    title: "Cómo generar una contraseña segura",
    slug: "como-generar-una-contrasena-segura",
    summary:
      "Crea contraseñas largas y únicas sin almacenarlas en el navegador de la herramienta.",
    categorySlug: "ciberseguridad",
    tags: ["contraseñas", "seguridad", "password"],
    keywords: [
      "generar contraseña segura",
      "password generator",
      "fortaleza contraseña"
    ],
    symptoms: [
      "Reutilizas la misma contraseña.",
      "Un servicio exige más longitud.",
      "Quieres mejorar seguridad de cuentas."
    ],
    causes: [
      "Contraseñas cortas.",
      "Patrones predecibles.",
      "Reutilización entre sitios.",
      "Sin gestor de contraseñas."
    ],
    steps: [
      "Usa una longitud mínima de 16 caracteres para cuentas importantes.",
      "Combina mayúsculas, minúsculas, números y símbolos cuando el servicio lo permita.",
      "Genera una contraseña única por sitio.",
      "Guárdala en un gestor confiable.",
      "Activa 2FA cuando esté disponible."
    ],
    alternatives: [
      "Usar frases largas con varias palabras aleatorias.",
      "Usar claves de acceso si el servicio las soporta.",
      "Cambiar contraseñas comprometidas inmediatamente."
    ],
    verification: [
      "La contraseña es única.",
      "No contiene datos personales.",
      "El comprobador de fortaleza la clasifica como fuerte."
    ],
    relatedSlugs: ["como-comprobar-si-una-conexion-usa-https"]
  }),
  buildArticle({
    title: "Cómo comprobar si una conexión usa HTTPS",
    slug: "como-comprobar-si-una-conexion-usa-https",
    summary:
      "Verifica si una web cifra la conexión y entiende cuándo una alerta del navegador es importante.",
    categorySlug: "ciberseguridad",
    tags: ["https", "seguridad", "certificados"],
    keywords: ["comprobar https", "candado navegador", "certificado ssl"],
    symptoms: [
      "El navegador muestra No seguro.",
      "Una web carga por HTTP.",
      "Aparece alerta de certificado."
    ],
    causes: [
      "Sitio sin TLS.",
      "Certificado vencido o mal configurado.",
      "Intercepción por proxy corporativo.",
      "Fecha del equipo incorrecta."
    ],
    steps: [
      "Mira la barra de direcciones.",
      "Confirma que la URL empiece por https://.",
      "Haz clic en el icono de seguridad para ver el certificado.",
      "No introduzcas contraseñas si el navegador muestra alerta crítica.",
      "Revisa fecha y hora del equipo si todos los sitios fallan."
    ],
    alternatives: [
      "Probar otra red.",
      "Contactar al dueño del sitio.",
      "Usar herramientas de diagnóstico TLS si administras el dominio."
    ],
    verification: [
      "La URL usa https://.",
      "El certificado es válido para el dominio.",
      "No hay advertencias críticas del navegador."
    ],
    relatedSlugs: ["como-generar-una-contrasena-segura"]
  })
];

export function getArticleBySlug(slug: string) {
  return articles.find(
    (article) => article.slug === slug && article.status === "published"
  );
}
