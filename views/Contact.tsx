import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
        <p className="mt-4 text-xl text-gray-600">Visit our warehouse or call us for bulk orders.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Address</h4>
                <p className="text-gray-600 mt-1">{CONTACT_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
                <p className="text-gray-600 mt-1">
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-indigo-600">+91 {CONTACT_INFO.phone}</a>
                </p>
                <p className="text-sm text-gray-500 mt-1">Mon - Sat, 9am - 8pm</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Business Hours</h4>
                <p className="text-gray-600 mt-1">Everyday service available.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map / Location Placeholder */}
        <div className="bg-gray-200 rounded-xl shadow-lg overflow-hidden h-96 min-h-full flex items-center justify-center relative group">
           {/* In a real app, embed Google Maps iframe here */}
           <img 
             src="https://maps.googleapis.com/maps/api/staticmap?center=27.8188,76.6276&zoom=14&size=600x400&markers=color:red%7C27.8188,76.6276&key=YOUR_API_KEY_PLACEHOLDER" // Placeholder image URL approach
             alt="Map Location"
             className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
             onError={(e) => {
               (e.target as HTMLImageElement).style.display = 'none';
             }}
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-20 pointer-events-none">
             <MapPin className="h-12 w-12 text-red-600 animate-bounce" />
             <span className="bg-white px-3 py-1 rounded shadow text-sm font-bold mt-2">Kishangarh Bass, Khairthal</span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;