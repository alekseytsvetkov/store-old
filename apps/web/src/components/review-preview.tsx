import { Card, CardContent, CardHeader } from '@store/ui';
import { Star } from '@store/ui/icons';

export function ReviewPreview() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row py-2">
          <Star fill="white" size={14} className="mr-0.5" />
          <Star fill="white" size={14} className="mr-0.5" />
          <Star fill="white" size={14} className="mr-0.5" />
          <Star fill="white" size={14} className="mr-0.5" />
          <Star fill="white" size={14} className="mr-0.5" />
        </div>
        <p className="text-sm text-gray-400">base, 05/26/2013</p>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore ipsum aut natus
          obcaecati, alias aliquid asperiores nesciunt assumenda maiores eos ea et ex unde repellat,
          voluptatem necessitatibus quibusdam pariatur! Iure?
        </p>
      </CardContent>
    </Card>
  );
}
