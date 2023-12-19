'use client';

import Image from 'next/image';

interface IProductPreviewProps {
  name: string;
  price: number;
  reviewsCount: number;
  image: string;
}

export function ProductPreview({ name, price, reviewsCount, image }: IProductPreviewProps) {
  return (
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
  );
}
