import { Suspense } from "react";

import { OrderCompleteView } from "@/components/OrderCompleteView";

export default function OrderCompletePage() {
  return (
    <main className="page-shell">
      <Suspense fallback={<div className="container">주문 정보를 불러오는 중입니다...</div>}>
        <OrderCompleteView />
      </Suspense>
    </main>
  );
}
