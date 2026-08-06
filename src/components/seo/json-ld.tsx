import { headers } from "next/headers";

type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

type JsonLdProps = {
  data: JsonLdValue;
};

export async function JsonLd({ data }: JsonLdProps) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <script
      nonce={nonce}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
