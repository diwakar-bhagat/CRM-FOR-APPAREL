import { OrderDetails } from "@/components/orders/order-details";

export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6 max-w-[1600px]">
      <OrderDetails orderId={params.id} />
    </div>
  );
}
