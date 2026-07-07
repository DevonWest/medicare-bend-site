import LocalMedicarePage, { getLocalMedicareMetadata } from "@/components/LocalMedicarePage";

export const metadata = getLocalMedicareMetadata("bend");

export default function MedicareBendPage() {
  return <LocalMedicarePage citySlug="bend" />;
}
