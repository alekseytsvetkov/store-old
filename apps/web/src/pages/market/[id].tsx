import Head from 'next/head';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@store/ui';
import { MoreHorizontal, Star } from '@store/ui/icons';
import { ProductPreview } from '@/components';

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
            <div className="flex flex-row items-center">
              <Avatar className="flex h-20 w-20 items-center justify-center space-y-0 rounded-sm border">
                <AvatarImage src="https://placehold.co/80x80" alt="Market name logo" />
                <AvatarFallback>Market name</AvatarFallback>
              </Avatar>
              <div className="pl-6">
                <div className="text-lg font-medium">Market name</div>
                <div className="flex flex-row items-center">
                  <Star fill="white" size={14} className="mr-1" />
                  <div className="text-sm">4.8 • 4.6K Ratings</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <span>Follow</span>
              </Button>
              <Button variant="outline" size="icon">
                <MoreHorizontal />
              </Button>
            </div>
          </div>
          <p className="max-w-xl py-4">
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
