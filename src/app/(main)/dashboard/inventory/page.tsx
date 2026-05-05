import { OperationsScreen } from "@/components/cta/operations-screen";

export default function InventoryPage() {
  return (
    <OperationsScreen
      mode="inventory"
      title="Fabric and Trim Inventory"
      description="Inventory health, stock pressure, and supplier coverage."
    />
  );
}
