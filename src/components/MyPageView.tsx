"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DemoOrder = {
  id: string;
  createdAt: string;
  totalAmount: number;
  recipientName: string;
  address: string;
  status: string;
  items: Array<{
    name: string;
    optionLabel: string;
    quantity: number;
    totalPrice: number;
  }>;
};

const ORDER_STORAGE_KEY = "gimpo-youth-mall-orders";

export function MyPageView() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return;

    try {
      setOrders(JSON.parse(raw) as DemoOrder[]);
    } catch {
      window.localStorage.removeItem(ORDER_STORAGE_KEY);
    }
  }, []);

  return (
    <div className="container stack">
      <section className="banner-card">
        <span className="eyebrow" style={{ background: "rgba(255,255,255,0.18)", color: "white" }}>
          MY PAGE
        </span>
        <h1>주문 내역</h1>
        <p>최근 주문과 배송 상태를 한눈에 확인할 수 있습니다.</p>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span>주문 수</span>
          <strong>{orders.length}건</strong>
        </article>
        <article className="stat-card">
          <span>최근 상태</span>
          <strong>{orders[0]?.status ?? "없음"}</strong>
        </article>
        <article className="stat-card">
          <span>수령인</span>
          <strong>{orders[0]?.recipientName ?? "미등록"}</strong>
        </article>
      </section>

      <section className="content-grid">
        <article className="form-card">
          <h2>최근 주문</h2>
          <div className="stack">
            {orders.length === 0 ? (
              <div className="option-item">
                <div>
                  <strong>주문 내역이 없습니다</strong>
                  <p className="product-meta">상품을 주문하면 이곳에서 최근 주문을 확인할 수 있어요.</p>
                </div>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="option-item">
                  <div>
                    <strong>{order.items[0]?.name ?? "주문 상품"}</strong>
                    <p className="product-meta">
                      {order.id} · {order.status}
                    </p>
                  </div>
                  <strong>{order.totalAmount.toLocaleString()}원</strong>
                </div>
              ))
            )}
          </div>
        </article>

        <aside className="summary-card">
          <h3>바로가기</h3>
          <div className="stack">
            <Link href="/products" className="button">
              상품 보기
            </Link>
            <Link href="/support" className="button button-outline">
              고객안내
            </Link>
            <Link href="/brand" className="button button-outline">
              브랜드 소개
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
