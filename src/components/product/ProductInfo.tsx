
import React from 'react';

interface ProductInfoProps {
  name: string;
  price: number;
  description: string;
}

const ProductInfo = ({ name, price, description }: ProductInfoProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-2xl font-semibold mt-4">${price}</p>
      <p className="text-gray-600 mt-4">{description}</p>
    </div>
  );
};

export default ProductInfo;
