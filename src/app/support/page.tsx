export default function SupportPage() {
  return (
    <main className="page-shell">
      <div className="container stack">
        <section className="page-panel">
          <span className="eyebrow">고객안내</span>
          <h1>배송, 교환, 환불, 문의 흐름을 한곳에서 정리합니다</h1>
          <p>
            실제 운영 단계에서는 사업자 정보, 고객센터 시간, 배송사 정책, 교환/환불 기준을 정확한 문구로 바꾸면
            됩니다. 지금은 구조를 먼저 잡아둔 상태입니다.
          </p>
        </section>

        <section className="trust-grid">
          <article>
            <h3>배송 안내</h3>
            <p>오전 주문 건은 당일 선별 출고를 기본 원칙으로 하며, 지역에 따라 도착일이 달라질 수 있습니다.</p>
          </article>
          <article>
            <h3>교환 / 환불</h3>
            <p>신선식품 특성상 단순 변심은 제한될 수 있으며, 상품 이상 시 빠르게 접수할 수 있는 안내가 필요합니다.</p>
          </article>
          <article>
            <h3>자주 묻는 질문</h3>
            <p>보관 방법, 숙성 상태, 옵션 차이, 선물 포장 가능 여부 같은 질문을 정리합니다.</p>
          </article>
          <article>
            <h3>1:1 문의</h3>
            <p>주문 전 문의와 배송 후 문의를 구분해서 받을 수 있도록 추후 폼 또는 게시판을 연결합니다.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
