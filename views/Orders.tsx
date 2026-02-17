import React from 'react';
import { User, Order } from '../types';
import { Package, Truck, CheckCircle, MapPin } from 'lucide-react';

interface OrdersProps {
  user: User | null;
  orders: Order[];
  changeView: (view: any) => void;
}

const Orders: React.FC<OrdersProps> = ({ user, orders, changeView }) => {
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your orders</h2>
        <button 
          onClick={() => changeView('AUTH')}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">Start building your shop's inventory today.</p>
        <button 
          onClick={() => changeView('PRODUCTS')}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Shipped': return <Truck className="h-5 w-5 text-blue-500" />;
      default: return <Package className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h2>
      
      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
              <div>
                <span className="text-sm text-gray-500 block">Order ID</span>
                <span className="font-mono font-medium text-gray-900">#{order.id}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Date</span>
                <span className="text-gray-900">{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Total Amount</span>
                <span className="text-gray-900 font-bold">₹{order.total}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                {getStatusIcon(order.status)}
                <span className="text-sm font-medium">{order.status}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Items List */}
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-gray-900 mb-3">Items</h4>
                  <ul className="divide-y divide-gray-100">
                    {order.items.map((item, idx) => (
                      <li key={`${order.id}-item-${idx}`} className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium text-gray-900">₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shipping Details */}
                <div className="bg-gray-50 p-4 rounded-lg h-fit">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    Shipping Address
                  </h4>
                  {order.shippingDetails ? (
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="font-medium text-gray-900">{order.shippingDetails.fullName}</p>
                      <p>{order.shippingDetails.shopName}</p>
                      <p>{order.shippingDetails.addressLine1}</p>
                      <p>{order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.pincode}</p>
                      <p className="pt-2 flex items-center">
                        <span className="font-medium mr-1">Phone:</span> {order.shippingDetails.phone}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Address not recorded for this order.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;