'use client';

import * as React from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { catchError, isArrayOfFile } from '@/utils';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  UncontrolledFormMessage,
  toast,
} from '@store/ui';
import { Loader2 } from '@store/ui/icons';
import { productSchema } from '@/lib/validations';
import type { OurFileRouter } from '@/pages/api/uploadthing/core';
import type { FileWithPreview } from '@/types';
import { Zoom } from '../zoom-image';
import { FileDialog } from '../file-dialog';

interface AddProductFormProps {
  storeId: number;
  userId: number;
}

type Inputs = z.infer<typeof productSchema>;

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function AddProductForm({ storeId }: AddProductFormProps) {
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null);

  const [isPending, startTransition] = React.useTransition();

  const { isUploading, startUpload } = useUploadThing('productImage');

  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      inventory: NaN,
      category: 'skateboards',
      subcategory: '',
      images: [],
    },
  });

  // const subcategories = getSubcategories(form.watch('category'));

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        // await checkProduct({
        //   name: data.name,
        // });

        if (isArrayOfFile(data.images)) {
          toast({ title: 'Uploading images...' });
          startUpload(data.images)
            .then((res) => {
              const formattedImages = res?.map((image) => ({
                id: image.key,
                name: image.key.split('_')[1] ?? image.key,
                url: image.url,
              }));
              return formattedImages ?? null;
            })
            .catch((error) => {
              toast({ title: 'Error uploading images.', description: error });
            })
            .then((images) => {
              // addProduct({
              //   ...data,
              //   storeId,
              //   images,
              // });
              return toast({ title: 'Product added successfully.' });
            });
        } else {
          // await addProduct({
          //   ...data,
          //   storeId,
          //   images: null,
          // });

          toast({ title: 'Product added successfully.' });
        }

        form.reset();
        setFiles(null);
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form className="grid w-full max-w-2xl gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type product name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Type product description here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) => field.onChange(value)}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* <SelectGroup>
                      {Object.values(products.category.enumValues).map((option) => (
                        <SelectItem key={option} value={option} className="capitalize">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup> */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subcategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Subcategory</FormLabel>
                <Select value={field.value?.toString()} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* <SelectGroup>
                      {subcategories.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup> */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type product price here."
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inventory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Inventory</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="Type product inventory here."
                    value={Number.isNaN(field.value) ? '' : field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          {files?.length ? (
            <div className="flex items-center gap-2">
              {files.map((file, i) => (
                <Zoom key={i}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                    width={80}
                    height={80}
                  />
                </Zoom>
              ))}
            </div>
          ) : null}
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="images"
              maxFiles={3}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              isUploading={isUploading}
              disabled={isPending}
            />
          </FormControl>
          <UncontrolledFormMessage message={form.formState.errors.images?.message} />
        </FormItem>
        <Button
          onClick={() => void form.trigger(['name', 'description', 'price', 'inventory'])}
          className="w-fit"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
          Add Product
          <span className="sr-only">Add Product</span>
        </Button>
      </form>
    </Form>
  );
}
