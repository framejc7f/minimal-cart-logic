
import React from 'react';

interface ProductImageDisplayProps {
  image: string;
  name: string;
}

const ProductImageDisplay = ({ image, name }: ProductImageDisplayProps) => {
  return (
    <div className="aspect-square overflow-hidden rounded-lg">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProductImageDisplay;
