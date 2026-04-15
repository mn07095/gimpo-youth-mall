"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Product } from "@/data/products";

import { useCart } from "@/components/providers/CartProvider";
import { useSite } from "@/components/providers/SiteProvider";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isLoggedIn } = useSite();
  const [selectedOption, setSelectedOption] = useState(product.options[0]?.label ?? "");
  const [quantity, setQuantity] = useState(1);

  const currentOption = product.options.find((option) => option.label === selectedOption) ?? product.options[0];
  const totalPrice = (currentOption?.price ?? product.price) * quantity;

  const addToCart = () => {
    if (!currentOption) return;

    addItem({
      productSlug: product.slug,
      optionLabel: currentOption.label,
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/checkout");
      return;
    }

    addToCart();
    router.push("/checkout");
  };

  return (
    <div className="purchase-box">
      <div className="field">
        <label htmlFor="optionSelect">옵션 선택</label>
        <select id="optionSelect" value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}>
          {product.options.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label} · {option.price.toLocaleString()}원
            </option>
          ))}
        </select>
      </div>

      <div className="quantity-row">
        <span>수량</span>
        <div className="quantity-box">
          <button type="button" className="count-button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
            -
          </button>
          <strong className="count-value">{quantity}</strong>
          <button type="button" className="count-button" onClick={() => setQuantity((value) => value + 1)}>
            +
          </button>
        </div>
      </div>

      <div className="purchase-total">
        <span>총 결제예정금액</span>
        <strong>{totalPrice.toLocaleString()}원</strong>
      </div>

      <div className="purchase-actions purchase-actions-wide">
        <button type="button" className="button button-outline" onClick={addToCart}>
          장바구니
        </button>
        <button type="button" className="button" onClick={handleBuyNow}>
          구매하기
        </button>
      </div>
    </div>
  );
}
