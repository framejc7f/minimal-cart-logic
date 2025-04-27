
import React from 'react';
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Related Products</h2>
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <Link to={`/product/${product.id}`}>
                <Card>
                  <CardContent className="p-4">
                    <div className="aspect-square overflow-hidden rounded-lg mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-lg font-semibold">${product.price}</p>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
