'use client';

import Image from 'next/image';
import Link from 'next/link';

interface IProductPreviewProps {
  id: string;
  name: string;
  price: number;
  reviewsCount: number;
  image: string;
}

export function ProductPreview({ id, name, price, reviewsCount, image }: IProductPreviewProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="pb-6">
        <Image
          src={image}
          alt="product image"
          className="rounded"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
        <p className="pt-2 text-sm">{name}</p>
        <p>{reviewsCount}</p>
        <p>{price} ₽</p>
      </div>
    </Link>
  );
}
