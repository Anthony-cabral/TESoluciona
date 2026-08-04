export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  sections: { heading: string; body: string[] }[];
};

const requiredOwnerFields = [
  "Razón social o nombre del titular",
  "País",
  "Dirección comercial",
  "Correo de contacto",
  "Responsable del tratamiento",
  "Proveedores utilizados",
  "Plazos de conservación",
  "Jurisdicción",
  "Fecha de vigencia"
];

function buildLegalPage(
  title: string,
  slug: string,
  description: string
): LegalPage {
  return {
    slug,
    title,
    description,
    sections: [
      {
        heading: "Estado del documento",
        body: [
          "Este documento es un borrador editable para revisión del propietario del sitio.",
          "No constituye asesoramiento legal definitivo y debe adaptarse a la legislación aplicable antes del despliegue público."
        ]
      },
      {
        heading: "Campos pendientes del propietario",
        body: requiredOwnerFields.map((field) => `Pendiente: ${field}.`)
      },
      {
        heading: "Contenido base",
        body: [
          description,
          "Tesoluciona debe mantener lenguaje claro, información verificable y mecanismos de contacto para solicitudes relacionadas con este documento."
        ]
      }
    ]
  };
}

export const legalPages = [
  buildLegalPage(
    "Sobre nosotros",
    "sobre-nosotros",
    "Tesoluciona es un portal editorial de soluciones tecnológicas, herramientas prácticas y guías paso a paso."
  ),
  buildLegalPage(
    "Contacto",
    "contacto",
    "Esta página debe incluir el correo oficial de contacto, horarios de respuesta y canales válidos para reportes editoriales o de seguridad."
  ),
  buildLegalPage(
    "Política de privacidad",
    "privacidad",
    "Debe explicar qué datos se recopilan, con qué finalidad, base legal, proveedores, conservación y derechos de las personas usuarias."
  ),
  buildLegalPage(
    "Política de cookies",
    "cookies",
    "Debe listar cookies esenciales, analíticas y publicitarias si se activan, además del mecanismo de consentimiento cuando aplique."
  ),
  buildLegalPage(
    "Términos y condiciones",
    "terminos",
    "Debe definir reglas de uso, límites de responsabilidad, propiedad intelectual, disponibilidad del servicio y jurisdicción."
  ),
  buildLegalPage(
    "Aviso legal",
    "aviso-legal",
    "Debe identificar al titular, datos de contacto, responsabilidad editorial y condiciones básicas de uso del sitio."
  ),
  buildLegalPage(
    "Política de copyright",
    "copyright",
    "Debe explicar titularidad de contenidos, usos permitidos, atribución y procedimiento para solicitar retiro o corrección."
  ),
  buildLegalPage(
    "DMCA",
    "dmca",
    "Debe definir el canal para notificaciones de infracción de derechos de autor y la información requerida para procesarlas."
  ),
  buildLegalPage(
    "Transparencia editorial",
    "transparencia-editorial",
    "Debe explicar cómo se seleccionan temas, cómo se revisan fuentes, cómo se actualiza contenido y cómo se corrigen errores."
  ),
  buildLegalPage(
    "Política de correcciones",
    "politica-correcciones",
    "Debe describir cómo reportar imprecisiones, tiempos de revisión y cómo se comunican cambios relevantes."
  ),
  buildLegalPage(
    "Preferencias de privacidad",
    "preferencias-privacidad",
    "Debe permitir gestionar consentimiento y preferencias cuando se activen analítica, publicidad o proveedores externos."
  )
];

export function getLegalPage(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}
