import React from 'react';
import { Menu, ShoppingBag, User as UserIcon, LogOut, Shirt } from 'lucide-react';
import { ViewState, User, CartItem } from '../types';

interface NavbarProps {
  currentView: ViewState;
  changeView: (view: ViewState) => void;
  user: User | null;
  onLogout: () => void;
  cart: CartItem[];
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  changeView, 
  user, 
  onLogout, 
  cart,
  toggleMobileMenu,
  isMobileMenuOpen 
}) => {
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { view: 'HOME', label: 'Home' },
    { view: 'PRODUCTS', label: 'Products' },
    { view: 'ORDERS', label: 'My Orders' },
    { view: 'CONTACT', label: 'Contact Us' },
  ];

  return (
    <nav className="bg-white text-gray-900 sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => changeView('HOME')}
          >
            <div className="relative h-12 w-12 flex items-center justify-center bg-indigo-900 rounded-tr-2xl rounded-bl-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
               <Shirt className="h-6 w-6 text-indigo-200" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-serif text-2xl font-bold text-gray-900 leading-none tracking-tight group-hover:text-indigo-900 transition-colors">Batra</h1>
              <p className="text-xs text-indigo-600 font-bold tracking-[0.25em] uppercase mt-0.5">Creation</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => changeView(link.view as ViewState)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === link.view
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
               <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Hello, {user.name}</span>
                  <button 
                    onClick={() => changeView('CART')}
                    className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <ShoppingBag className="h-6 w-6" />
                    {cartItemCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full shadow-sm">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
               </div>
            ) : (
              <button
                onClick={() => changeView('AUTH')}
                className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <UserIcon className="h-4 w-4" />
                <span>Login / Sign Up</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  changeView(link.view as ViewState);
                  toggleMobileMenu();
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === link.view
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            {user ? (
               <>
                 <button
                   onClick={() => {
                     changeView('CART');
                     toggleMobileMenu();
                   }}
                   className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                 >
                   Cart ({cartItemCount})
                 </button>
                 <button
                   onClick={() => {
                     onLogout();
                     toggleMobileMenu();
                   }}
                   className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                 >
                   Logout
                 </button>
               </>
            ) : (
              <button
                onClick={() => {
                  changeView('AUTH');
                  toggleMobileMenu();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-indigo-600 font-semibold"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;