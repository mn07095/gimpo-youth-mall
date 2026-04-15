"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/components/providers/CartProvider";
import { useSite } from "@/components/providers/SiteProvider";

const categories = [
  { label: "쇼핑LIVE", icon: "🛍️", href: "/products" },
  { label: "베스트", icon: "🏆", href: "/products" },
  { label: "무료배송", icon: "🚚", href: "/products" },
  { label: "제철과일", icon: "🍎", href: "/products?category=사과" },
  { label: "신선과일", icon: "🍐", href: "/products?category=배" },
  { label: "FOR YOU", icon: "✨", href: "/products" },
  { label: "공지사항", icon: "📌", href: "/support" },
  { label: "판매자 정보", icon: "🏪", href: "/brand" },
];

export function Header() {
  const { itemCount } = useCart();
  const { isLoggedIn, userName, todayVisits, totalVisits, logout, login } = useSite();

  return (
    <header className="site-header">
      <div className="container store-header">
        <div className="store-header-top">
          <button type="button" className="notify-button">
            🔔 알림받기
          </button>

          <Link href="/" className="store-logo">
            <Image src="/gimpo-youth-logo.svg" alt="김포청년몰 로고" width={240} height={108} className="store-logo-image" />
            <span className="store-logo-sub">청년이 고른 산지 직송 과일장터</span>
          </Link>

          <div className="store-header-side">
            <span className="store-stats">오늘 {todayVisits.toLocaleString()} · 전체 {totalVisits.toLocaleString()}</span>
            <div className="header-account-row">
              <Link href="/mypage" className="header-mini-link">
                마이페이지
              </Link>
              <Link href="/cart" className="header-mini-link">
                장바구니{itemCount > 0 ? ` ${itemCount}` : ""}
              </Link>
              {isLoggedIn ? (
                <button type="button" className="header-mini-link button-reset" onClick={logout}>
                  {userName}님 ▾
                </button>
              ) : (
                <button type="button" className="header-mini-link button-reset" onClick={login}>
                  로그인
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mobile-quick-bar">
          <Link href="/products" className="mobile-quick-link">
            상품
          </Link>
          <Link href="/cart" className="mobile-quick-link">
            장바구니{itemCount > 0 ? ` ${itemCount}` : ""}
          </Link>
          <Link href="/mypage" className="mobile-quick-link">
            마이페이지
          </Link>
          {isLoggedIn ? (
            <button type="button" className="mobile-quick-link button-reset" onClick={logout}>
              로그아웃
            </button>
          ) : (
            <button type="button" className="mobile-quick-link button-reset" onClick={login}>
              로그인
            </button>
          )}
        </div>

        <nav className="store-nav" aria-label="스토어 메뉴">
          {categories.map((category) => (
            <Link key={category.label} href={category.href}>
              <span>{category.icon}</span>
              {category.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
