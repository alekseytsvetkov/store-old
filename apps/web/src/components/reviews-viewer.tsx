import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@store/ui';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from '@store/ui/icons';
import { ReviewPreview } from './review-preview';

export function ReviewsViewer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0">
          See All
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Ratings and Reviews</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="pb-4">
            <div className="flex flex-row items-end">
              <div className="flex flex-row items-end pr-4">
                <p className="pr-1 text-5xl font-medium">4.8</p>
                <p className="font-medium text-gray-400">out of 5</p>
              </div>
              <p>4.6K Ratings</p>
            </div>
            <div className="grid gap-3 py-4 md:grid-cols-1">
              {new Array(3).fill('').map((_, index) => (
                <ReviewPreview />
              ))}
            </div>
          </div>
        </div>
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogContent>
    </Dialog>
  );
}
