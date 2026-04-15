"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { getCartDisplayItems, useCart } from "@/components/providers/CartProvider";
import { useSite } from "@/components/providers/SiteProvider";

export function CartView() {
  const router = useRouter();
  const { items, updateQuantity, removeItem } = useCart();
  const { isLoggedIn } = useSite();
  const displayItems = getCartDisplayItems(items);
  const subtotal = displayItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = displayItems.length > 0 && subtotal < 30000 ? 3000 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (displayItems.length === 0) return;
    if (!isLoggedIn) {
      router.push("/login?redirect=/checkout");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="container content-grid cart-layout">
      <section className="cart-panel page-panel">
        <div className="section-head cart-head">
          <div>
            <h2>장바구니</h2>
            <p>{displayItems.length}개 상품</p>
          </div>
        </div>

        {displayItems.length === 0 ? (
          <article className="empty-state">
            <div className="empty-state-mark">0</div>
            <strong>장바구니가 비어 있어요</strong>
            <p>상품을 둘러보고 마음에 드는 과일을 담아보세요.</p>
            <Link href="/products" className="button">
              상품 보러가기
            </Link>
          </article>
        ) : (
          <div className="cart-list">
            {displayItems.map((item) => (
              <article key={`${item.productSlug}-${item.optionLabel}`} className="cart-item">
                <div
                  className="cart-thumb"
                  style={{
                    backgroundImage: `url(${item.product.image})`,
                  }}
                />
                <div className="stack">
                  <div className="cart-copy">
                    <strong>{item.product.name}</strong>
                    <p className="product-origin">{item.optionLabel}</p>
                  </div>
                  <div className="cart-controls">
                    <button
                      type="button"
                      className="count-button"
                      onClick={() => updateQuantity(item.productSlug, item.optionLabel, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="count-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="count-button"
                      onClick={() => updateQuantity(item.productSlug, item.optionLabel, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => removeItem(item.productSlug, item.optionLabel)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <strong className="cart-price">{item.totalPrice.toLocaleString()}원</strong>
              </article>
            ))}
          </div>
        )}
      </section>

      <aside className="summary-card order-summary">
        <h3>주문 요약</h3>
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
          <Link href="/products" className="button button-outline">
            계속 쇼핑
          </Link>
          <button type="button" className={`button${displayItems.length === 0 ? " button-disabled" : ""}`} onClick={handleCheckout}>
            주문하기
          </button>
        </div>
      </aside>
    </div>
  );
}
