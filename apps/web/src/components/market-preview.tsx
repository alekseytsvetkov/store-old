'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@store/ui';
import { Star, MoreHorizontal } from '@store/ui/icons';

interface IMarketPreviewProps {
  name: string;
  image: string;
  rating: number;
  reviewsCount: number;
}

export function MarketPreview({ name, rating, reviewsCount, image }: IMarketPreviewProps) {
  return (
    <div className="flex flex-row items-center pb-4">
      <Avatar className="flex h-20 w-20 items-center justify-center space-y-0 rounded-sm border">
        <AvatarImage src={image} alt="Market logo" />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <div className="pl-6">
        <p className="text-lg font-medium">{name}</p>
        <div className="flex flex-row items-center">
          <Star fill="white" size={14} className="mr-1" />
          <p className="text-sm">
            {rating} • {reviewsCount}K Ratings
          </p>
        </div>
      </div>
    </div>
  );
}
