"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { getCartDisplayItems, useCart } from "@/components/providers/CartProvider";

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

export function CheckoutView() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const displayItems = getCartDisplayItems(items);
  const subtotal = displayItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = displayItems.length > 0 && subtotal < 30000 ? 3000 : 0;
  const total = subtotal + shipping;

  const [recipientName, setRecipientName] = useState("김포 청년");
  const [address, setAddress] = useState("경기도 김포시 청년로 12");
  const [detailAddress, setDetailAddress] = useState("101동 1203호");

  const handlePlaceOrder = () => {
    if (displayItems.length === 0) {
      router.push("/products");
      return;
    }

    const nextOrder: DemoOrder = {
      id: `YM-${Date.now()}`,
      createdAt: new Date().toISOString(),
      totalAmount: total,
      recipientName,
      address: `${address} ${detailAddress}`.trim(),
      status: "상품 준비중",
      items: displayItems.map((item) => ({
        name: item.product.name,
        optionLabel: item.optionLabel,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })),
    };

    const raw = window.localStorage.getItem(ORDER_STORAGE_KEY);
    const currentOrders = raw ? ((JSON.parse(raw) as DemoOrder[]) ?? []) : [];
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([nextOrder, ...currentOrders]));
    clearCart();
    router.push(`/order/complete?orderId=${nextOrder.id}`);
  };

  return (
    <div className="container content-grid">
      <section className="stack">
        <article className="form-card">
          <span className="eyebrow">주문 / 결제</span>
          <h1>배송 정보 입력</h1>
          <p>받는 분 정보만 입력하면 주문할 수 있어요.</p>
        </article>

        <article className="form-card">
          <h2>배송 정보</h2>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="recipientName">수령인</label>
              <input id="recipientName" value={recipientName} onChange={(event) => setRecipientName(event.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="recipientPhone">연락처</label>
              <input id="recipientPhone" defaultValue="010-1234-5678" />
            </div>
            <div className="field">
              <label htmlFor="address">주소</label>
              <input id="address" value={address} onChange={(event) => setAddress(event.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="detailAddress">상세주소</label>
              <input
                id="detailAddress"
                value={detailAddress}
                onChange={(event) => setDetailAddress(event.target.value)}
              />
            </div>
          </div>
        </article>
      </section>

      <aside className="summary-card order-summary">
        <h3>주문 상품</h3>
        <div className="cart-list">
          {displayItems.length === 0 ? (
            <div className="option-item">
              <span>장바구니가 비어 있습니다</span>
            </div>
          ) : (
            displayItems.map((item) => (
              <div key={`${item.productSlug}-${item.optionLabel}`} className="option-item">
                <div>
                  <strong>{item.product.name}</strong>
                  <p className="product-meta">
                    {item.optionLabel} · 수량 {item.quantity}
                  </p>
                </div>
                <strong>{item.totalPrice.toLocaleString()}원</strong>
              </div>
            ))
          )}
        </div>
        <div className="summary-rows">
          <div className="summary-row">
            <span>상품 금액</span>
            <strong>{subtotal.toLocaleString()}원</strong>
          </div>
          <div className="summary-row">
            <span>배송비</span>
            <strong>{shipping.toLocaleString()}원</strong>
          </div>
        </div>
        <div className="summary-total">
          <span>총 결제금액</span>
          <strong>{total.toLocaleString()}원</strong>
        </div>
        <div className="summary-actions">
          <button type="button" className="button" onClick={handlePlaceOrder}>
            결제 진행
          </button>
        </div>
      </aside>
    </div>
  );
}
