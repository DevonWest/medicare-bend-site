import LocalMedicarePage, { getLocalMedicareMetadata } from "@/components/LocalMedicarePage";

export const metadata = getLocalMedicareMetadata("sisters");

export default function MedicareSistersPage() {
  return <LocalMedicarePage citySlug="sisters" />;
}
