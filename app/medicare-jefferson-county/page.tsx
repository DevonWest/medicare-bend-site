import CountyMedicarePage, { getCountyMedicareMetadata } from "@/components/CountyMedicarePage";

export const metadata = getCountyMedicareMetadata("jefferson-county");

export default function MedicareJeffersonCountyPage() {
  return <CountyMedicarePage countySlug="jefferson-county" />;
}
