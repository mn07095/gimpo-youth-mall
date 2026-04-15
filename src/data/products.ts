export type ProductOption = {
  label: string;
  price: number;
};

export type ProductReview = {
  author: string;
  rating: number;
  date: string;
  content: string;
};

export type ProductQa = {
  question: string;
  answer: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  origin: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  shipping: string;
  harvest: string;
  badge: string;
  summary: string;
  description: string;
  image: string;
  detailImages: string[];
  options: ProductOption[];
  reviews: ProductReview[];
  qna: ProductQa[];
};

export const products: Product[] = [
  {
    slug: "gimpo-apple-gift",
    name: "김포청년몰 햇부사 사과 선물세트",
    category: "사과",
    origin: "국산 · 경북 청송",
    rating: 4.8,
    reviewCount: 128,
    price: 23900,
    originalPrice: 31900,
    shipping: "무료배송 · 오후 2시 전 주문 당일 출고",
    harvest: "10월 하순 ~ 12월 중순",
    badge: "청년몰 추천",
    summary: "아삭한 식감과 진한 단맛을 담은 대표 사과",
    description: "유통 단계를 줄여 신선하게 받아보는 김포청년몰 대표 햇사과입니다.",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=1200&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1569870499705-504209102861?auto=format&fit=crop&w=1400&q=80",
    ],
    options: [
      { label: "3kg 가정용", price: 23900 },
      { label: "5kg 가정용", price: 32900 },
      { label: "5kg 선물용", price: 38900 },
    ],
    reviews: [
      { author: "이OO", rating: 5, date: "2026.04.10", content: "과육이 단단하고 달아서 재구매했어요. 상처난 과일 없이 깨끗하게 왔습니다." },
      { author: "김OO", rating: 5, date: "2026.04.08", content: "선물용으로 주문했는데 포장도 깔끔하고 크기도 고르게 들어 있어서 만족했어요." },
      { author: "박OO", rating: 4, date: "2026.04.05", content: "아삭한 식감이 좋아요. 다음엔 5kg로 더 주문하려고 합니다." },
    ],
    qna: [
      { question: "선물 포장 가능한가요?", answer: "선물용 옵션 선택 시 완충 포장과 전용 박스로 발송됩니다." },
      { question: "당일 출고 마감은 몇 시인가요?", answer: "평일 오후 2시 이전 결제 완료 주문은 당일 출고됩니다." },
    ],
  },
  {
    slug: "gimpo-pear-farm-box",
    name: "김포청년몰 배 산지직송 박스",
    category: "배",
    origin: "국산 · 경기 김포",
    rating: 4.7,
    reviewCount: 82,
    price: 27900,
    originalPrice: 34900,
    shipping: "무료배송 · 산지 선별 후 발송",
    harvest: "9월 중순 ~ 10월 하순",
    badge: "산지 직송",
    summary: "풍부한 과즙과 시원한 단맛이 살아있는 신고배",
    description: "김포 인근 산지에서 선별한 배를 과즙감 살려 바로 보내드립니다.",
    image: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?auto=format&fit=crop&w=1200&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?auto=format&fit=crop&w=1400&q=80",
    ],
    options: [
      { label: "3kg 실속형", price: 27900 },
      { label: "5kg 실속형", price: 37900 },
      { label: "5kg 선물용", price: 43900 },
    ],
    reviews: [
      { author: "정OO", rating: 5, date: "2026.04.12", content: "배즙이 엄청 많고 시원해서 가족들이 다 좋아했어요." },
      { author: "오OO", rating: 4, date: "2026.04.06", content: "크기가 균일해서 좋았고 배송도 빨랐습니다." },
    ],
    qna: [
      { question: "냉장 보관해야 하나요?", answer: "도착 후 서늘한 곳이나 냉장 보관 시 더 오래 신선하게 드실 수 있습니다." },
      { question: "과일 크기 차이가 큰가요?", answer: "실속형은 약간의 크기 편차가 있을 수 있지만 맛과 신선도는 동일합니다." },
    ],
  },
  {
    slug: "gimpo-tomato-fresh",
    name: "김포청년몰 스테비아 방울토마토",
    category: "토마토",
    origin: "국산 · 경기 김포",
    rating: 4.9,
    reviewCount: 214,
    price: 12900,
    originalPrice: 16900,
    shipping: "3만원 이상 무료배송",
    harvest: "매일 수확 후 출고",
    badge: "베스트",
    summary: "달콤하고 탱글한 한입 크기 토마토",
    description: "간식처럼 먹기 좋은 방울토마토로, 신선도를 살려 빠르게 보내드립니다.",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=1200&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1400&q=80",
    ],
    options: [
      { label: "1kg", price: 12900 },
      { label: "2kg", price: 21900 },
    ],
    reviews: [
      { author: "한OO", rating: 5, date: "2026.04.11", content: "한 박스 순식간에 먹었어요. 일반 토마토보다 훨씬 달아요." },
      { author: "윤OO", rating: 5, date: "2026.04.03", content: "아이들이 과자 대신 찾는 토마토예요. 신선하고 터진 것 없이 잘 왔어요." },
    ],
    qna: [
      { question: "냉장 보관해도 되나요?", answer: "수령 후 2~3일 안에 드실 경우 실온 보관, 더 오래 두실 경우 냉장 보관을 추천드립니다." },
      { question: "한 박스에 몇 개 정도 들어있나요?", answer: "크기에 따라 다르지만 1kg 기준 약 35~45개 내외입니다." },
    ],
  },
  {
    slug: "seasonal-citrus-box",
    name: "제철 감귤 달콤박스",
    category: "감귤",
    origin: "국산 · 제주",
    rating: 4.6,
    reviewCount: 56,
    price: 18900,
    originalPrice: 24900,
    shipping: "제주 지역도 무료배송",
    harvest: "11월 초 ~ 1월 말",
    badge: "제철 과일",
    summary: "상큼한 향과 톡 터지는 과즙의 귤",
    description: "제철 감귤만 모아 균일한 당도와 상큼함을 담은 구성입니다.",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1200&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1612198790700-0ff08cb726e5?auto=format&fit=crop&w=1400&q=80",
    ],
    options: [
      { label: "3kg", price: 18900 },
      { label: "5kg", price: 26900 },
    ],
    reviews: [
      { author: "최OO", rating: 5, date: "2026.04.04", content: "새콤달콤해서 계속 손이 가요. 껍질도 얇고 맛있어요." },
      { author: "문OO", rating: 4, date: "2026.03.30", content: "신선도 좋고 당도도 괜찮았습니다." },
    ],
    qna: [
      { question: "크기가 큰 감귤도 섞여 있나요?", answer: "중소과 위주로 선별하지만 수확 시기에 따라 일부 차이가 있을 수 있습니다." },
      { question: "선물용 포장 가능한가요?", answer: "현재는 일반 포장만 제공되며, 완충재를 충분히 넣어 보내드립니다." },
    ],
  },
  {
    slug: "gimpo-strawberry-premium",
    name: "프리미엄 설향 딸기",
    category: "딸기",
    origin: "국산 · 논산",
    rating: 4.9,
    reviewCount: 174,
    price: 19900,
    originalPrice: 25900,
    shipping: "신선포장 · 새벽 출고",
    harvest: "12월 초 ~ 4월 말",
    badge: "인기 급상승",
    summary: "향이 진하고 부드러운 설향 딸기",
    description: "당도 높은 설향 딸기를 선별해 바로 보내드리는 시즌 인기 상품입니다.",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=1400&q=80",
    ],
    options: [
      { label: "750g", price: 19900 },
      { label: "1.5kg", price: 35900 },
    ],
    reviews: [
      { author: "배OO", rating: 5, date: "2026.04.09", content: "향이 정말 진하고 아이들이 엄청 좋아했어요." },
      { author: "서OO", rating: 5, date: "2026.04.02", content: "무른 딸기 거의 없이 상태가 좋았습니다." },
    ],
    qna: [
      { question: "딸기 크기는 어느 정도인가요?", answer: "중대과 위주로 선별하고 있습니다." },
      { question: "세척해서 바로 먹어도 되나요?", answer: "가볍게 헹군 후 바로 드시면 됩니다." },
    ],
  },
  {
    slug: "shine-muscat-fresh",
    name: "샤인머스캣 망고향 포도",
    category: "포도",
    origin: "국산 · 경북 김천",
    rating: 4.8,
    reviewCount: 93,
    price: 24900,
    originalPrice: 31900,
    shipping: "무료배송 · 냉장 포장 발송",
    harvest: "8월 중순 ~ 10월 초",
    badge: "선물 추천",
    summary: "껍질째 즐기는 맑은 단맛의 샤인머스캣",
    description: "입안 가득 퍼지는 향과 높은 당도로 선물용 문의가 많은 포도입니다.",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=1200&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1515778767554-7a823a49267f?auto=format&fit=crop&w=1400&q=80",
    ],
    options: [
      { label: "2kg", price: 24900 },
      { label: "4kg", price: 45900 },
    ],
    reviews: [
      { author: "강OO", rating: 5, date: "2026.04.13", content: "알이 탱탱하고 단맛이 진해서 만족했어요." },
      { author: "도OO", rating: 4, date: "2026.04.01", content: "가족 선물용으로 좋았어요." },
    ],
    qna: [
      { question: "씨가 있나요?", answer: "샤인머스캣 품종 특성상 씨가 거의 없고 껍질째 드실 수 있습니다." },
      { question: "냉장 보관 기간은 얼마나 되나요?", answer: "수령 후 냉장 보관 시 4~5일 내 드시는 것을 추천드립니다." },
    ],
  },
  {
    slug: "gimpo-melon-box",
    name: "머스크 멜론 달콤박스",
    category: "멜론",
    origin: "국산 · 전남 담양",
    rating: 4.7,
    reviewCount: 67,
    price: 22900,
    originalPrice: 28900,
    shipping: "무료배송 · 완충 포장",
    harvest: "5월 중순 ~ 8월 말",
    badge: "시즌 한정",
    summary: "향이 진하고 과육이 부드러운 머스크 멜론",
    description: "잘 익은 과육과 은은한 향을 즐기기 좋은 시즌 과일입니다.",
    image: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?auto=format&fit=crop&w=1200&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1571212515416-fca88d73b7cf?auto=format&fit=crop&w=1400&q=80",
    ],
    options: [
      { label: "2수", price: 22900 },
      { label: "3수", price: 31900 },
    ],
    reviews: [
      { author: "임OO", rating: 5, date: "2026.04.07", content: "향이 좋아서 선물하기에도 괜찮았어요." },
      { author: "신OO", rating: 4, date: "2026.03.29", content: "후숙해서 먹으니 달콤하고 맛있었습니다." },
    ],
    qna: [
      { question: "바로 먹어도 되나요?", answer: "수령 직후보다는 1~2일 후숙 후 드시면 향과 당도가 더 좋아집니다." },
      { question: "선물포장 되나요?", answer: "기본 박스 포장으로 발송되며 선물용으로도 많이 주문하십니다." },
    ],
  },
  {
    slug: "peach-summer-box",
    name: "여름 복숭아 산지박스",
    category: "복숭아",
    origin: "국산 · 경북 영천",
    rating: 4.8,
    reviewCount: 102,
    price: 21900,
    originalPrice: 27900,
    shipping: "무료배송 · 신선 포장",
    harvest: "6월 말 ~ 8월 중순",
    badge: "여름 인기",
    summary: "달콤한 향과 과즙이 풍부한 백도 복숭아",
    description: "은은한 향과 부드러운 과육으로 여름철 인기가 많은 복숭아입니다.",
    image: "https://images.unsplash.com/photo-1595743825637-cdafc8ad4173?auto=format&fit=crop&w=1200&q=80",
    detailImages: [
      "https://images.unsplash.com/photo-1629828874514-2f0d6f2cbf5f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1570978561297-1d9f93f5f5c1?auto=format&fit=crop&w=1400&q=80",
    ],
    options: [
      { label: "2kg", price: 21900 },
      { label: "4kg", price: 38900 },
    ],
    reviews: [
      { author: "남OO", rating: 5, date: "2026.04.14", content: "부드럽고 달콤해서 냉장해두고 잘 먹고 있어요." },
      { author: "유OO", rating: 4, date: "2026.04.02", content: "포장 꼼꼼해서 멍든 과일 없이 도착했습니다." },
    ],
    qna: [
      { question: "딱딱한 복숭아인가요?", answer: "백도 품종이라 후숙하면서 부드러워지는 타입입니다." },
      { question: "냉장 보관 가능한가요?", answer: "후숙 전에는 서늘한 곳에 두었다가, 먹기 좋게 익으면 냉장 보관해주세요." },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
