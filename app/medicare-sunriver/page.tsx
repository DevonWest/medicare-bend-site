import LocalMedicarePage, { getLocalMedicareMetadata } from "@/components/LocalMedicarePage";

export const metadata = getLocalMedicareMetadata("sunriver");

export default function MedicareSunriverPage() {
  return <LocalMedicarePage citySlug="sunriver" />;
}
