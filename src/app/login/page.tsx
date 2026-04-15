import { Suspense } from "react";

import { LoginView } from "@/components/LoginView";

export default function LoginPage() {
  return (
    <main className="page-shell">
      <Suspense
        fallback={
          <div className="container auth-shell">
            <section className="form-card auth-card">
              <span className="eyebrow">회원 로그인</span>
              <h1>로그인 화면을 불러오는 중입니다</h1>
            </section>
          </div>
        }
      >
        <LoginView />
      </Suspense>
    </main>
  );
}
