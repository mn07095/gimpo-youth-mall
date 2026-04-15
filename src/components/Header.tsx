"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
                <div className="account-dropdown" ref={menuRef}>
                  <button
                    type="button"
                    className="header-mini-link account-dropdown-trigger button-reset"
                    onClick={() => setIsMenuOpen((value) => !value)}
                  >
                    {userName}님 ▾
                  </button>
                  {isMenuOpen ? (
                    <div className="account-dropdown-menu">
                      <Link href="/mypage" className="account-dropdown-item" onClick={() => setIsMenuOpen(false)}>
                        마이페이지
                      </Link>
                      <Link href="/mypage/profile" className="account-dropdown-item" onClick={() => setIsMenuOpen(false)}>
                        회원정보수정
                      </Link>
                      <button
                        type="button"
                        className="account-dropdown-item button-reset"
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                      >
                        로그아웃
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  <Link href="/login" className="header-mini-link">
                    로그인
                  </Link>
                  <Link href="/signup" className="header-mini-link">
                    회원가입
                  </Link>
                </>
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
          <Link href={isLoggedIn ? "/mypage" : "/login"} className="mobile-quick-link">
            {isLoggedIn ? "마이페이지" : "로그인"}
          </Link>
          {isLoggedIn ? (
            <button type="button" className="mobile-quick-link button-reset" onClick={logout}>
              로그아웃
            </button>
          ) : (
            <Link href="/signup" className="mobile-quick-link">
              회원가입
            </Link>
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
