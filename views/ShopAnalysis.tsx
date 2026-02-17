import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { analyzeShopImage } from '../services/geminiService';
import { AnalysisResult } from '../types';

interface ShopAnalysisProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  goToProducts: () => void;
}

const ShopAnalysis: React.FC<ShopAnalysisProps> = ({ onAnalysisComplete, goToProducts }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setResult(null); // Reset previous result
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Extract base64 data part
      const base64Data = imagePreview.split(',')[1];
      const analysisResult = await analyzeShopImage(base64Data);
      setResult(analysisResult);
      onAnalysisComplete(analysisResult);
    } catch (err) {
      setError("Failed to analyze image. Please try again later or check your connection.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Personalized Stock Recommendation</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Upload a photo of your shop's interior. Our AI will analyze your shop's aesthetic 
          and suggest the Batra Creation products that will sell best to your customers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${imagePreview ? 'border-indigo-300 bg-gray-50' : 'border-gray-300 hover:border-indigo-400'}`}
            onClick={() => fileInputRef.current?.click()}
          >
             {imagePreview ? (
               <div className="relative w-full h-64">
                 <img src={imagePreview} alt="Shop Preview" className="w-full h-full object-contain rounded-md" />
                 <button 
                   onClick={(e) => { e.stopPropagation(); setImagePreview(null); setResult(null); }}
                   className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                 >
                   <Upload className="h-4 w-4" />
                 </button>
               </div>
             ) : (
               <>
                 <Camera className="h-16 w-16 text-gray-400 mb-4" />
                 <p className="text-lg font-medium text-gray-700">Upload Shop Photo</p>
                 <p className="text-sm text-gray-500 mt-2">Click to browse or drag & drop</p>
               </>
             )}
             <input 
               type="file" 
               ref={fileInputRef} 
               onChange={handleFileChange} 
               accept="image/*" 
               className="hidden" 
             />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!imagePreview || isAnalyzing}
            className={`w-full mt-6 py-3 rounded-lg font-bold flex items-center justify-center transition-all ${
              !imagePreview || isAnalyzing 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Analyzing Shop Vibe...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Analyze & Recommend
              </>
            )}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start text-sm">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className={`transition-opacity duration-500 ${result ? 'opacity-100' : 'opacity-50 blur-sm pointer-events-none'}`}>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
             <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
               <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
               Analysis Result
             </h3>
             
             {result ? (
               <>
                 <div className="prose prose-sm text-gray-600 mb-6 bg-indigo-50 p-4 rounded-lg">
                   <p>{result.recommendation}</p>
                 </div>
                 
                 <div className="mb-6">
                   <h4 className="font-semibold text-gray-800 mb-2">Why this matters?</h4>
                   <p className="text-sm text-gray-500">
                     Matching stock to your shop's aesthetic increases customer conversion rates. 
                     We've filtered our catalog to show you items that fit this profile.
                   </p>
                 </div>

                 <button 
                   onClick={goToProducts}
                   className="w-full py-3 bg-indigo-100 text-indigo-700 font-bold rounded-lg hover:bg-indigo-200 transition"
                 >
                   View Recommended Stock
                 </button>
               </>
             ) : (
               <div className="h-64 flex items-center justify-center text-gray-400">
                 <p>Result will appear here after analysis.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopAnalysis;