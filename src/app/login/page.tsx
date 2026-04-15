import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="page-shell">
      <div className="container" style={{ maxWidth: "620px" }}>
        <section className="form-card">
          <span className="eyebrow">회원 로그인</span>
          <h1>다시 오신 걸 환영합니다</h1>
          <div className="stack">
            <div className="field">
              <label htmlFor="loginEmail">이메일</label>
              <input id="loginEmail" placeholder="you@example.com" />
            </div>
            <div className="field">
              <label htmlFor="loginPassword">비밀번호</label>
              <input id="loginPassword" type="password" placeholder="비밀번호를 입력하세요" />
            </div>
            <Link href="/mypage" className="button">
              로그인
            </Link>
            <p className="product-meta">
              아직 회원이 아니라면 <Link href="/signup">회원가입</Link>으로 이동하세요.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
