import type { ErrorEntry } from "@/features/solutions/types";

function buildError(input: Omit<ErrorEntry, "type" | "status">): ErrorEntry {
  return {
    type: "error",
    status: "published",
    ...input
  };
}

export const errorEntries: ErrorEntry[] = [
  buildError({
    code: "0x80070005",
    slug: "0x80070005",
    productSlug: "windows",
    product: "Windows",
    title: "Error 0x80070005: acceso denegado en Windows",
    description:
      "Este error suele indicar permisos insuficientes, bloqueo por políticas o componentes que no pueden escribir donde necesitan.",
    symptoms: [
      "Actualización o activación falla.",
      "Aparece Access denied.",
      "La instalación no puede continuar."
    ],
    probableCauses: [
      "Permisos insuficientes.",
      "Servicio ejecutándose con cuenta incorrecta.",
      "Antivirus o política bloqueando cambios.",
      "Componentes de Windows dañados."
    ],
    diagnosis: [
      "Confirmar la acción que genera el error.",
      "Ejecutar como administrador si corresponde.",
      "Revisar Windows Update o activación según contexto.",
      "Comprobar eventos recientes."
    ],
    recommendedSolution: [
      "Reinicia el equipo.",
      "Ejecuta la acción como administrador.",
      "Si ocurre en Windows Update, usa el solucionador y luego DISM/SFC.",
      "Revisa permisos o políticas si el equipo es corporativo."
    ],
    alternatives: [
      "Probar con otra cuenta administradora.",
      "Desactivar temporalmente herramientas de seguridad solo si TI lo aprueba.",
      "Reparar componentes de Windows."
    ],
    commands: [
      {
        label: "DISM",
        value: "DISM.exe /Online /Cleanup-image /Restorehealth",
        language: "cmd"
      },
      { label: "SFC", value: "sfc /scannow", language: "cmd" }
    ],
    warnings: [
      "No cambies permisos de carpetas del sistema sin respaldo.",
      "En equipos corporativos puede ser una política legítima."
    ],
    affectedVersions: ["Windows 10", "Windows 11", "Windows Server"],
    reviewedAt: "2026-08-04",
    faq: [
      {
        question: "¿Es un virus?",
        answer:
          "No necesariamente. Es un código genérico de acceso denegado y debe diagnosticarse según la acción que lo dispara."
      }
    ],
    references: [
      {
        label: "Get help with Windows activation errors",
        publisher: "Microsoft Support",
        url: "https://support.microsoft.com/en-US/Windows/activation/get-help-with-windows-activation-errors"
      }
    ],
    relatedSlugs: [
      "como-reparar-windows-update",
      "como-ejecutar-sfc-y-dism-correctamente"
    ],
    categorySlug: "windows",
    tags: ["windows", "permisos", "access denied"],
    seo: {
      title: "Error 0x80070005 en Windows: causas y soluciones",
      description:
        "Diagnóstico y soluciones seguras para el error 0x80070005 de acceso denegado en Windows.",
      canonicalPath: "/errores/windows/0x80070005"
    },
    keywords: ["0x80070005", "access denied", "windows update"]
  }),
  buildError({
    code: "0x80004005",
    slug: "0x80004005",
    productSlug: "windows",
    product: "Windows",
    title: "Error 0x80004005: error no especificado",
    description:
      "Código genérico de Windows que puede aparecer en actualizaciones, archivos comprimidos, red o permisos.",
    symptoms: [
      "Mensaje Unspecified error.",
      "Falla al copiar archivos.",
      "Windows Update no completa."
    ],
    probableCauses: [
      "Permisos o bloqueo de archivo.",
      "Componente dañado.",
      "Ruta de red inaccesible.",
      "Archivo comprimido corrupto."
    ],
    diagnosis: [
      "Identificar en qué operación ocurre.",
      "Probar con ruta local.",
      "Revisar permisos.",
      "Ejecutar DISM/SFC si afecta Windows."
    ],
    recommendedSolution: [
      "Repite la acción con permisos adecuados.",
      "Comprueba integridad del archivo o ruta.",
      "Ejecuta mantenimiento del sistema si afecta actualizaciones.",
      "Revisa antivirus o políticas."
    ],
    alternatives: [
      "Usar otra herramienta de descompresión.",
      "Cambiar nombre/ruta corta.",
      "Probar desde otra cuenta."
    ],
    commands: [{ label: "SFC", value: "sfc /scannow", language: "cmd" }],
    warnings: ["No asumas una sola causa: 0x80004005 necesita contexto."],
    affectedVersions: ["Windows 10", "Windows 11"],
    reviewedAt: "2026-08-04",
    faq: [
      {
        question: "¿Por qué dice error no especificado?",
        answer:
          "Porque la capa que muestra el mensaje no recibió un detalle más preciso de la operación que falló."
      }
    ],
    references: [],
    relatedSlugs: ["como-ejecutar-sfc-y-dism-correctamente"],
    categorySlug: "windows",
    tags: ["windows", "error no especificado"],
    seo: {
      title: "Error 0x80004005 en Windows",
      description:
        "Causas probables y pasos de diagnóstico para el error no especificado 0x80004005.",
      canonicalPath: "/errores/windows/0x80004005"
    },
    keywords: ["0x80004005", "unspecified error"]
  }),
  buildError({
    code: "0xc000007b",
    slug: "0xc000007b",
    productSlug: "windows",
    product: "Windows",
    title: "Error 0xc000007b al abrir una aplicación",
    description:
      "Suele aparecer cuando una aplicación no puede cargar correctamente dependencias de 32/64 bits o runtimes necesarios.",
    symptoms: [
      "La aplicación no inicia.",
      "Mensaje The application was unable to start correctly.",
      "El error aparece tras instalar un juego o software."
    ],
    probableCauses: [
      "Runtime faltante.",
      "Mezcla de DLL 32/64 bits.",
      "Instalación corrupta.",
      "Archivos de sistema dañados."
    ],
    diagnosis: [
      "Confirmar arquitectura de la aplicación.",
      "Reinstalar desde fuente oficial.",
      "Revisar dependencias del proveedor.",
      "Ejecutar SFC/DISM si afecta varias apps."
    ],
    recommendedSolution: [
      "Reinstala la aplicación.",
      "Instala runtimes oficiales requeridos por el proveedor.",
      "Actualiza Windows.",
      "Ejecuta SFC/DISM."
    ],
    alternatives: [
      "Probar versión compatible.",
      "Revisar logs de la aplicación.",
      "Instalar en una ruta sin permisos especiales."
    ],
    commands: [
      {
        label: "DISM",
        value: "DISM.exe /Online /Cleanup-image /Restorehealth",
        language: "cmd"
      }
    ],
    warnings: ["No descargues DLL sueltas de sitios desconocidos."],
    affectedVersions: ["Windows 10", "Windows 11"],
    reviewedAt: "2026-08-04",
    faq: [
      {
        question: "¿Debo descargar una DLL?",
        answer:
          "No. Es más seguro reinstalar runtimes oficiales o la aplicación."
      }
    ],
    references: [],
    relatedSlugs: ["como-ejecutar-sfc-y-dism-correctamente"],
    categorySlug: "windows",
    tags: ["windows", "aplicaciones", "dll"],
    seo: {
      title: "Error 0xc000007b al iniciar aplicaciones",
      description: "Soluciones seguras para el error 0xc000007b en Windows.",
      canonicalPath: "/errores/windows/0xc000007b"
    },
    keywords: ["0xc000007b", "dll", "application unable to start"]
  }),
  buildError({
    code: "0x800f081f",
    slug: "0x800f081f",
    productSlug: "windows",
    product: "Windows",
    title: "Error 0x800f081f al reparar Windows",
    description:
      "DISM o Windows Update no encuentran los archivos fuente necesarios para completar la reparación.",
    symptoms: [
      "DISM falla con 0x800f081f.",
      "Windows Update no instala componentes.",
      ".NET Framework no se habilita."
    ],
    probableCauses: [
      "Origen de reparación no disponible.",
      "Windows Update bloqueado.",
      "Imagen del sistema con componentes faltantes."
    ],
    diagnosis: [
      "Ejecutar DISM con conexión estable.",
      "Revisar Windows Update.",
      "Confirmar edición y compilación si se usa fuente externa."
    ],
    recommendedSolution: [
      "Ejecuta DISM estándar.",
      "Si falla, usa una fuente de instalación que coincida con la versión.",
      "Después ejecuta SFC."
    ],
    alternatives: [
      "Reparación in-place.",
      "Usar ISO oficial compatible.",
      "Revisar políticas WSUS en empresa."
    ],
    commands: [
      {
        label: "DISM estándar",
        value: "DISM.exe /Online /Cleanup-image /Restorehealth",
        language: "cmd"
      },
      { label: "SFC", value: "sfc /scannow", language: "cmd" }
    ],
    warnings: [
      "La fuente de reparación debe coincidir con edición, idioma y compilación."
    ],
    affectedVersions: ["Windows 10", "Windows 11", "Windows Server"],
    reviewedAt: "2026-08-04",
    faq: [
      {
        question: "¿Puedo usar cualquier ISO?",
        answer:
          "No. Debe coincidir lo más posible con la instalación que intentas reparar."
      }
    ],
    references: [
      {
        label: "Using System File Checker in Windows",
        publisher: "Microsoft Support",
        url: "https://support.microsoft.com/en-US/Windows/Experience/backup-recovery/using-system-file-checker-in-windows"
      }
    ],
    relatedSlugs: ["como-ejecutar-sfc-y-dism-correctamente"],
    categorySlug: "windows",
    tags: ["dism", "windows", "reparación"],
    seo: {
      title: "Error 0x800f081f en DISM o Windows Update",
      description:
        "Qué significa 0x800f081f y cómo reparar Windows con fuentes correctas.",
      canonicalPath: "/errores/windows/0x800f081f"
    },
    keywords: ["0x800f081f", "dism", "source files could not be found"]
  }),
  buildError({
    code: "0x80070002",
    slug: "0x80070002",
    productSlug: "windows-update",
    product: "Windows Update",
    title: "Windows Update 0x80070002",
    description:
      "Windows Update no encuentra archivos esperados o tiene metadatos de actualización inconsistentes.",
    symptoms: [
      "Actualización falla con 0x80070002.",
      "Descarga se reinicia.",
      "Historial muestra instalación fallida."
    ],
    probableCauses: [
      "Caché de Windows Update inconsistente.",
      "Fecha/hora incorrecta.",
      "Archivos temporales dañados.",
      "Interrupción de descarga."
    ],
    diagnosis: [
      "Revisar fecha y hora.",
      "Ejecutar solucionador de Windows Update.",
      "Aplicar DISM/SFC si hay errores repetidos."
    ],
    recommendedSolution: [
      "Reinicia.",
      "Ejecuta solucionador.",
      "Ejecuta DISM y SFC.",
      "Vuelve a buscar actualizaciones."
    ],
    alternatives: [
      "Pausar y reanudar actualizaciones.",
      "Instalar manualmente la KB desde fuente oficial si aplica.",
      "Probar otra red."
    ],
    commands: [
      {
        label: "Solucionador",
        value: "ms-settings:troubleshoot",
        language: "cmd"
      }
    ],
    warnings: [
      "No borres carpetas de sistema sin conocer el procedimiento exacto."
    ],
    affectedVersions: ["Windows 10", "Windows 11"],
    reviewedAt: "2026-08-04",
    faq: [
      {
        question: "¿Pierdo archivos?",
        answer:
          "No por ejecutar el solucionador, DISM o SFC. Aun así, conviene tener respaldo."
      }
    ],
    references: [],
    relatedSlugs: ["como-reparar-windows-update"],
    categorySlug: "windows",
    tags: ["windows update", "0x80070002"],
    seo: {
      title: "Error 0x80070002 de Windows Update",
      description: "Soluciones para el error 0x80070002 al actualizar Windows.",
      canonicalPath: "/errores/windows-update/0x80070002"
    },
    keywords: ["0x80070002", "windows update"]
  }),
  buildError({
    code: "No se puede iniciar Microsoft Outlook",
    slug: "no-se-puede-iniciar-microsoft-outlook",
    productSlug: "outlook",
    product: "Outlook",
    title: "No se puede iniciar Microsoft Outlook",
    description:
      "Outlook no logra cargar la ventana principal, normalmente por perfil, panel de navegación o complementos.",
    symptoms: [
      "Outlook no abre.",
      "Aparece No se puede iniciar Microsoft Outlook.",
      "Se queda en Procesando."
    ],
    probableCauses: [
      "Perfil dañado.",
      "Complemento incompatible.",
      "Archivo de datos dañado.",
      "Configuración de vista corrupta."
    ],
    diagnosis: [
      "Probar modo seguro.",
      "Crear perfil nuevo.",
      "Reparar Office.",
      "Revisar complementos."
    ],
    recommendedSolution: [
      "Abre Outlook en modo seguro.",
      "Deshabilita complementos.",
      "Crea perfil nuevo.",
      "Repara Office si el problema persiste."
    ],
    alternatives: [
      "Usar Outlook web temporalmente.",
      "Revisar actualizaciones de Office.",
      "Probar otra cuenta de Windows."
    ],
    commands: [
      { label: "Modo seguro", value: "outlook.exe /safe", language: "cmd" },
      { label: "Perfiles", value: "outlook.exe /profiles", language: "cmd" }
    ],
    warnings: [
      "No elimines perfiles antiguos hasta confirmar que el nuevo sincronizó todo."
    ],
    affectedVersions: [
      "Outlook para Microsoft 365",
      "Outlook 2024",
      "Outlook 2021",
      "Outlook 2019"
    ],
    reviewedAt: "2026-08-04",
    faq: [
      {
        question: "¿Puedo usar Outlook web mientras tanto?",
        answer:
          "Sí, si tu cuenta lo permite. Sirve para seguir trabajando mientras reparas el cliente de escritorio."
      }
    ],
    references: [
      {
        label: "Classic Outlook not responding",
        publisher: "Microsoft Support",
        url: "https://support.microsoft.com/en-us/office/classic-outlook-not-responding-stuck-at-processing-stopped-working-or-freezes-5c313d04-64af-4441-82d2-44e5a43eee5a"
      }
    ],
    relatedSlugs: [
      "outlook-no-abre-causas-y-soluciones",
      "como-crear-un-perfil-nuevo-de-outlook"
    ],
    categorySlug: "outlook",
    tags: ["outlook", "perfil"],
    seo: {
      title: "No se puede iniciar Microsoft Outlook",
      description:
        "Causas y soluciones para el error No se puede iniciar Microsoft Outlook.",
      canonicalPath: "/errores/outlook/no-se-puede-iniciar-microsoft-outlook"
    },
    keywords: ["no se puede iniciar microsoft outlook", "outlook no abre"]
  }),
  buildError({
    code: "Aw, Snap!",
    slug: "aw-snap",
    productSlug: "chrome",
    product: "Google Chrome",
    title: "Chrome Aw, Snap!",
    description:
      "Chrome no pudo cargar o mantener activa una pestaña. Puede ser memoria, extensiones, caché o el sitio.",
    symptoms: [
      "La pestaña muestra Aw, Snap!",
      "Solo falla una web.",
      "Chrome consume mucha memoria."
    ],
    probableCauses: [
      "Memoria insuficiente.",
      "Extensión conflictiva.",
      "Caché o cookies dañadas.",
      "Sitio con problema temporal."
    ],
    diagnosis: [
      "Recargar página.",
      "Probar incógnito.",
      "Deshabilitar extensiones.",
      "Borrar caché del sitio."
    ],
    recommendedSolution: [
      "Actualiza Chrome.",
      "Cierra pestañas innecesarias.",
      "Prueba sin extensiones.",
      "Borra caché si afecta un sitio concreto."
    ],
    alternatives: [
      "Restablecer Chrome.",
      "Probar otro perfil.",
      "Revisar antivirus/firewall."
    ],
    commands: [],
    warnings: [
      "No instales extensiones desconocidas para supuestamente reparar Chrome."
    ],
    affectedVersions: ["Google Chrome en Windows, macOS y Linux"],
    reviewedAt: "2026-08-04",
    faq: [
      {
        question: "¿Es problema del sitio o de mi PC?",
        answer:
          "Si falla solo una web, puede ser el sitio o sus datos locales. Si fallan muchas, revisa Chrome, memoria y red."
      }
    ],
    references: [
      {
        label: "Fix connection and loading errors in Chrome",
        publisher: "Google Chrome Help",
        url: "https://support.google.com/chrome/answer/6098869"
      }
    ],
    relatedSlugs: [
      "chrome-no-abre-soluciones",
      "como-borrar-la-cache-del-navegador-correctamente"
    ],
    categorySlug: "google-chrome",
    tags: ["chrome", "aw snap"],
    seo: {
      title: "Error Aw, Snap! en Chrome",
      description:
        "Soluciones para el mensaje Aw, Snap! cuando Chrome no carga una pestaña.",
      canonicalPath: "/errores/chrome/aw-snap"
    },
    keywords: ["aw snap", "chrome no carga"]
  }),
  buildError({
    code: "18456",
    slug: "error-18456",
    productSlug: "sql-server",
    product: "SQL Server",
    title: "SQL Server Error 18456: login failed",
    description:
      "Error de autenticación en SQL Server. Indica que el inicio de sesión fue rechazado.",
    symptoms: [
      "Login failed for user.",
      "La aplicación no conecta.",
      "SSMS muestra Error 18456."
    ],
    probableCauses: [
      "Usuario o contraseña incorrectos.",
      "Modo de autenticación no habilitado.",
      "Login deshabilitado.",
      "Base de datos predeterminada inaccesible."
    ],
    diagnosis: [
      "Confirmar usuario y servidor.",
      "Revisar si usa autenticación Windows o SQL.",
      "Consultar logs de SQL Server para estado específico.",
      "Validar permisos y base predeterminada."
    ],
    recommendedSolution: [
      "Verifica credenciales.",
      "Habilita el login si corresponde.",
      "Corrige base de datos predeterminada.",
      "Ajusta modo de autenticación solo si la política lo permite."
    ],
    alternatives: [
      "Probar con autenticación Windows.",
      "Restablecer contraseña de login SQL autorizado.",
      "Revisar firewall si el error real cambia a conexión."
    ],
    commands: [],
    warnings: [
      "No compartas contraseñas en tickets ni logs.",
      "Cambios de modo de autenticación pueden requerir reiniciar SQL Server."
    ],
    affectedVersions: ["SQL Server"],
    reviewedAt: "2026-08-04",
    faq: [
      {
        question: "¿18456 siempre es contraseña incorrecta?",
        answer:
          "No. El estado específico en el log de SQL Server ayuda a diferenciar la causa."
      }
    ],
    references: [],
    relatedSlugs: ["como-comprobar-si-un-puerto-esta-abierto"],
    categorySlug: "sql",
    tags: ["sql server", "login", "auth"],
    seo: {
      title: "SQL Server Error 18456",
      description: "Diagnóstico del error Login failed for user en SQL Server.",
      canonicalPath: "/errores/sql-server/error-18456"
    },
    keywords: ["sql server 18456", "login failed"]
  })
];

export function getErrorEntry(productSlug: string, slug: string) {
  return errorEntries.find(
    (entry) =>
      entry.productSlug === productSlug &&
      entry.slug === slug &&
      entry.status === "published"
  );
}
