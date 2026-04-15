import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

type ProductsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const sortChips = ["인기순", "최신순", "낮은 가격순", "무료배송"];

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const category = typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : undefined;
  const filteredProducts = category ? products.filter((product) => product.category === category) : products;

  return (
    <main className="page-shell">
      <div className="container listing-shell">
        <section className="listing-hero">
          <span className="eyebrow">{category ?? "전체 상품"}</span>
          <h1>{category ?? "전체 상품"}</h1>
        </section>

        <section className="listing-toolbar">
          <div className="chip-row">
            {sortChips.map((chip) => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>
        </section>

        <section className="product-grid product-grid-shop">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}
