export default function BrandPage() {
  return (
    <main className="page-shell">
      <div className="container stack">
        <section className="banner-card">
          <span className="eyebrow" style={{ background: "rgba(255,255,255,0.18)", color: "white" }}>
            BRAND STORY
          </span>
          <h1>김포청년몰은 누가, 왜, 어떻게 고르는지 보여주는 과일 마켓입니다</h1>
          <p>
            상품만 진열하는 쇼핑몰보다 한 걸음 더 나아가, 김포 지역 청년 상인의 감도와 산지 연결의 신뢰를 함께
            전달하는 브랜드형 커머스를 목표로 합니다.
          </p>
        </section>

        <section className="story-band">
          <article className="story-card">
            <h3>김포의 청년 상인</h3>
            <p>
              누가 고른 상품인지 보이지 않으면 브랜드가 약해집니다. 김포청년몰은 생산자와 판매자를 숨기지 않고 브랜드
              얼굴로 드러내는 방향을 기본으로 둡니다.
            </p>
          </article>
          <article className="story-card">
            <h3>산지와 연결되는 구조</h3>
            <p>
              원산지, 수확 시기, 출고 방식, 옵션 구성을 상품상세 페이지에서 한눈에 확인할 수 있게 설계해 신뢰를
              높입니다.
            </p>
          </article>
        </section>

        <section className="trust-grid">
          <article>
            <h3>로컬 감도</h3>
            <p>김포라는 지역명을 단순 주소가 아니라 브랜드 언어로 활용합니다.</p>
          </article>
          <article>
            <h3>청년 스토리</h3>
            <p>판매자 소개, 산지 이야기, 추천 큐레이션이 사이트 곳곳에 들어갑니다.</p>
          </article>
          <article>
            <h3>정직한 정보</h3>
            <p>과일의 크기, 중량, 보관법, 배송 흐름을 구매 전에 분명히 안내합니다.</p>
          </article>
          <article>
            <h3>직관적 구매</h3>
            <p>복잡하지 않은 옵션 선택과 주문 흐름으로 실제 구매 전환을 높입니다.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
