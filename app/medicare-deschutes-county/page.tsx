import CountyMedicarePage, { getCountyMedicareMetadata } from "@/components/CountyMedicarePage";

export const metadata = getCountyMedicareMetadata("deschutes-county");

export default function MedicareDeschutesCountyPage() {
  return <CountyMedicarePage countySlug="deschutes-county" />;
}
