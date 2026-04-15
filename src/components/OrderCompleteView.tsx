"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function OrderCompleteView() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "YM-DEMO";

  return (
    <div className="container" style={{ maxWidth: "840px" }}>
      <section className="banner-card">
        <span className="eyebrow" style={{ background: "rgba(255,255,255,0.18)", color: "white" }}>
          주문 완료
        </span>
        <h1>주문이 접수되었습니다</h1>
        <p>주문번호를 확인하고 계속 쇼핑하거나 주문내역으로 이동할 수 있어요.</p>
        <div className="inline-list">
          <span className="inline-pill">주문번호 {orderId}</span>
          <span className="inline-pill">상태 상품 준비중</span>
        </div>
      </section>

      <section className="section">
        <div className="detail-actions" style={{ marginTop: 0 }}>
          <Link href="/mypage" className="button">
            주문내역 보기
          </Link>
          <Link href="/products" className="button button-outline">
            계속 쇼핑
          </Link>
        </div>
      </section>
    </div>
  );
}
