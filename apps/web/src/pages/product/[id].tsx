import Head from "next/head";
import Image from 'next/image'
import { api } from "@/utils/api";
import { Avatar, AvatarFallback, AvatarImage, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@store/ui";
import { MoreHorizontal, Star } from '@store/ui/icons';

export default function Product() {
  return (
    <>
      <Head>
        <title>Product</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col py-12">
        <div className="grid md:grid-cols-3 gap-6 pb-6">
          <div className="col-span-2">
            <p className="text-lg font-medium pb-4">Product name</p>
            <Image
              src="https://placehold.co/180x180.png"
              alt="product image"
              className="rounded pb-4"
              width={180}
              height={180}
            />
            <div className="pb-4">
              <p className="text-lg font-medium pb-4">Information</p>
              <div className="grid md:grid-cols-3">
                <div>
                  <p className="font-medium">Delivery speed</p>
                  <p className="text-sm text-gray-400">Instant</p>
                </div>
                <div>
                  <p className="font-medium">Delivery method</p>
                  <p className="text-sm text-gray-400">Auto delivery</p>
                </div>
                <div>
                  <p className="font-medium">Category</p>
                  <p className="text-sm text-gray-400">Game Top Up</p>
                </div>
              </div>
            </div>
            <div className="pb-4">
              <p className="text-lg font-medium pb-4">Description</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente est accusantium quisquam laborum, similique animi suscipit. Ducimus aliquam ipsum suscipit impedit inventore doloribus quod quasi ad illo itaque, minima reiciendis.</p>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center pb-4">
              <Avatar className="flex h-20 w-20 items-center justify-center space-y-0 border rounded-sm">
                <AvatarImage src="https://placehold.co/80x80" alt="Market name logo" />
                <AvatarFallback>Market name</AvatarFallback>
              </Avatar>
              <div className="pl-6">
                <p className="text-lg font-medium">Market name</p>
                <div className="flex flex-row items-center">
                  <Star fill="white" size={14} className="mr-1" />
                  <p className="text-sm">4.8 • 4.6K Ratings</p>
                </div>
              </div>
            </div>
            <p className="text-lg font-medium pb-4">Total price</p>
            <p className="font-medium">1 200 ₽</p>
            <div className="flex flex-col py-4">
              <Button variant="secondary" className="w-full mb-4">
                <span className="font-medium">Add to cart</span>
              </Button>
              <Button className="w-full">
                <span className="font-medium">Buy now</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="pb-4">
          <div className="flex flex-row items-start justify-between pb-4">
            <p className="text-lg font-medium">Ratings and Reviews</p>
            <p className="text-sm font-medium">See All</p>
          </div>
          <div className="flex flex-row items-end">
            <div className="flex flex-row items-end pr-4">
              <p className="text-5xl font-medium pr-1">4.8</p>
              <p className="font-medium text-gray-400">out of 5</p>
            </div>
            <p>4.6K Ratings</p>
          </div>
          <div className="grid md:grid-cols-3 gap-3 py-4">
            {new Array(3).fill('').map((_, index) => (
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
                  <p className="line-clamp-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore ipsum aut natus obcaecati, alias aliquid asperiores nesciunt assumenda maiores eos ea et ex unde repellat, voluptatem necessitatibus quibusdam pariatur! Iure?</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <p className="text-lg font-medium pb-4">More By This Market</p>
        <div className="grid md:grid-cols-6 gap-6">
          {new Array(6).fill('').map((_, index) => (
            <div key={index} className="pb-6">
                <Image
                src="https://placehold.co/180x180.png"
                alt="product image"
                className="rounded"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
              <p className="pt-2 text-sm">Product name</p>
              <p>64</p>
              <p>1 200 ₽</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
