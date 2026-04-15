import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const discountRate = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-image-wrap">
        <Image src={product.image} alt={product.name} width={600} height={600} className="product-image" />
      </Link>
      <div className="product-body">
        <span className="eyebrow">{product.badge}</span>
        <Link href={`/products/${product.slug}`} className="product-title">
          {product.name}
        </Link>
        <p className="product-summary">{product.summary}</p>
        <div className="product-price-row">
          <span className="discount-rate">{discountRate}%</span>
          <strong>{product.price.toLocaleString()}원</strong>
        </div>
        <p className="product-origin">{product.origin}</p>
        <p className="product-meta">
          리뷰 {product.reviewCount} · 평점 {product.rating}
        </p>
      </div>
    </article>
  );
}
