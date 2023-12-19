import Head from 'next/head';
import { Button } from '@store/ui';
import { MoreHorizontal } from '@store/ui/icons';
import { MarketPreview, ProductPreview } from '@/components';

export default function Market() {
  return (
    <>
      <Head>
        <title>Market</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col py-12">
        {/* Профиль маркета */}
        <div>
          <div className="flex flex-row justify-between">
            <MarketPreview
              name="Market name"
              rating={4.8}
              reviewsCount={4.6}
              image="https://placehold.co/80x80"
            />
            <div className="flex items-center gap-2">
              <Button>
                <span>Follow</span>
              </Button>
              <Button variant="outline" size="icon">
                <MoreHorizontal />
              </Button>
            </div>
          </div>
          <p className="max-w-xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, atque autem excepturi
            dolor enim hic, soluta molestias voluptate ab nihil velit modi fugit iusto ea minus
            porro voluptatibus cupiditate quae.
          </p>
        </div>
        {/* Продукты маркета */}
        <div className="py-6">
          <div className="text-xl font-medium">Products</div>
          <div className="grid gap-6 pt-6 md:grid-cols-6">
            {new Array(24).fill('').map((_, index) => (
              <ProductPreview
                key={index}
                id={String(index)}
                name="Product name"
                price={1200}
                reviewsCount={64}
                image="https://placehold.co/180x180.png"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
