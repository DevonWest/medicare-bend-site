import LocalMedicarePage, { getLocalMedicareMetadata } from "@/components/LocalMedicarePage";

export const metadata = getLocalMedicareMetadata("prineville");

export default function MedicarePrinevillePage() {
  return <LocalMedicarePage citySlug="prineville" />;
}
