"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useSite } from "@/components/providers/SiteProvider";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useSite();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = signup({ name, phone, email, password });

    if (!result.ok) {
      setErrorMessage(result.message ?? "회원가입에 실패했습니다.");
      return;
    }

    router.push("/mypage");
  };

  return (
    <main className="page-shell">
      <div className="container auth-shell">
        <section className="form-card auth-card auth-card-wide">
          <span className="eyebrow">회원가입</span>
          <h1>김포청년몰 회원으로 가입하고 주문과 배송을 한 번에 관리하세요</h1>
          <form className="stack" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="signupName">이름</label>
                <input id="signupName" value={name} onChange={(event) => setName(event.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="signupPhone">연락처</label>
                <input id="signupPhone" value={phone} onChange={(event) => setPhone(event.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="signupEmail">이메일</label>
                <input id="signupEmail" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="signupPassword">비밀번호</label>
                <input
                  id="signupPassword"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
            </div>
            {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
            <div className="auth-actions">
              <button type="submit" className="button">
                가입 완료
              </button>
              <Link href="/login" className="button button-outline">
                로그인으로 이동
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
