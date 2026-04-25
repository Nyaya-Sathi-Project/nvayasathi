import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Calendar, ShieldAlert, Shield, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

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
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://nvayasathi-6qit.onrender.com';
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
    <div className="relative w-32 h-32 mx-auto mt-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-75"></div>
      <div className="absolute inset-4 bg-primary/20 rounded-full animate-ping animation-delay-200"></div>
      <div className="absolute inset-8 bg-primary/30 rounded-full animate-pulse flex items-center justify-center">
        <FileText size={32} className="text-primary" />
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
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
      
      {/* Intro Header */}
      {!results && !isUploading && (
        <motion.header 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-6 shadow-sm border border-primary/5">
            <Shield size={14} /> Official Government Archive
          </div>
          <h1 className="text-4xl md:text-5xl text-primary tracking-tight leading-tight font-headline">
            The Sovereign Ledger.<br />
            <span className="text-primary/70 font-normal">What can I analyze for you today?</span>
          </h1>
        </motion.header>
      )}

      {/* Main Upload / Response Area */}
      <AnimatePresence mode="wait">
        
        {!results && !isUploading && (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full mx-auto"
          >
            {/* The Stitch-style active Input Box */}
             <div className="glass-card neon-border rounded-xl p-2 flex flex-col md:flex-row items-center gap-4 bg-surface-container-lowest/80 backdrop-blur-md shadow-lg group focus-within:ring-2 focus-within:ring-secondary-container/50">
               <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="application/pdf, image/jpeg, image/png"
                />
               
               <button 
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center justify-center w-14 h-14 bg-surface-container hover:bg-surface-container-highest rounded-lg transition-colors border border-outline-variant/30 text-primary flex-shrink-0"
               >
                 <Upload size={24} />
               </button>

               <div className="flex-1 px-4 py-2 w-full text-left">
                 {file ? (
                   <span className="text-primary font-medium">{file.name}</span>
                 ) : (
                   <span className="text-on-surface-variant/60 font-body select-none">
                     Click the upload icon to attach a legal document...
                   </span>
                 )}
               </div>

               <button 
                  disabled={!file}
                  onClick={handleUpload}
                  className={`flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-bold transition-all duration-300 w-full md:w-auto ${
                    file 
                      ? "tonal-btn shadow-md hover:shadow-lg translate-y-0"
                      : "bg-surface-container-highest text-on-surface-variant/40 cursor-not-allowed"
                  }`}
               >
                 Analyze <ArrowRight size={18} />
               </button>
             </div>
             
             <div className="flex justify-center gap-4 mt-6">
                {["Drafting a contract", "Reviewing tenancy", "Filing FIR"].map((hint, idx) => (
                  <button key={idx} className="px-4 py-2 text-xs font-medium bg-surface-container-low border border-surface-container-highest rounded-full text-on-surface-variant hover:border-secondary hover:text-primary transition-colors cursor-pointer">
                    {hint}
                  </button>
                ))}
             </div>
          </motion.div>
        )}

        {isUploading && (
          <motion.div 
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl mb-2 text-primary font-headline">Scanning Archives...</h3>
            <p className="text-sm font-body opacity-70">Cross-referencing legal precedents.</p>
            <ScanAnimation />
          </motion.div>
        )}

        {results && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-8 pb-12"
          >
            {/* Action Bar */}
            <div className="flex justify-between items-center mb-4">
               <button 
                  onClick={() => { setFile(null); setResults(null); }}
                  className="px-4 py-2 text-sm font-medium border border-surface-container-highest rounded-md hover:bg-surface-container-low transition-colors text-primary flexItems-center gap-2"
                >
                  &larr; New Analysis
                </button>
                <div className="flex items-center gap-2 text-secondary font-bold text-sm bg-secondary-container/20 px-3 py-1 rounded-md">
                   <CheckCircle2 size={16} /> Analysis Complete
                </div>
            </div>

            <div className="glass-card bg-surface-container-lowest/90 backdrop-blur-xl p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,60,0.06)] rounded-2xl border border-outline-variant/20">
              <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-surface-container-highest pb-6 mb-8 gap-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-surface-container-high text-primary text-xs font-bold uppercase tracking-wider mb-3 rounded-sm">
                    Case File
                  </span>
                  <h2 className="text-3xl text-primary font-headline tracking-tight">{results.caseTitle}</h2>
                </div>
                <div className="text-left md:text-right bg-surface px-4 py-3 border border-surface-container-highest rounded-lg">
                  <p className="text-xs font-body text-on-surface-variant uppercase tracking-widest mb-1">Docket No.</p>
                  <p className="font-mono text-primary font-bold">{results.caseNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 pt-2">
                <div className="bg-surface-container-low p-6 border-l-4 border-secondary-container rounded-r-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={18} className="text-secondary" />
                    <h4 className="font-bold text-sm uppercase tracking-wider text-primary">Hearing Information</h4>
                  </div>
                  <p className="font-body text-primary text-lg">{results.nextHearingDate}</p>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl mb-4 flex items-center gap-2 font-headline text-primary border-b border-surface-container-highest pb-2 inline-flex border-secondary">
                  <ShieldAlert size={20} className="text-secondary" />
                  Plain English Summary
                </h3>
                <div className="font-body leading-relaxed text-on-surface text-lg bg-surface-container-low/50 p-6 rounded-lg border border-surface-container-high">
                  {results.simplifiedAdvice}
                </div>
              </div>

              <div>
                <h3 className="text-xl mb-5 font-headline text-primary">Recommended Actions</h3>
                <ul className="space-y-4 font-body">
                  {results.actionItems && results.actionItems.map((item, index) => (
                    <li key={index} className="flex gap-4 items-start bg-surface-container-lowest p-5 rounded-lg border border-surface-container shadow-sm hover:shadow-md transition-shadow">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-container/30 text-secondary font-bold text-sm flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-primary pt-1 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CaseNavigator;
