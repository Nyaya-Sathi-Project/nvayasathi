import React from 'react'
import CaseNavigator from './CaseNavigator'
import { Scale, BookOpen, User, Settings, Shield, Plus, MessageSquare } from 'lucide-react'

function App() {
  return (
    <div className="h-screen flex overflow-hidden bg-surface">
      {/* Sidebar (Stitch Style) */}
      <aside className="w-[260px] flex-shrink-0 bg-surface-container-low border-r border-surface-container-highest flex flex-col transition-all duration-300">
        <div className="p-4 border-b border-surface-container-highest">
          <div className="flex items-center gap-3 mb-6 mt-2">
            <div className="bg-primary-container p-2 rounded-sm text-surface-container-lowest shadow-md">
              <Scale size={20} strokeWidth={2.5} />
            </div>
            <span className="font-headline font-bold tracking-tighter text-xl text-primary">
              Nyaya-sathi
            </span>
          </div>
          <button className="tonal-btn w-full py-2.5 text-sm gap-2 shadow-sm">
            <Plus size={16} /> New Analysis
          </button>
        </div>

        <div className="flex-1 overflow-y-auto chat-scroll p-3 space-y-1">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 px-2 mt-4">Ledger History</p>
          {[1, 2, 3].map((_, i) => (
            <button key={i} className="flex items-center gap-3 w-full p-2.5 text-sm text-on-surface-variant hover:bg-surface-container-high rounded-md transition-colors text-left group">
              <MessageSquare size={16} className="text-primary/50 group-hover:text-primary transition-colors" />
              <span className="truncate">Document Analysis #{i+1}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-surface-container-highest">
          <button className="flex items-center gap-3 w-full p-2.5 text-sm text-on-surface-variant hover:bg-surface-container-high rounded-md transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2.5 text-sm text-on-surface-variant hover:bg-surface-container-high rounded-md transition-colors mt-1">
            <User size={18} />
            <span>Citizen Profile</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full">
        <header className="absolute top-0 w-full glass-card z-50 px-6 py-4 flex items-center justify-between border-b border-surface-container-highest/50">
          <h2 className="font-headline text-lg text-primary flex items-center gap-2">
            <Shield size={18} className="text-primary" /> The Sovereign Ledger
          </h2>
          <div className="flex items-center gap-4">
             <a href="#" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium mr-4">
                <BookOpen size={16} /> Precedents
             </a>
             <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold font-headline text-xs border border-primary/10 cursor-pointer hover:bg-surface-container-high transition-colors">
               IN
             </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto chat-scroll w-full pt-24 pb-8 flex flex-col items-center">
          <CaseNavigator />
        </div>
      </main>
    </div>
  )
}

export default App
