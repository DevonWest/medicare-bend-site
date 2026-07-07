import LocalMedicarePage, { getLocalMedicareMetadata } from "@/components/LocalMedicarePage";

export const metadata = getLocalMedicareMetadata("redmond");

export default function MedicareRedmondPage() {
  return <LocalMedicarePage citySlug="redmond" />;
}
