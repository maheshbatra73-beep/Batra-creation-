import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Batra Creation</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for wholesale ladies garments. Quality, variety, and best prices guaranteed.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" />
                <span>+91 {CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Batra Creation. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;