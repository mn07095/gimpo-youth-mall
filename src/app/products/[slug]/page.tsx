import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { getProductBySlug, products } from "@/data/products";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const discountRate = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const recommendedProducts = products.filter((item) => item.slug !== product.slug).slice(0, 4);

  return (
    <main className="page-shell">
      <div className="container product-detail-shell">
        <section className="product-detail-media">
          <Image
            src={product.image}
            alt={product.name}
            width={1200}
            height={1200}
            className="product-detail-image"
          />
        </section>

        <aside className="product-detail-buy">
          <span className="eyebrow">{product.badge}</span>
          <h1>{product.name}</h1>
          <p className="product-meta">
            리뷰 {product.reviewCount} · 평점 {product.rating}
          </p>

          <div className="price-box">
            <div className="price-line">
              <span className="discount-rate">{discountRate}%</span>
              <strong className="main-price">{product.price.toLocaleString()}원</strong>
            </div>
            <p className="strike-price">{product.originalPrice.toLocaleString()}원</p>
          </div>

          <div className="detail-facts">
            <div className="fact-row">
              <span>원산지</span>
              <strong>{product.origin}</strong>
            </div>
            <div className="fact-row">
              <span>배송</span>
              <strong>{product.shipping}</strong>
            </div>
            <div className="fact-row">
              <span>수확시기</span>
              <strong>{product.harvest}</strong>
            </div>
          </div>

          <ProductPurchasePanel product={product} />
        </aside>
      </div>

      <section className="section">
        <div className="container detail-bottom-grid">
          <div className="page-panel">
            <div className="detail-tabs">
              <a href="#details" className="detail-tab">
                상세정보
              </a>
              <a href="#reviews" className="detail-tab">
                리뷰 {product.reviewCount}
              </a>
              <a href="#qna" className="detail-tab">
                Q&A {product.qna.length}
              </a>
              <a href="#seller" className="detail-tab">
                판매자 정보
              </a>
              <a href="#recommend" className="detail-tab">
                추천
              </a>
            </div>

            <section id="details" className="detail-content-block">
              <h2>상품 정보</h2>
              <div className="info-table">
                <div className="info-row">
                  <span>상품명</span>
                  <strong>{product.name}</strong>
                </div>
                <div className="info-row">
                  <span>원산지</span>
                  <strong>{product.origin}</strong>
                </div>
                <div className="info-row">
                  <span>특징</span>
                  <strong>{product.summary}</strong>
                </div>
                <div className="info-row">
                  <span>수확시기</span>
                  <strong>{product.harvest}</strong>
                </div>
              </div>

              <div className="detail-story">
                <div className="detail-story-head">
                  <span className="detail-story-logo">김포청년몰</span>
                  <span className="hero-pill detail-pill">신선보장 · 오늘 출고</span>
                </div>
                <p className="detail-story-copy">{product.description}</p>
                <h3 className="detail-story-title">
                  유통거품은 줄이고
                  <br />
                  신선도는 그대로 담았습니다
                </h3>
                <div className="detail-image-stack">
                  {product.detailImages.map((image) => (
                    <div key={image} className="detail-image-card">
                      <Image src={image} alt={product.name} width={1400} height={980} className="detail-stack-image" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="reviews" className="detail-content-block">
              <h2>리뷰</h2>
              <div className="review-list">
                {product.reviews.map((review) => (
                  <article key={`${review.author}-${review.date}`} className="review-card">
                    <div className="review-head">
                      <strong>{review.author}</strong>
                      <span>
                        {"★".repeat(review.rating)} · {review.date}
                      </span>
                    </div>
                    <p>{review.content}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="qna" className="detail-content-block">
              <h2>Q&A</h2>
              <div className="review-list">
                {product.qna.map((entry) => (
                  <article key={entry.question} className="review-card">
                    <div className="review-head">
                      <strong>Q. {entry.question}</strong>
                    </div>
                    <p>A. {entry.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="seller" className="detail-content-block">
              <h2>판매자 정보</h2>
              <div className="info-table">
                <div className="info-row">
                  <span>판매자</span>
                  <strong>김포청년몰 협력 농가</strong>
                </div>
                <div className="info-row">
                  <span>문의</span>
                  <strong>평일 10:00 - 18:00</strong>
                </div>
                <div className="info-row">
                  <span>배송정책</span>
                  <strong>품목별 신선 포장 발송</strong>
                </div>
              </div>
            </section>
          </div>

          <aside id="recommend" className="summary-card">
            <h3>추천 상품</h3>
            <div className="cart-list">
              {recommendedProducts.map((item) => (
                <div key={item.slug} className="option-item">
                  <Link href={`/products/${item.slug}`}>{item.name}</Link>
                  <strong>{item.price.toLocaleString()}원</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
