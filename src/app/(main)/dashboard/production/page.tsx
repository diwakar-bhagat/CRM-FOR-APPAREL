import { OperationsScreen } from "@/components/cta/operations-screen";

export default function ProductionPage() {
  return (
    <OperationsScreen
      mode="production"
      title="Production and WIP"
      description="Live production queue and WIP status by style."
    />
  );
}
