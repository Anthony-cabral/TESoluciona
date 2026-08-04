import { LegalPage } from "@/components/legal/legal-page";
import { getLegalPage } from "@/features/legal/legal-pages";

export default function Page() {
  return <LegalPage page={getLegalPage("dmca")!} />;
}
