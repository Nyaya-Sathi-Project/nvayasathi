import React from 'react'
import CaseNavigator from './CaseNavigator'
import { Scale, BookOpen, User, Settings, Shield } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sovereignty Navigation Bar */}
      <nav className="glass-card sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-surface-container-highest/30">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-sm text-surface-lowest">
            <Scale size={20} strokeWidth={2.5} />
          </div>
          <span className="font-headline font-bold tracking-tighter text-xl text-primary-dark">
            Nyaya-sathi
          </span>
        </div>

        {/* Global Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 font-body text-sm font-medium">
          <a href="#" className="flex items-center gap-2 text-primary-dark border-b-2 border-secondary pb-1">
            <Shield size={16} />
            The Ledger
          </a>
          <a href="#" className="flex items-center gap-2 text-on-surface/60 hover:text-primary transition-colors pb-1">
            <BookOpen size={16} />
            Precedents
          </a>
          <a href="#" className="flex items-center gap-2 text-on-surface/60 hover:text-primary transition-colors pb-1">
            <User size={16} />
            Citizen Profile
          </a>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-4">
          <button className="text-on-surface/60 hover:text-primary">
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary-dark font-bold font-headline text-xs border border-primary/10">
            IN
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1">
        <CaseNavigator />
      </main>
    </div>
  )
}

export default App
