import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Calendar, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';

const CaseNavigator = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setResults(null);

    const formData = new FormData();
    formData.append('document', file);

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await axios.post(`${baseURL}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResults(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred during analysis. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // The Pulsing Radar Animation
  const ScanAnimation = () => (
    <div className="relative w-48 h-48 mx-auto mt-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-75"></div>
      <div className="absolute inset-4 bg-primary/20 rounded-full animate-ping animation-delay-200"></div>
      <div className="absolute inset-8 bg-primary/30 rounded-full animate-pulse flex items-center justify-center">
        <FileText size={48} className="text-primary" />
      </div>
      
      {/* Radar sweeping line effect created with CSS rotation */}
      <motion.div 
        className="absolute inset-0 rounded-full border-r-4 border-secondary-container"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        style={{
          background: 'conic-gradient(from 0deg, transparent 70%, rgba(255, 215, 0, 0.3) 100%)',
        }}
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Header with asymmetrical design */}
      <header className="mb-16 pt-8">
        <p className="text-secondary font-body uppercase tracking-[0.05em] text-sm mb-2 font-medium">
          Official Government Archive
        </p>
        <h1 className="text-5xl md:text-6xl text-primary tracking-tight leading-tight staggered-asymmetry">
          Nyaya-sathi.<br />
          <span className="text-primary/70">The Sovereign Ledger.</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Upload & Actions */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 ghost-border relative overflow-hidden group">
            
            {!isUploading && !results && (
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4">
                  <Upload className="text-primary" size={28} />
                </div>
                <h3 className="text-xl">Submit Document</h3>
                <p className="text-sm font-body opacity-80">
                  Upload legal PDFs or images for immediate automated analysis.
                </p>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="application/pdf, image/jpeg, image/png"
                />

                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="glass-card px-6 py-3 mt-4 text-primary font-medium rounded-sm border border-primary/10 hover:bg-white w-full transition-colors"
                >
                  {file ? file.name : "Select File"}
                </button>

                {file && (
                  <button 
                    onClick={handleUpload}
                    className="tonal-btn w-full py-4 mt-4 text-lg shadow-lg"
                  >
                    Initiate Analysis
                  </button>
                )}
              </div>
            )}

            {isUploading && (
              <div className="text-center py-8">
                <h3 className="text-xl mb-2 text-primary">Scanning Archives...</h3>
                <p className="text-sm font-body opacity-70">Cross-referencing legal precedents.</p>
                <ScanAnimation />
              </div>
            )}

            {results && (
              <div className="text-center py-8">
                 <div className="w-16 h-16 rounded-full bg-secondary-container/50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-secondary" size={32} />
                </div>
                <h3 className="text-xl mb-4">Analysis Complete</h3>
                <button 
                  onClick={() => { setFile(null); setResults(null); }}
                  className="text-sm font-body text-primary underline decoration-secondary"
                >
                  Analyze another document
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Ledger Results */}
        <div className="md:col-span-7">
          <AnimatePresence>
            {results && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-container-lowest p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,60,0.04)] ghost-border"
              >
                <div className="flex items-start justify-between border-b border-surface-container-highest pb-6 mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-surface-container-low text-primary text-xs font-bold uppercase tracking-wider mb-3">
                      Case File
                    </span>
                    <h2 className="text-3xl text-primary">{results.caseTitle}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-body text-on-surface/60 uppercase tracking-widest mb-1">Docket No.</p>
                    <p className="font-mono text-primary font-medium">{results.caseNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8 pt-2">
                  <div className="bg-surface-container-low p-5 pl-6 border-l-4 border-secondary-container">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={18} className="text-secondary" />
                      <h4 className="font-bold text-sm">Hearing Information</h4>
                    </div>
                    <p className="font-body text-primary">{results.nextHearingDate}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <ShieldAlert size={20} className="text-primary" />
                    Plain English Summary
                  </h3>
                  <div className="font-body leading-relaxed text-on-surface/90 bg-surface/50 p-6 ghost-border">
                    {results.simplifiedAdvice}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl mb-4">Recommended Actions</h3>
                  <ul className="space-y-3 font-body">
                    {results.actionItems && results.actionItems.map((item, index) => (
                      <li key={index} className="flex gap-3 items-start bg-surface-container-low p-4 rounded-sm">
                        <span className="text-secondary font-bold mt-0.5">{index + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
            
            {!results && !isUploading && (
              <div className="h-full border-2 border-dashed border-primary/10 flex items-center justify-center p-12 text-center">
                <p className="font-body text-on-surface/50 max-w-sm">
                  The ledger is currently empty. Please submit an official document to generate insights.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default CaseNavigator;
