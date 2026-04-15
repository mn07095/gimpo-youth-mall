import Link from "next/link";

import { HomeHeroCarousel } from "@/components/HomeHeroCarousel";

export default function HomePage() {
  return (
    <main className="home-page store-home">
      <section className="store-hero">
        <div className="container">
          <HomeHeroCarousel />
        </div>
      </section>

      <section className="store-benefit">
        <div className="container">
          <div className="benefit-strip">
            <span>🎁 첫 구매 고객도 품목별로 바로 비교할 수 있게 정리했어요</span>
            <strong>무료 교환·반품 안내 운영</strong>
          </div>
        </div>
      </section>

      <section className="store-quick-links">
        <div className="container quick-link-grid">
          <Link href="/products" className="quick-link-card">
            <em>🍓</em>
            <strong>전체 상품</strong>
            <span>과일 한눈에 보기</span>
          </Link>
          <Link href="/products?category=사과" className="quick-link-card">
            <em>🍎</em>
            <strong>사과 모아보기</strong>
            <span>대표 상품 빠르게 확인</span>
          </Link>
          <Link href="/products?category=배" className="quick-link-card">
            <em>🍐</em>
            <strong>배 모아보기</strong>
            <span>산지 직송 상품 보기</span>
          </Link>
          <Link href="/products?category=딸기" className="quick-link-card">
            <em>🍓</em>
            <strong>딸기 모아보기</strong>
            <span>시즌 인기 품목 확인</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
