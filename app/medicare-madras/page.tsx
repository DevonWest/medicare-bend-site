import LocalMedicarePage, { getLocalMedicareMetadata } from "@/components/LocalMedicarePage";

export const metadata = getLocalMedicareMetadata("madras");

export default function MedicareMadrasPage() {
  return <LocalMedicarePage citySlug="madras" />;
}
