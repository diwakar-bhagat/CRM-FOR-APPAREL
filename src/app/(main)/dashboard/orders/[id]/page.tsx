import { OrderDetails } from "@/components/orders/order-details";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="container mx-auto py-6 max-w-[1600px]">
      <OrderDetails orderId={id} />
    </div>
  );
}
