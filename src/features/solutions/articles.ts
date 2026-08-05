import type {
  Article,
  ArticleImage,
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

const microsoftActivationErrors: Reference = {
  label: "Get help with Windows activation errors",
  publisher: "Microsoft Support",
  url: "https://support.microsoft.com/en-US/Windows/activation/get-help-with-windows-activation-errors"
};

const microsoftHardwareReactivation: Reference = {
  label: "Reactivating Windows after a hardware change",
  publisher: "Microsoft Support",
  url: "https://support.microsoft.com/en-us/windows/activation/reactivating-windows-after-a-hardware-change"
};

const microsoftProductKey: Reference = {
  label: "Find your Windows product key",
  publisher: "Microsoft Support",
  url: "https://support.microsoft.com/en-US/Windows/activation/find-your-windows-product-key"
};

const activationNotice =
  "Tesoluciona solo documenta métodos oficiales y legítimos. Para activar Windows necesitas una licencia digital o una clave de producto válida.";

type StepImageMap = Record<string, Record<number, ArticleImage>>;

type PendingImageMap = Record<
  string,
  Record<number, { requiredImage: string; reason: string }>
>;

const imageReviewDate = "2026-08-05";

const approvedStepImages: StepImageMap = {
  "como-actualizar-google-chrome": {
    4: {
      alt: "Menu de Google Chrome en Windows 10 con el aviso New Chrome available y la opcion Relaunch to update.",
      caption:
        "Captura real de Chrome 135 en Windows 10 mostrando la accion Relaunch to update. La interfaz esta en ingles; equivale a reiniciar Chrome para aplicar la actualizacion.",
      creditId: "chrome-135-relaunch-update-windows-10",
      fileName: "chrome-135-relaunch-update-windows-10.png",
      height: 480,
      id: "chrome-135-relaunch-update-windows-10",
      sourceType: "external",
      src: "/images/solutions/chrome-135-relaunch-update-windows-10.png",
      width: 640
    }
  },
  "como-cambiar-los-servidores-dns": {
    1: {
      alt: "Salida de ipconfig /all en Windows 11 mostrando servidores DNS actuales y puerta de enlace IPv4.",
      caption:
        "Captura real de Windows 11 Professional en italiano mostrando DNS actuales antes de cambiar la configuracion. Se redactaron identificadores persistentes.",
      creditId: "windows-11-ipconfig-all-dns-current",
      fileName: "windows-11-ipconfig-all-router-dns.png",
      height: 798,
      id: "windows-11-ipconfig-all-dns-current",
      sourceType: "external",
      src: "/images/solutions/windows-11-ipconfig-all-router-dns.png",
      width: 1110
    }
  },
  "como-saber-la-ip-del-router": {
    2: {
      alt: "Salida de ipconfig /all en Windows 11 mostrando la puerta de enlace predeterminada IPv4.",
      caption:
        "Captura real de Windows 11 Professional en italiano donde se identifica la puerta de enlace IPv4 del router. Se redactaron identificadores persistentes.",
      creditId: "windows-11-ipconfig-all-router-gateway",
      fileName: "windows-11-ipconfig-all-router-dns.png",
      height: 798,
      id: "windows-11-ipconfig-all-router-gateway",
      sourceType: "external",
      src: "/images/solutions/windows-11-ipconfig-all-router-dns.png",
      width: 1110
    }
  }
};

const pendingImageRequirements: PendingImageMap = {
  "como-activar-windows-11-con-una-licencia-digital": {
    1: {
      reason:
        "No hay todavia una captura propia segura ni una fuente externa con permiso claro para representar el flujo de licencia digital.",
      requiredImage:
        "Captura real de Windows 11 en Configuracion > Sistema > Activacion mostrando licencia digital sin clave de producto ni datos personales."
    }
  },
  "como-actualizar-google-chrome": {
    2: {
      reason:
        "La captura aprobada cubre el reinicio para actualizar, pero falta una fuente legal clara para la pantalla Informacion de Google Chrome.",
      requiredImage:
        "Captura real de Informacion de Google Chrome comprobando actualizaciones, sin perfil ni datos personales visibles."
    }
  },
  "como-actualizar-microsoft-edge": {
    2: {
      reason:
        "La captura de Edge encontrada tenia licencia CC0, pero mostraba configuracion de fuentes y extension, no el flujo de actualizacion.",
      requiredImage:
        "Captura real de Acerca de Microsoft Edge mostrando la comprobacion de actualizaciones."
    }
  },
  "como-cambiar-los-servidores-dns": {
    4: {
      reason:
        "La captura de ipconfig aprobada sirve para anotar los DNS actuales, pero falta la pantalla exacta de edicion de DNS.",
      requiredImage:
        "Captura real de Windows 11 en Red e Internet > DNS editando servidores DNS sin datos sensibles."
    }
  },
  "como-comprobar-si-windows-esta-activado": {
    1: {
      reason:
        "Las capturas oficiales revisadas no tienen permiso comercial claro para reutilizacion y no se publicaran sin autorizacion.",
      requiredImage:
        "Captura real de Windows 11 en Configuracion > Sistema > Activacion mostrando el estado de licencia."
    }
  },
  "como-ejecutar-sfc-y-dism-correctamente": {
    2: {
      reason:
        "Falta captura real producida en laboratorio o recurso externo legal que muestre la salida de SFC y DISM.",
      requiredImage:
        "Captura real de Terminal o CMD como administrador ejecutando SFC y DISM sin rutas internas ni datos personales."
    }
  },
  "como-habilitar-la-impresion-a-doble-cara-por-defecto": {
    2: {
      reason:
        "No se encontro una captura real con licencia verificable de preferencias de impresion duplex.",
      requiredImage:
        "Captura real de preferencias de impresora mostrando impresion a doble cara por defecto."
    }
  },
  "como-reparar-microsoft-office": {
    2: {
      reason:
        "Falta captura propia segura o fuente externa con permiso claro para la pantalla de reparacion de Microsoft 365.",
      requiredImage:
        "Captura real de Aplicaciones instaladas > Microsoft 365 > Modificar > Reparacion rapida o en linea."
    }
  },
  "como-reparar-windows-update": {
    2: {
      reason:
        "No se publicaran imagenes oficiales o de blogs sin licencia comercial verificable.",
      requiredImage:
        "Captura real de Windows Update o del solucionador de problemas de Windows 11."
    }
  },
  "como-usar-el-solucionador-de-activacion": {
    2: {
      reason:
        "El solucionador de activacion puede mostrar datos de licencia; falta captura propia segura con datos neutralizados.",
      requiredImage:
        "Captura real del solucionador de activacion de Windows 11 sin clave, cuenta ni identificadores visibles."
    }
  },
  "outlook-no-abre-causas-y-soluciones": {
    2: {
      reason:
        "No se encontro captura de Outlook con licencia verificable que no muestre cuentas o datos privados.",
      requiredImage:
        "Captura real de Outlook en modo seguro, panel de perfiles o error de inicio sin cuentas visibles."
    }
  }
};

function buildSolutionSteps(input: {
  articleSlug: string;
  categorySlug: string;
  commands?: CommandSnippet[];
  steps: string[];
  verification: string[];
}) {
  return input.steps.map((step, index) => {
    const command = input.commands?.[index];
    const stepNumber = index + 1;
    const image = approvedStepImages[input.articleSlug]?.[stepNumber];
    const imageRequirement = image
      ? undefined
      : pendingImageRequirements[input.articleSlug]?.[stepNumber];

    return {
      id: `paso-${stepNumber}`,
      title: `Paso ${stepNumber} - ${step.replace(/\.$/, "")}`,
      objective:
        index === 0
          ? "Confirmar el estado inicial antes de modificar configuración."
          : "Aplicar el siguiente cambio de forma controlada.",
      instructions: [
        step,
        "Lee cualquier mensaje antes de aceptar cambios.",
        "Anota el resultado o código exacto si aparece una alerta."
      ],
      menuPath:
        input.categorySlug === "windows"
          ? "Inicio > Configuración > Sistema"
          : undefined,
      command: command
        ? {
            ...command,
            explanation:
              command.explanation ??
              `Este comando ayuda a ejecutar la acción "${command.label}" con una herramienta integrada.`,
            expectedOutput:
              command.expectedOutput ??
              "Debe mostrarse un resultado sin errores o un mensaje claro para continuar el diagnóstico.",
            ifDifferent:
              command.ifDifferent ??
              "Si aparece un error, copia el texto exacto y revisa la sección de alternativas antes de repetirlo."
        }
        : undefined,
      image,
      imageRequirement: imageRequirement
        ? {
            ...imageRequirement,
            reviewedAt: imageReviewDate,
            status: "pending" as const
          }
        : undefined,
      expectedResult:
        input.verification[index] ??
        "El sistema permite continuar sin mostrar un error nuevo.",
      commonError:
        "Cerrar la ventana antes de leer el mensaje o ejecutar el paso con permisos insuficientes.",
      howToContinue:
        index === input.steps.length - 1
          ? "Continúa con la verificación final."
          : "Si el resultado coincide, avanza al siguiente paso."
    };
  });
}

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

const activationArticles: Article[] = [
  buildArticle({
    title: "Cómo activar Windows 11 con una licencia digital",
    slug: "como-activar-windows-11-con-una-licencia-digital",
    summary:
      "Activa Windows 11 con una licencia digital vinculada al hardware o a tu cuenta Microsoft, sin usar claves no autorizadas.",
    categorySlug: "windows",
    tags: ["windows 11", "activación", "licencia digital", "microsoft"],
    keywords: [
      "activar windows 11 licencia digital",
      "licencia digital windows",
      "windows activated with digital license"
    ],
    appliesTo: ["Windows 11", "Windows 10"],
    symptoms: [
      "Windows muestra que no está activado después de instalar.",
      "La activación depende de una licencia digital previa.",
      "Quieres confirmar si tu cuenta Microsoft está vinculada."
    ],
    causes: [
      "El equipo no está conectado a Internet.",
      "La licencia digital no está vinculada a la cuenta usada.",
      "La edición instalada no coincide con la licencia.",
      "Hubo un cambio de hardware importante."
    ],
    steps: [
      "Conecta el equipo a Internet.",
      "Abre Configuración > Sistema > Activación.",
      "Comprueba si aparece licencia digital vinculada a tu cuenta Microsoft.",
      "Inicia sesión con la cuenta Microsoft asociada si Windows lo solicita.",
      "Ejecuta el solucionador de activación solo si Windows sigue sin activarse."
    ],
    commands: [
      {
        label: "Abrir Activación",
        value: "ms-settings:activation",
        language: "cmd",
        explanation:
          "Abre directamente la página oficial de Activación en Configuración.",
        expectedOutput: "Debe abrir Configuración en Sistema > Activación.",
        ifDifferent:
          "Si no abre, entra manualmente desde Inicio > Configuración > Sistema > Activación."
      }
    ],
    warnings: [activationNotice],
    verification: [
      "La página de Activación indica que Windows está activado.",
      "Si la licencia está vinculada, el mensaje menciona tu cuenta Microsoft.",
      "No aparece marca de agua de activación tras reiniciar."
    ],
    references: [microsoftActivation, microsoftHardwareReactivation],
    relatedSlugs: [
      "como-comprobar-si-windows-esta-activado",
      "como-usar-el-solucionador-de-activacion"
    ]
  }),
  buildArticle({
    title: "Cómo activar Windows con una clave de producto válida",
    slug: "como-activar-windows-con-una-clave-de-producto-valida",
    summary:
      "Introduce una clave de producto válida de 25 caracteres desde Configuración o con slmgr sin exponer la clave.",
    categorySlug: "windows",
    tags: ["windows", "clave de producto", "activación", "licencia"],
    keywords: [
      "activar windows clave producto",
      "change product key",
      "slmgr ipk"
    ],
    appliesTo: ["Windows 11", "Windows 10"],
    symptoms: [
      "Tienes una clave legítima y Windows no está activado.",
      "Cambiaste de edición o reinstalaste Windows.",
      "Necesitas introducir la clave después de la instalación."
    ],
    causes: [
      "La clave no se introdujo durante la instalación.",
      "La edición instalada no coincide con la clave.",
      "La clave ya fue usada de una forma no permitida por la licencia.",
      "El equipo no puede contactar los servicios de activación."
    ],
    steps: [
      "Confirma que tu clave proviene de Microsoft, fabricante o vendedor autorizado.",
      "Abre Configuración > Sistema > Activación.",
      "Selecciona Cambiar clave de producto.",
      "Escribe la clave de 25 caracteres sin compartirla por chat ni capturas.",
      "Espera la validación y anota cualquier código de error."
    ],
    commands: [
      {
        label: "Instalar clave válida",
        value: "slmgr /ipk XXXXX-XXXXX-XXXXX-XXXXX-XXXXX",
        language: "cmd",
        explanation:
          "Instala una clave de producto válida. Sustituye las X por tu clave real y no la compartas.",
        expectedOutput:
          "Windows debe informar que la clave se instaló correctamente.",
        ifDifferent:
          "Si muestra error, revisa edición, conexión e historial de compra antes de intentarlo otra vez."
      },
      {
        label: "Activar en línea",
        value: "slmgr /ato",
        language: "cmd",
        explanation:
          "Solicita activación en línea usando la clave válida ya instalada.",
        expectedOutput:
          "Debe indicar activación correcta o devolver un código oficial.",
        ifDifferent:
          "Busca el código en la documentación oficial de errores de activación."
      }
    ],
    warnings: [activationNotice],
    verification: [
      "Activación muestra Windows está activado.",
      "slmgr /xpr indica activación permanente o un periodo válido según licencia.",
      "No se usaron claves genéricas, activadores ni servidores no autorizados."
    ],
    references: [microsoftActivation, microsoftProductKey],
    relatedSlugs: [
      "que-hacer-cuando-una-clave-valida-no-funciona",
      "windows-home-instalado-con-licencia-de-windows-pro"
    ]
  }),
  buildArticle({
    title: "Cómo usar el solucionador de activación",
    slug: "como-usar-el-solucionador-de-activacion",
    summary:
      "Usa el solucionador oficial cuando Windows no se activa y existe una licencia digital asociada.",
    categorySlug: "windows",
    tags: ["windows", "solucionador", "activación"],
    keywords: ["activation troubleshooter", "solucionador activacion windows"],
    appliesTo: ["Windows 11", "Windows 10"],
    symptoms: [
      "Windows indica que no puede activarse.",
      "Cambiaste hardware recientemente.",
      "La licencia digital estaba vinculada a una cuenta Microsoft."
    ],
    causes: [
      "Cambio de hardware importante.",
      "Cuenta Microsoft distinta a la vinculada.",
      "Edición instalada diferente.",
      "Activación pendiente por conectividad."
    ],
    steps: [
      "Inicia sesión como administrador.",
      "Abre Configuración > Sistema > Activación.",
      "Selecciona Solucionar problemas.",
      "Si aparece la opción, elige Cambié hardware en este dispositivo recientemente.",
      "Selecciona el dispositivo correcto y confirma la activación."
    ],
    warnings: [activationNotice],
    verification: [
      "El solucionador informa activación completada.",
      "La página de Activación deja de mostrar error.",
      "El dispositivo seleccionado corresponde al equipo actual."
    ],
    references: [microsoftHardwareReactivation, microsoftActivationErrors],
    relatedSlugs: [
      "como-reactivar-windows-despues-de-cambiar-hardware",
      "error-0xc004f211-despues-de-cambiar-hardware"
    ]
  }),
  buildArticle({
    title: "Cómo reactivar Windows después de cambiar hardware",
    slug: "como-reactivar-windows-despues-de-cambiar-hardware",
    summary:
      "Prepara y reactiva Windows después de cambiar placa base u otro hardware importante usando métodos oficiales.",
    categorySlug: "windows",
    tags: ["windows", "hardware", "licencia digital", "reactivación"],
    keywords: [
      "reactivar windows hardware",
      "0xc004f211",
      "motherboard activation"
    ],
    appliesTo: ["Windows 11", "Windows 10"],
    symptoms: [
      "Windows dejó de activarse tras cambiar la placa base.",
      "Aparece error 0xC004F211.",
      "El solucionador muestra dispositivos vinculados."
    ],
    causes: [
      "La licencia digital está asociada al hardware anterior.",
      "La cuenta Microsoft no estaba vinculada antes del cambio.",
      "La edición actual no coincide con la licencia.",
      "La licencia OEM puede no transferirse."
    ],
    steps: [
      "Antes del cambio, confirma que Windows está activado.",
      "Vincula la licencia digital a tu cuenta Microsoft.",
      "Después del cambio, conecta el equipo a Internet.",
      "Ejecuta el solucionador de activación.",
      "Selecciona el dispositivo correcto y activa solo si la licencia lo permite."
    ],
    warnings: [
      activationNotice,
      "Una licencia OEM preinstalada puede estar ligada al dispositivo original y no siempre se transfiere."
    ],
    verification: [
      "La página de Activación muestra licencia activa.",
      "La edición de Windows coincide con la licencia original.",
      "No quedan errores 0xC004F211 o 0xC004F213."
    ],
    references: [microsoftHardwareReactivation, microsoftActivationErrors],
    relatedSlugs: [
      "error-0xc004f211-despues-de-cambiar-hardware",
      "error-0xc004f213-no-se-encontro-una-clave-de-producto"
    ]
  }),
  buildArticle({
    title: "Cómo consultar el estado con slmgr /xpr",
    slug: "como-consultar-el-estado-con-slmgr-xpr",
    summary:
      "Usa slmgr /xpr para revisar si Windows está activado de forma permanente o si tiene expiración.",
    categorySlug: "windows",
    tags: ["windows", "slmgr", "licencia", "cmd"],
    keywords: ["slmgr xpr", "windows activation expiration", "estado licencia"],
    symptoms: [
      "Necesitas confirmar activación desde consola.",
      "La interfaz de Configuración no es suficiente para soporte.",
      "Quieres saber si la activación expira."
    ],
    causes: [
      "Licencias por volumen pueden tener expiración.",
      "La activación aún no terminó.",
      "El servicio de licencias necesita mostrar estado detallado."
    ],
    steps: [
      "Abre CMD como administrador.",
      "Ejecuta slmgr /xpr.",
      "Lee el mensaje sin cerrar la ventana.",
      "Compara el resultado con la pantalla de Activación.",
      "Si aparece expiración inesperada, consulta al proveedor o administrador."
    ],
    commands: [
      {
        label: "Ver expiración de licencia",
        value: "slmgr /xpr",
        language: "cmd",
        explanation:
          "Consulta si la activación es permanente o si tiene una fecha de expiración.",
        expectedOutput:
          "Debe aparecer un cuadro con activación permanente o fecha de expiración.",
        ifDifferent:
          "Si aparece Notification o error, continúa con slmgr /dlv y el solucionador de activación."
      }
    ],
    warnings: [activationNotice],
    verification: [
      "El mensaje confirma activación permanente o expiración esperada.",
      "La información coincide con la licencia que compraste o administra tu organización.",
      "No aparecen errores del servicio de licencias."
    ],
    references: [microsoftActivation],
    relatedSlugs: ["como-consultar-informacion-detallada-con-slmgr-dlv"]
  }),
  buildArticle({
    title: "Cómo consultar información detallada con slmgr /dlv",
    slug: "como-consultar-informacion-detallada-con-slmgr-dlv",
    summary:
      "Consulta canal, estado y datos de activación con slmgr /dlv sin revelar claves completas.",
    categorySlug: "windows",
    tags: ["windows", "slmgr", "dlv", "diagnóstico"],
    keywords: ["slmgr dlv", "license status notification", "activation id"],
    symptoms: [
      "Soporte solicita estado detallado de licencia.",
      "Aparece License Status Notification.",
      "Necesitas distinguir canal Retail, OEM o Volume."
    ],
    causes: [
      "La activación no se completó.",
      "La clave no corresponde a la edición instalada.",
      "El canal de licencia requiere soporte del vendedor o de TI."
    ],
    steps: [
      "Abre CMD como administrador.",
      "Ejecuta slmgr /dlv.",
      "No compartas IDs o claves parciales en público.",
      "Revisa License Status y Description.",
      "Usa el código de error para buscar una solución oficial."
    ],
    commands: [
      {
        label: "Ver detalle de licencia",
        value: "slmgr /dlv",
        language: "cmd",
        explanation:
          "Muestra información detallada del servicio de licencias sin revelar una clave completa.",
        expectedOutput:
          "Debe aparecer una ventana con Description, License Status y datos de activación.",
        ifDifferent:
          "Si no abre, confirma permisos de administrador y que el servicio Software Protection esté disponible."
      }
    ],
    warnings: [
      activationNotice,
      "No publiques capturas completas de slmgr /dlv si incluyen identificadores del dispositivo."
    ],
    verification: [
      "License Status coincide con el estado que investigas.",
      "El canal de licencia es coherente con el origen de compra.",
      "Tienes un código o estado exacto para continuar."
    ],
    references: [microsoftActivation, microsoftActivationErrors],
    relatedSlugs: ["que-significa-license-status-notification"]
  }),
  buildArticle({
    title: "Error 0xC004F211 después de cambiar hardware",
    slug: "error-0xc004f211-despues-de-cambiar-hardware",
    summary:
      "Explica por qué Windows reporta cambio de hardware y cómo reactivar con cuenta Microsoft o clave válida.",
    categorySlug: "windows",
    tags: ["0xc004f211", "windows", "activación", "hardware"],
    keywords: ["0xc004f211", "hardware changed", "reactivar windows"],
    symptoms: [
      "Aparece 0xC004F211.",
      "Windows no encuentra una licencia que coincida con el hardware.",
      "El problema empezó tras cambiar placa base u otro componente mayor."
    ],
    causes: [
      "La licencia digital quedó asociada al hardware anterior.",
      "No se vinculó una cuenta Microsoft antes del cambio.",
      "La licencia no permite transferencia.",
      "La edición instalada no coincide."
    ],
    steps: [
      "Confirma edición de Windows.",
      "Conecta el equipo a Internet.",
      "Abre Configuración > Sistema > Activación.",
      "Ejecuta el solucionador y elige cambio de hardware reciente.",
      "Si no funciona, contacta al vendedor, fabricante o soporte de Microsoft."
    ],
    warnings: [activationNotice],
    verification: [
      "El error 0xC004F211 desaparece.",
      "El solucionador vincula el equipo correcto.",
      "La licencia usada es transferible según su origen."
    ],
    references: [microsoftActivationErrors, microsoftHardwareReactivation],
    relatedSlugs: ["como-reactivar-windows-despues-de-cambiar-hardware"]
  }),
  buildArticle({
    title: "Error 0xC004F213: no se encontró una clave de producto",
    slug: "error-0xc004f213-no-se-encontro-una-clave-de-producto",
    summary:
      "Qué hacer cuando Windows no encuentra una clave de producto en el dispositivo y no logra activarse.",
    categorySlug: "windows",
    tags: ["0xc004f213", "windows", "clave producto", "activación"],
    keywords: ["0xc004f213", "no product key found", "clave producto windows"],
    symptoms: [
      "Windows muestra 0xC004F213.",
      "La activación indica que no se encontró una clave.",
      "El error aparece tras instalación limpia o cambio de hardware."
    ],
    causes: [
      "La instalación no detectó clave OEM.",
      "La licencia digital no coincide con el hardware.",
      "No se introdujo una clave válida.",
      "La edición instalada es distinta a la licencia."
    ],
    steps: [
      "Revisa si tienes licencia digital o clave de producto.",
      "Confirma que la edición instalada sea la correcta.",
      "Inicia sesión con la cuenta Microsoft asociada si aplica.",
      "Introduce una clave válida desde Cambiar clave de producto.",
      "Si el equipo es nuevo, contacta al fabricante."
    ],
    warnings: [activationNotice],
    verification: [
      "Activación deja de mostrar 0xC004F213.",
      "El método usado coincide con licencia digital o clave válida.",
      "La edición instalada coincide con la licencia."
    ],
    references: [microsoftActivationErrors, microsoftProductKey],
    relatedSlugs: ["como-activar-windows-con-una-clave-de-producto-valida"]
  }),
  buildArticle({
    title: "Windows Home instalado con licencia de Windows Pro",
    slug: "windows-home-instalado-con-licencia-de-windows-pro",
    summary:
      "Diagnostica una diferencia entre edición instalada y licencia antes de intentar activar Windows.",
    categorySlug: "windows",
    tags: ["windows home", "windows pro", "activación", "edición"],
    keywords: ["windows home pro licencia", "edition mismatch", "0xc004f210"],
    symptoms: [
      "Tienes licencia Pro pero Windows muestra Home.",
      "La clave válida no activa la edición instalada.",
      "Aparecen errores de edición incompatible."
    ],
    causes: [
      "Se instaló la edición incorrecta.",
      "El instalador eligió automáticamente Home por clave OEM.",
      "La clave corresponde a otra edición.",
      "La licencia digital registrada no coincide."
    ],
    steps: [
      "Abre Configuración > Sistema > Activación.",
      "Confirma la edición instalada.",
      "Compara la edición con la licencia adquirida.",
      "Usa Cambiar clave de producto solo si la clave coincide con la edición destino.",
      "Si no se puede cambiar, reinstala la edición correcta con medios oficiales."
    ],
    warnings: [
      activationNotice,
      "No uses claves genéricas como si fueran licencias; solo sirven para escenarios de instalación o cambio de edición documentados por Microsoft."
    ],
    verification: [
      "La edición mostrada coincide con tu licencia.",
      "La activación termina sin error de edición.",
      "El historial de compra respalda la edición usada."
    ],
    references: [microsoftActivationErrors, microsoftActivation],
    relatedSlugs: ["que-hacer-cuando-una-clave-valida-no-funciona"]
  }),
  buildArticle({
    title: "Qué hacer cuando una clave válida no funciona",
    slug: "que-hacer-cuando-una-clave-valida-no-funciona",
    summary:
      "Lista de comprobaciones legítimas cuando una clave de Windows comprada de forma válida no activa el equipo.",
    categorySlug: "windows",
    tags: ["windows", "clave producto", "licencia", "soporte"],
    keywords: ["clave valida no funciona windows", "windows product key error"],
    symptoms: [
      "Windows rechaza una clave que compraste legalmente.",
      "Aparece un error de edición, región o activación.",
      "El vendedor confirma la compra, pero el equipo no activa."
    ],
    causes: [
      "Edición instalada incorrecta.",
      "Clave usada en más dispositivos de los permitidos.",
      "Error temporal de conectividad.",
      "Clave bloqueada o mal emitida por el vendedor."
    ],
    steps: [
      "Verifica edición y versión de Windows.",
      "Revisa conexión, fecha y hora.",
      "Introduce la clave desde Configuración, no en sitios externos.",
      "Copia el código exacto de error si falla.",
      "Contacta al vendedor autorizado o soporte de Microsoft con comprobante de compra."
    ],
    warnings: [
      activationNotice,
      "No envíes tu clave completa por correo, chat público o capturas sin protección."
    ],
    verification: [
      "La clave activa Windows o se confirma la causa oficial del rechazo.",
      "Tienes documentación del vendedor o soporte.",
      "No instalaste herramientas de terceros ni activadores."
    ],
    references: [microsoftProductKey, microsoftActivationErrors],
    relatedSlugs: [
      "como-activar-windows-con-una-clave-de-producto-valida",
      "windows-home-instalado-con-licencia-de-windows-pro"
    ]
  }),
  buildArticle({
    title: "Cómo comprobar la edición instalada antes de activar Windows",
    slug: "como-comprobar-la-edicion-instalada-antes-de-activar-windows",
    summary:
      "Revisa si tienes Windows Home, Pro u otra edición antes de comprar o introducir una clave.",
    categorySlug: "windows",
    tags: ["windows", "edición", "activación", "licencia"],
    keywords: [
      "comprobar edición windows",
      "windows home pro",
      "activation edition"
    ],
    symptoms: [
      "No sabes si la clave corresponde a Home o Pro.",
      "Una clave válida muestra error.",
      "Soporte te pide confirmar edición instalada."
    ],
    causes: [
      "La edición instalada no coincide con la licencia.",
      "El equipo venía con una clave OEM distinta.",
      "Se instaló Windows desde un medio genérico."
    ],
    steps: [
      "Abre Configuración > Sistema > Acerca de.",
      "Revisa Edición de Windows.",
      "Abre Configuración > Sistema > Activación.",
      "Compara la edición con el comprobante de compra.",
      "No compres ni introduzcas una clave hasta confirmar compatibilidad."
    ],
    commands: [
      {
        label: "Ver edición por consola",
        value: "DISM /Online /Get-CurrentEdition",
        language: "cmd",
        explanation:
          "Consulta la edición actual instalada en la imagen de Windows en ejecución.",
        expectedOutput:
          "Debe mostrar Current Edition con una edición como Core o Professional.",
        ifDifferent:
          "Si DISM falla, usa winver y la pantalla Acerca de para confirmar edición."
      }
    ],
    warnings: [activationNotice],
    verification: [
      "La edición queda documentada.",
      "La clave o licencia que usarás corresponde a esa edición.",
      "Evitas errores por Home/Pro antes de activar."
    ],
    references: [microsoftActivationErrors, microsoftActivation],
    relatedSlugs: ["windows-home-instalado-con-licencia-de-windows-pro"]
  }),
  buildArticle({
    title: "Cómo comprar una licencia legítima de Windows",
    slug: "como-comprar-una-licencia-legitima-de-windows",
    summary:
      "Identifica canales legítimos para adquirir Windows y evita claves sospechosas, activadores o servidores no autorizados.",
    categorySlug: "windows",
    tags: ["windows", "licencia", "compra segura", "seguridad"],
    keywords: [
      "comprar licencia windows legitima",
      "windows genuine",
      "licencia digital"
    ],
    symptoms: [
      "No tienes licencia digital ni clave válida.",
      "Un sitio ofrece claves demasiado baratas o activadores.",
      "Necesitas regularizar un equipo antes de usarlo."
    ],
    causes: [
      "Instalación sin licencia.",
      "Compra previa no autorizada o no transferible.",
      "Clave bloqueada por incumplir términos.",
      "Confusión entre clave genérica y licencia real."
    ],
    steps: [
      "Confirma la edición que necesitas.",
      "Compra en Microsoft Store, fabricante o vendedor autorizado.",
      "Guarda comprobante y correo de confirmación.",
      "Activa desde Configuración > Sistema > Activación.",
      "Si hay error, usa soporte oficial con el comprobante."
    ],
    warnings: [
      activationNotice,
      "Evita activadores, cracks, KMS públicos y ejecutables que prometen activar Windows gratis."
    ],
    verification: [
      "Tienes comprobante de compra.",
      "La licencia coincide con tu edición.",
      "Windows se activa sin herramientas de terceros."
    ],
    references: [microsoftActivation, microsoftProductKey],
    relatedSlugs: ["como-activar-windows-11-con-una-licencia-digital"]
  })
];

function buildArticle(input: {
  title: string;
  slug: string;
  summary: string;
  categorySlug: string;
  tags: string[];
  keywords: string[];
  difficulty?: Article["difficulty"];
  appliesTo?: string[];
  backupRecommendation?: string;
  commands?: CommandSnippet[];
  steps: string[];
  causes: string[];
  symptoms: string[];
  alternatives?: string[];
  verification: string[];
  warnings?: string[];
  revertChanges?: string[];
  references?: Reference[];
  relatedSlugs?: string[];
  reviewer?: string;
  changeHistory?: string[];
}): Article {
  const commands =
    input.commands?.map((command) => ({
      ...command,
      explanation:
        command.explanation ??
        `Usa ${command.label} con una herramienta integrada de Windows o la aplicación correspondiente.`,
      expectedOutput:
        command.expectedOutput ??
        "Debe devolver información clara o completar la operación sin mostrar un error nuevo.",
      ifDifferent:
        command.ifDifferent ??
        "Si el resultado es distinto, no repitas el comando en bucle; revisa causas, permisos y alternativas."
    })) ?? [];

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
    appliesTo: input.appliesTo ?? [
      "Windows 10",
      "Windows 11",
      "Microsoft 365 o aplicaciones relacionadas cuando la guía lo indique"
    ],
    symptoms: input.symptoms,
    causes: input.causes,
    prerequisites: [
      "Guardar el trabajo abierto antes de cambiar configuración.",
      "Tener una cuenta con permisos adecuados si la solución modifica el sistema.",
      "Anotar mensajes exactos, códigos de error o capturas si el problema continúa."
    ],
    backupRecommendation:
      input.backupRecommendation ??
      "Antes de modificar configuraciones del sistema, crea un punto de restauración o confirma que tus archivos importantes estén respaldados.",
    primarySteps: input.steps,
    solutionSteps: buildSolutionSteps({
      articleSlug: input.slug,
      categorySlug: input.categorySlug,
      commands,
      steps: input.steps,
      verification: input.verification
    }),
    alternatives: input.alternatives ?? [
      "Probar con otra cuenta de Windows para descartar perfil dañado.",
      "Revisar si una política de empresa administra la configuración.",
      "Aplicar actualizaciones pendientes antes de repetir el diagnóstico."
    ],
    commands,
    warnings: input.warnings ?? [
      "No descargues reparadores desconocidos ni ejecutes comandos encontrados en foros sin entender su efecto.",
      "Si el equipo pertenece a una organización, consulta al administrador antes de cambiar políticas o seguridad."
    ],
    revertChanges: input.revertChanges ?? [
      "Si cambiaste una preferencia, vuelve a la misma pantalla y restaura el valor anterior documentado.",
      "Si instalaste o reparaste una aplicación, revisa el historial de cambios antes de desinstalar.",
      "Si el sistema queda inestable, usa el punto de restauración creado antes del procedimiento."
    ],
    verification: input.verification,
    faq: genericFaq,
    relatedSlugs: input.relatedSlugs ?? [],
    author: "Equipo editorial de Tesoluciona",
    reviewer: input.reviewer ?? "Revisión técnica pendiente de laboratorio",
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-04",
    changeHistory: input.changeHistory ?? [
      "2026-08-04: Primera versión editorial con pasos, advertencias y verificación."
    ],
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

const baseArticles: Article[] = [
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

export const articles: Article[] = [...baseArticles, ...activationArticles];

export function getArticleBySlug(slug: string) {
  return articles.find(
    (article) => article.slug === slug && article.status === "published"
  );
}
