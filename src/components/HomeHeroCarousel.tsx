"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    badge: "🏆 재구매율 높은 대표 상품",
    kicker: "GIMPO YOUTH MARKET",
    title: ["아삭한 햇사과", "김포청년몰에서 바로"],
    description: "선물용부터 가정용까지, 보기 쉽게 고르고 가볍게 주문해보세요.",
    note: "🍎 오늘 가장 많이 찾는 대표 과일",
    href: "/products/gimpo-apple-gift",
    image:
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=1600&q=80",
    align: "center",
  },
  {
    badge: "🚚 무료배송 베스트",
    kicker: "FRESH PICK",
    title: ["시원한 과즙 한가득", "배 산지직송 박스"],
    description: "큰 과일 위주로 선별해 실속 있게 담은 배 인기 구성입니다.",
    note: "🍐 산지 선별 후 빠른 발송",
    href: "/products/gimpo-pear-farm-box",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=1600&q=80",
    align: "left",
  },
  {
    badge: "✨ 시즌 인기 과일",
    kicker: "TODAY'S MARKET",
    title: ["달콤한 딸기와 감귤", "한 번에 고르기"],
    description: "제철 과일을 한눈에 비교할 수 있게 인기 품목을 더 넓게 준비했어요.",
    note: "🍓 감귤 · 딸기 · 포도까지 품목 확장",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1600&q=80",
    align: "right",
  },
];

export function HomeHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <div className="store-hero-banner">
      <div
        className={`store-hero-photo align-${activeSlide.align}`}
        style={{ backgroundImage: `url(${activeSlide.image})` }}
      >
        <div className="store-hero-overlay">
          <div className="store-hero-copy">
            <span className="hero-pill">{activeSlide.badge}</span>
            <span className="hero-kicker">{activeSlide.kicker}</span>
            <h1>
              {activeSlide.title[0]}
              <br />
              {activeSlide.title[1]}
            </h1>
            <p>{activeSlide.description}</p>
            <div className="hero-inline-note">{activeSlide.note}</div>
            <Link href={activeSlide.href} className="hero-cta">
              지금 보러가기
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-dots" aria-label="메인 배너 선택">
        {slides.map((slide, index) => (
          <button
            key={slide.kicker}
            type="button"
            className={index === activeIndex ? "hero-dot is-active" : "hero-dot"}
            onClick={() => setActiveIndex(index)}
            aria-label={`${index + 1}번 배너 보기`}
          />
        ))}
      </div>
    </div>
  );
}
