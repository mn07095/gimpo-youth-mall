import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="page-shell">
      <div className="container" style={{ maxWidth: "760px" }}>
        <section className="form-card">
          <span className="eyebrow">회원가입</span>
          <h1>김포청년몰 멤버가 되어 주문과 배송을 더 편하게 관리하세요</h1>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="signupName">이름</label>
              <input id="signupName" />
            </div>
            <div className="field">
              <label htmlFor="signupPhone">연락처</label>
              <input id="signupPhone" />
            </div>
            <div className="field">
              <label htmlFor="signupEmail">이메일</label>
              <input id="signupEmail" />
            </div>
            <div className="field">
              <label htmlFor="signupPassword">비밀번호</label>
              <input id="signupPassword" type="password" />
            </div>
          </div>
          <div className="detail-actions" style={{ marginTop: "1.5rem" }}>
            <Link href="/mypage" className="button">
              가입 완료
            </Link>
            <Link href="/login" className="button button-outline">
              로그인으로 이동
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
