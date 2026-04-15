"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useSite } from "@/components/providers/SiteProvider";

export function ProfileView() {
  const router = useRouter();
  const { isLoggedIn, userName, updateProfile } = useSite();
  const [name, setName] = useState(userName);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setName(userName);
  }, [userName]);

  if (!isLoggedIn) {
    return (
      <div className="container auth-shell">
        <section className="form-card auth-card">
          <span className="eyebrow">로그인 필요</span>
          <h1>회원정보 수정은 로그인 후 이용할 수 있어요</h1>
        </section>
      </div>
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = updateProfile({ name, phone });
    if (!result.ok) {
      setMessage(result.message ?? "저장에 실패했습니다.");
      return;
    }
    setMessage("회원정보를 저장했어요.");
    router.push("/mypage");
  };

  return (
    <div className="container auth-shell">
      <section className="form-card auth-card auth-card-wide">
        <span className="eyebrow">회원정보수정</span>
        <h1>내 정보를 수정하고 주문에 사용할 기본 정보를 관리하세요</h1>
        <form className="stack" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="profileName">이름</label>
              <input id="profileName" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="profilePhone">연락처</label>
              <input id="profilePhone" value={phone} onChange={(event) => setPhone(event.target.value)} />
            </div>
          </div>
          {message ? <p className="auth-helper">{message}</p> : null}
          <div className="auth-actions">
            <button type="submit" className="button">
              저장하기
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
