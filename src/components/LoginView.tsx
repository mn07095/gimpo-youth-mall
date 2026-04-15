"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { useSite } from "@/components/providers/SiteProvider";

export function LoginView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useSite();
  const [email, setEmail] = useState("minseo@gimpo-youth-mall.kr");
  const [password, setPassword] = useState("1234");
  const [errorMessage, setErrorMessage] = useState("");

  const redirectTo = searchParams.get("redirect") || "/mypage";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = login({ email, password });

    if (!result.ok) {
      setErrorMessage(result.message ?? "로그인에 실패했습니다.");
      return;
    }

    router.push(redirectTo);
  };

  return (
    <div className="container auth-shell">
      <section className="form-card auth-card">
        <span className="eyebrow">회원 로그인</span>
        <h1>로그인하고 주문과 배송 내역을 관리해보세요</h1>
        <p className="auth-helper">테스트용 계정이 기본값으로 입력되어 있어요.</p>
        <form className="stack" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="loginEmail">이메일</label>
            <input id="loginEmail" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="loginPassword">비밀번호</label>
            <input
              id="loginPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
          <button type="submit" className="button">
            로그인
          </button>
          <p className="product-meta">
            아직 회원이 아니라면 <Link href="/signup">회원가입</Link>으로 이동하세요.
          </p>
        </form>
      </section>
    </div>
  );
}
