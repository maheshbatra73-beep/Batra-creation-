import React from 'react';
import { ArrowRight, Star, ShoppingBag, ShieldCheck } from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
  changeView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ changeView }) => {
  const categoryImages: Record<string, string> = {
    'Chiffon Dress': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    'T-Shirts': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    'Formal Pants': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
    'Designer Tops': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    'Jeans': 'https://images.unsplash.com/photo-1542272617-08f08630329e?auto=format&fit=crop&w=800&q=80'
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Clothing Rack" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-3/4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Forget the rules, <br/>if you like it, wear it.
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl">
              Premium wholesale ladies garments. From daily wear t-shirts to formal pants, 
              we provide high-quality stock tailored to your customer's taste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => changeView('PRODUCTS')}
                className="bg-white text-indigo-900 px-8 py-3 rounded-md font-bold hover:bg-indigo-50 transition flex items-center justify-center"
              >
                Browse Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Batra Creation?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Collection</h3>
              <p className="text-gray-600">Explore our wide range of ladies garments selected to meet the latest fashion trends.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">We specialize in Mix Tops, Formal Wear, and Jeans crafted from the finest materials.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Wholesaler</h3>
              <p className="text-gray-600">Located in Kishangarh Bass, we have been serving retailers across Rajasthan with reliability.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Teaser */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Categories</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
             {['Chiffon Dress', 'T-Shirts', 'Formal Pants', 'Designer Tops', 'Jeans'].map((cat, idx) => (
               <div 
                 key={idx} 
                 onClick={() => changeView('PRODUCTS')}
                 className="relative h-40 rounded-lg overflow-hidden cursor-pointer group"
                >
                 <img 
                   src={categoryImages[cat] || `https://picsum.photos/400/300?random=${idx + 15}`} 
                   alt={cat} 
                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-opacity">
                   <h3 className="text-white font-bold text-xl text-center px-2">{cat}</h3>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;