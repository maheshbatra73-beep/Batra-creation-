import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Products from './views/Products';
import Orders from './views/Orders';
import Contact from './views/Contact';
import Auth from './views/Auth';
import { ViewState, User, CartItem, Product, Order, ShippingDetails, PaymentMethod } from './types';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, ArrowLeft, MapPin, CreditCard, Wallet, Smartphone } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Checkout State
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: '',
    shopName: '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');

  // Calculated derived state
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Pre-fill shipping details when user logs in
  useEffect(() => {
    if (user) {
      setShippingDetails(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        shopName: user.shopName || prev.shopName,
        addressLine1: user.shopAddress || prev.addressLine1
      }));
    }
  }, [user]);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: product.minOrderQuantity }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const initiateCheckout = () => {
    if (!user) {
      setCurrentView('AUTH');
      return;
    }
    setCurrentView('CHECKOUT');
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setCurrentView('AUTH');
      return;
    }
    
    const newOrder: Order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...cart],
      total: cartTotal,
      status: 'Pending',
      shippingDetails: { ...shippingDetails },
      paymentMethod: paymentMethod
    };

    // Construct email content
    const subject = `New Order #${newOrder.id} - ${shippingDetails.shopName}`;
    const body = `Hello Batra Creation,

I would like to place a new order.

Order Details:
Order ID: ${newOrder.id}
Date: ${new Date().toLocaleDateString()}
Payment Method: ${paymentMethod}

Items:
${cart.map(item => `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`).join('\n')}

Total Amount: ₹${cartTotal}

Shipping Address:
Name: ${shippingDetails.fullName}
Shop Name: ${shippingDetails.shopName}
Address: ${shippingDetails.addressLine1}
City: ${shippingDetails.city}
State: ${shippingDetails.state}
Pincode: ${shippingDetails.pincode}
Phone: ${shippingDetails.phone}

Please confirm my order.

Regards,
${shippingDetails.fullName}
`;

    // Open email client
    const mailtoLink = `mailto:batracreation2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    setOrders([newOrder, ...orders]);
    setCart([]);
    setCurrentView('ORDERS');
  };

  // Auth Logic
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView('HOME');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('HOME');
  };

  // View Routing
  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <Home changeView={setCurrentView} />;
      case 'PRODUCTS':
        return <Products onAddToCart={addToCart} />;
      case 'ORDERS':
        return <Orders user={user} orders={orders} changeView={setCurrentView} />;
      case 'CONTACT':
        return <Contact />;
      case 'AUTH':
        return <Auth onLogin={handleLogin} />;
      case 'CART':
        return (
          <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow">
                 <p className="text-gray-500 mb-4">Your cart is empty.</p>
                 <button onClick={() => setCurrentView('PRODUCTS')} className="text-indigo-600 font-bold hover:underline">Continue Shopping</button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {cart.map(item => (
                  <div key={item.id} className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                     <div className="flex items-center">
                       <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                       <div>
                         <h3 className="font-bold">{item.name}</h3>
                         <p className="text-sm text-gray-500">Unit Price: ₹{item.price}</p>
                       </div>
                     </div>
                     <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                       <div className="flex items-center border rounded">
                         <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100"><Minus className="h-4 w-4" /></button>
                         <span className="px-3">{item.quantity}</span>
                         <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100"><Plus className="h-4 w-4" /></button>
                       </div>
                       <div className="font-medium text-gray-900 w-20 text-right">
                         ₹{item.price * item.quantity}
                       </div>
                       <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-5 w-5" /></button>
                     </div>
                  </div>
                ))}
                <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-xl font-bold">Total: ₹{cartTotal}</div>
                  <button 
                    onClick={initiateCheckout} 
                    className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 flex items-center justify-center"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'CHECKOUT':
        return (
          <div className="max-w-4xl mx-auto px-4 py-10">
            <button 
              onClick={() => setCurrentView('CART')}
              className="flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </button>
            
            <h2 className="text-3xl font-bold mb-8">Checkout</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Shipping Form & Payment */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-900">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                    Shipping Address
                  </h3>
                  
                  <form id="checkout-form" onSubmit={placeOrder} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={shippingDetails.fullName}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                        <input
                          type="text"
                          name="shopName"
                          required
                          value={shippingDetails.shopName}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                      <input
                        type="text"
                        name="addressLine1"
                        required
                        value={shippingDetails.addressLine1}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Street address, Market area"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={shippingDetails.city}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          name="state"
                          required
                          value={shippingDetails.state}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          value={shippingDetails.pincode}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={shippingDetails.phone}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-900">
                    <Wallet className="h-5 w-5 mr-2 text-indigo-600" />
                    Payment Method
                  </h3>
                  
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'UPI' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="UPI" 
                        checked={paymentMethod === 'UPI'} 
                        onChange={() => setPaymentMethod('UPI')}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="ml-3 flex items-center w-full">
                        <Smartphone className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <span className="block text-sm font-medium text-gray-900">UPI</span>
                          <span className="block text-xs text-gray-500">Google Pay, PhonePe, Paytm, BHIM</span>
                        </div>
                      </div>
                    </label>

                    {paymentMethod === 'UPI' && (
                      <div className="ml-8 mb-4">
                         <a 
                           href={`upi://pay?pa=96804651@ybl&pn=Batra Creation&am=${cartTotal}&cu=INR`}
                           className="inline-flex items-center justify-center px-6 py-2.5 bg-[#5f259f] text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-sm w-full sm:w-auto"
                         >
                           <Smartphone className="h-4 w-4 mr-2" />
                           Pay ₹{cartTotal} on PhonePe
                         </a>
                         <p className="text-xs text-gray-500 mt-2">
                           Clicking this will open your PhonePe or UPI app to complete the payment.
                         </p>
                      </div>
                    )}

                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'NetBanking' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="NetBanking" 
                        checked={paymentMethod === 'NetBanking'} 
                        onChange={() => setPaymentMethod('NetBanking')}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="ml-3 flex items-center w-full">
                        <CreditCard className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <span className="block text-sm font-medium text-gray-900">Net Banking</span>
                          <span className="block text-xs text-gray-500">All major Indian banks supported</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h3>
                  <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate flex-1 pr-2">{item.name} (x{item.quantity})</span>
                        <span className="font-medium text-gray-900">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center font-bold text-lg text-indigo-900">
                      <span>Total</span>
                      <span>₹{cartTotal}</span>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-lg transition-transform transform hover:-translate-y-0.5"
                  >
                    Confirm Order & Email
                  </button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By clicking confirm, an email draft will be created with your order details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Home changeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <Navbar 
        currentView={currentView}
        changeView={setCurrentView}
        user={user}
        onLogout={handleLogout}
        cart={cart}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer />
    </div>
  );
}

export default App;