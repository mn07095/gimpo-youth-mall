# 김포청년몰 개발 구조 및 DB 설계 초안

## 1. 개발 목표

김포청년몰은 실제 주문이 가능한 과일 판매 홈페이지로 구축한다.

필수 요구사항:

- 상품 목록 조회
- 상품 상세 조회
- 옵션 선택
- 장바구니 담기
- 주문 생성
- 실제 결제 연동
- 주문내역 확인
- 관리자 상품 관리

## 2. 추천 기술 구조

혼자 진행하는 프로젝트 기준 추천:

- 프론트엔드: Next.js
- 스타일링: CSS Module 또는 Tailwind CSS
- 백엔드: Next.js Route Handler 또는 Server Action 기반
- 데이터베이스: PostgreSQL 또는 Supabase
- 인증: Supabase Auth 또는 NextAuth 계열
- 스토리지: 상품 이미지 저장용 클라우드 스토리지
- 결제: 국내 PG 연동

## 3. 페이지 경로 설계

### 사용자 페이지

- `/`
- `/products`
- `/products/[slug]`
- `/cart`
- `/checkout`
- `/order/complete`
- `/login`
- `/signup`
- `/mypage`
- `/mypage/orders`
- `/mypage/wishlist`
- `/brand`
- `/support`

### 관리자 페이지

- `/admin`
- `/admin/products`
- `/admin/products/new`
- `/admin/orders`
- `/admin/notices`

## 4. 주요 기능 흐름

### 상품 탐색 흐름

1. 사용자가 메인 또는 카테고리 메뉴에서 상품목록으로 이동
2. 상품 카드 클릭
3. 상세페이지에서 옵션과 수량 선택
4. 장바구니 또는 바로구매 선택

### 장바구니 흐름

1. 선택한 상품을 장바구니에 추가
2. 장바구니에서 수량 변경
3. 옵션 변경 또는 삭제
4. 주문하기 버튼으로 checkout 이동

### 주문 흐름

1. 배송지 입력
2. 주문 상품 및 금액 확인
3. 결제수단 선택
4. 결제 요청
5. 결제 성공 시 주문 저장 및 상태 생성
6. 주문완료 페이지 이동

## 5. 핵심 테이블 설계

### users

- id
- email
- password_hash 또는 auth_provider_id
- name
- phone
- created_at
- updated_at

### addresses

- id
- user_id
- recipient_name
- phone
- zip_code
- address1
- address2
- delivery_memo
- is_default
- created_at

### categories

- id
- name
- slug
- sort_order
- is_active

예시 데이터:

- 사과
- 배
- 감귤
- 토마토
- 제철과일
- 선물세트

### products

- id
- category_id
- name
- slug
- short_description
- description
- origin
- storage_method
- harvest_period
- shipping_info
- base_price
- sale_price
- discount_rate
- review_rating
- review_count
- thumbnail_url
- is_best
- is_seasonal
- is_active
- created_at
- updated_at

### product_images

- id
- product_id
- image_url
- alt_text
- sort_order

### product_options

- id
- product_id
- option_group_name
- option_name
- additional_price
- stock_quantity
- sku
- is_active

예시:

- option_group_name: 중량
- option_name: 3kg
- additional_price: 0

- option_group_name: 품질
- option_name: 선물용
- additional_price: 5000

### carts

- id
- user_id
- created_at
- updated_at

### cart_items

- id
- cart_id
- product_id
- product_option_id
- quantity
- unit_price
- total_price

### orders

- id
- order_number
- user_id
- status
- payment_status
- recipient_name
- recipient_phone
- zip_code
- address1
- address2
- delivery_memo
- subtotal_amount
- shipping_amount
- discount_amount
- total_amount
- payment_method
- paid_at
- created_at

주문 상태 예시:

- pending
- paid
- preparing
- shipping
- delivered
- canceled

### order_items

- id
- order_id
- product_id
- product_name_snapshot
- option_name_snapshot
- quantity
- unit_price
- total_price

### reviews

- id
- user_id
- product_id
- order_item_id
- rating
- content
- created_at

### qna_posts

- id
- user_id
- product_id
- title
- content
- is_secret
- created_at

### notices

- id
- title
- content
- is_visible
- created_at

## 6. 실제 구현 시 중요한 규칙

### 가격 계산 규칙

- 상세페이지에서 선택한 옵션 가격을 즉시 반영한다.
- 장바구니와 주문 페이지는 서버 기준으로 총액을 다시 계산한다.
- 프론트 계산값만 믿으면 안 된다.

### 재고 처리 규칙

- 옵션별 재고를 관리한다.
- 결제 성공 직전에 재고를 다시 확인한다.
- 재고 부족 시 결제를 막거나 주문 실패 처리한다.

### 주문 스냅샷 규칙

- 주문 시점의 상품명, 가격, 옵션명은 주문 테이블에 별도로 저장한다.
- 이후 상품 정보가 바뀌어도 과거 주문내역이 유지되어야 한다.

### 배송비 규칙

- 기본 배송비
- 무료배송 조건
- 제주 / 도서산간 추가 배송비를 분리해 관리한다.

## 7. API 또는 서버 기능 목록

### 상품 관련

- 상품 목록 조회
- 상품 상세 조회
- 카테고리별 조회
- 추천상품 조회

### 장바구니 관련

- 장바구니 조회
- 장바구니 추가
- 장바구니 수정
- 장바구니 삭제

### 주문 관련

- 주문서 생성
- 결제 요청 데이터 생성
- 결제 성공 후 주문 확정
- 주문내역 조회

### 사용자 관련

- 회원가입
- 로그인
- 배송지 관리
- 찜 목록 관리

### 관리자 관련

- 상품 CRUD
- 옵션 CRUD
- 주문 상태 변경
- 공지사항 CRUD

## 8. 결제 연동 개념 흐름

1. 사용자가 결제하기 클릭
2. 서버에서 주문 금액과 상품 정보를 검증
3. 결제 모듈 요청 데이터 생성
4. 사용자 결제 진행
5. 결제 성공 콜백 또는 검증 요청
6. 서버에서 최종 결제 검증
7. 주문 상태를 `paid`로 저장
8. 주문완료 페이지로 이동

중요:

- 결제 성공 여부는 반드시 서버에서 검증해야 한다.
- 프론트에서 성공했다고 보여주는 것만으로 주문 처리하면 안 된다.

## 9. 관리자 페이지에서 필요한 기능

- 상품 등록
- 상품 대표 이미지 업로드
- 상세 이미지 업로드
- 옵션 등록
- 재고 수정
- 주문 상태 변경
- 공지사항 작성

## 10. 1차 개발 범위 추천

처음부터 모든 것을 구현하기보다 아래 범위부터 만드는 것이 좋다.

### 1차 MVP

- 메인페이지
- 상품목록 페이지
- 상품상세 페이지
- 장바구니
- 주문/결제 페이지
- 주문완료 페이지
- 기본 로그인

### 2차 확장

- 리뷰
- Q&A
- 마이페이지
- 관리자 상품 관리

### 3차 확장

- 쿠폰
- 정기배송
- 알림 기능

## 11. 현실적인 개발 순서

1. 프로젝트 초기 세팅
2. 공통 레이아웃
3. 더미 상품 데이터 연결
4. 메인 / 목록 / 상세 구현
5. 장바구니 상태 관리
6. 주문서 작성 화면
7. DB 연결
8. 로그인 연결
9. 결제 연결
10. 관리자 기능 추가

## 12. 결론

김포청년몰은 구조상 일반 소개 홈페이지가 아니라 작은 이커머스 프로젝트다.

그래서 처음부터 아래 4가지를 중심으로 설계해야 한다.

- 상품 데이터 구조
- 장바구니와 주문 흐름
- 결제 검증
- 관리자 운영 기능
