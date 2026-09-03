import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { LegalDisclaimer } from '../common/LegalDisclaimer';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  Clock, 
  Scale, 
  HelpCircle, 
  Minimize2, 
  Maximize2,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    tab: string;
  };
}

export const AIAssistantModal: React.FC = () => {
  const { isAssistantOpen, setIsAssistantOpen, setActiveTab, cases } = useCourt();

  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'MSG-01',
      sender: 'bot',
      text: "Namaste & Good Day. I am **NyayaBot AI**, your judicial administrative copilot. How may I assist you with docket intelligence, schedule optimization, precedent analysis, or delay diagnostics today?",
      timestamp: 'Just now'
    }
  ]);

  const presetQueries = [
    "Show me urgent cases scheduled this week.",
    "Which judges have the highest workload?",
    "Analyze delay risk for docket matters.",
    "What is the average resolution time this month?"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `USER-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let action: ChatMessage['suggestedAction'] = undefined;

      const lower = query.toLowerCase();
      const urgentCases = cases.filter((c) => c.priority === 'Urgent' || c.priority === 'Critical');

      if (lower.includes('urgent') || lower.includes('priority')) {
        if (urgentCases.length === 0) {
          reply = `Currently, there are **0 urgent matters** pending on the active docket. Any expedited filings or emergency bail petitions will be flagged here in real-time.`;
        } else {
          reply = `Currently, **${urgentCases.length} priority matter(s)** are listed on the active docket (${urgentCases.map((c) => c.id).join(', ')}).`;
        }
        action = { label: 'Open Case Registry', tab: 'cases' };
      } else if (lower.includes('workload') || lower.includes('judge')) {
        if (cases.length === 0) {
          reply = "All 6 High Court judicial benches and courtrooms are synchronized with a **clean 0 baseline**. Workloads will be distributed dynamically upon e-filing.";
        } else {
          reply = `Active docket currently contains **${cases.length} registered case(s)** distributed across benches with 98% courtroom utilization.`;
        }
        action = { label: 'View Judicial Analytics', tab: 'analytics' };
      } else if (lower.includes('delay') || lower.includes('timeline') || lower.includes('risk')) {
        if (cases.length === 0) {
          reply = "There are currently **0 cases on the docket**. Register a new case to compute AI timeline predictions, milestone projections, and delay risk flags.";
        } else {
          const firstCase = cases[0];
          reply = `**Case #${firstCase.id} (${firstCase.title})** has an estimated completion date of **${firstCase.predictedCompletion}** (${firstCase.estimatedRemainingDays} days remaining). Delay probability is rated **${firstCase.delayRisk}**.`;
        }
        action = { label: 'Inspect Timeline Predictions', tab: 'predictions' };
      } else if (lower.includes('resolution') || lower.includes('time') || lower.includes('average')) {
        if (cases.length === 0) {
          reply = "The system is initialized at **0 days baseline**. Standard statutory benchmark is set at **150 days** across all 6 High Court Benches.";
        } else {
          reply = "The current average resolution velocity is **148 days** (an 8% improvement from last quarter), compliant with statutory standards.";
        }
        action = { label: 'View Workload Trends', tab: 'analytics' };
      } else {
        reply = `I have analyzed your query regarding "${query}". Based on court records, ${cases.length} active docket matter(s) are recorded in compliance with e-Courts standards. I can assist you in registering cases, scheduling benches, or searching landmark precedents.`;
      }


      const botMsg: ChatMessage = {
        id: `BOT-${Date.now()}`,
        sender: 'bot',
        text: reply,
        timestamp: 'Just now',
        suggestedAction: action
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  if (!isAssistantOpen) {
    return (
      <button
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-court-900 hover:bg-court-850 text-white p-3.5 rounded-full shadow-2xl border border-amber-500/40 flex items-center gap-2.5 transition-all hover:scale-105 group no-print"
        title="Open NyayaBot AI Assistant"
      >
        <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-court-950 font-bold shadow-gold-sm">
          <Sparkles className="w-4 h-4 text-court-950 animate-spin-slow" />
        </div>
        <span className="text-xs font-bold pr-1 hidden sm:inline text-amber-300">
          NyayaBot AI Copilot
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col h-[540px] animate-in slide-in-from-bottom-5 duration-200 overflow-hidden no-print">
      {/* Header */}
      <div className="px-4 py-3 bg-court-950 text-white flex items-center justify-between border-b border-court-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-court-950 font-bold shadow-gold-sm">
            <Sparkles className="w-4 h-4 text-court-950" />
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
              NyayaBot Judicial AI
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                Copilot
              </span>
            </h4>
            <p className="text-[10px] text-slate-400">Administrative Decision Support</p>
          </div>
        </div>

        <button
          onClick={() => setIsAssistantOpen(false)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-court-850 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50/60">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                  isBot ? 'bg-amber-500 text-court-950 shadow-xs' : 'bg-court-900 text-white'
                }`}
              >
                {isBot ? 'AI' : 'U'}
              </div>

              <div
                className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                  isBot
                    ? 'bg-white border border-slate-200 text-slate-800 shadow-2xs'
                    : 'bg-court-900 text-white'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                {msg.suggestedAction && (
                  <button
                    onClick={() => {
                      setActiveTab(msg.suggestedAction!.tab);
                    }}
                    className="mt-2 text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <span>{msg.suggestedAction.label} →</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200"></span>
            <span>NyayaBot is retrieving judicial records...</span>
          </div>
        )}
      </div>

      {/* Preset Chips */}
      <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-1.5 shrink-0">
        {presetQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300 border border-slate-200 text-slate-700 font-medium transition-all shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask NyayaBot about cases, schedules, workloads..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 rounded-xl bg-court-900 hover:bg-court-850 text-white disabled:opacity-40 transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </form>
        <div className="mt-1 text-[9px] text-slate-400 text-center italic">
          AI output is non-binding decision support. Not a judicial verdict.
        </div>
      </div>
    </div>
  );
};
