import LocalMedicarePage, { getLocalMedicareMetadata } from "@/components/LocalMedicarePage";

export const metadata = getLocalMedicareMetadata("la-pine");

export default function MedicareLaPinePage() {
  return <LocalMedicarePage citySlug="la-pine" />;
}
