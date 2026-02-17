import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isRecommended?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isRecommended = false }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border ${isRecommended ? 'border-2 border-indigo-500 relative' : 'border-gray-100'}`}>
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          Recommended for You
        </div>
      )}
      <div className="h-64 overflow-hidden relative group">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="text-xs text-indigo-600 font-semibold tracking-wide uppercase mb-1">
          {product.category}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
            <span className="text-xs text-gray-500 block">Min Order: {product.minOrderQuantity} pcs</span>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
            title="Add to Order"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;