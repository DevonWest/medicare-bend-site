import CountyMedicarePage, { getCountyMedicareMetadata } from "@/components/CountyMedicarePage";

export const metadata = getCountyMedicareMetadata("crook-county");

export default function MedicareCrookCountyPage() {
  return <CountyMedicarePage countySlug="crook-county" />;
}
