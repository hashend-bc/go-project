
import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";


type Page = "register" | "login" | "protected";

const NAV_TABS: { id: Page; label: string; icon: React.ReactNode }[] = [
  {
    id: "register",
    label: "Register",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    id: "login",
    label: "Sign In",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
    ),
  },
  {
    id: "protected",
    label: "Protected",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

// Accent color per tab
const ACCENT: Record<Page, string> = {
  register: "emerald",
  login: "sky",
  protected: "violet",
};

const App: React.FC = () => {
  
  const [currentPage, setCurrentPage] = useState<Page>("register");

  const accent = ACCENT[currentPage];

  return (
    
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/3 rounded-full blur-3xl" />
      </div>

      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, #334155 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Main Card ── */}
      <div className="relative w-full max-w-md">

        {/* Card glow effect based on current accent */}
        <div
          className={`absolute -inset-0.5 rounded-2xl blur-xl opacity-20 transition-all duration-500 ${
            accent === "emerald" ? "bg-emerald-500" :
            accent === "sky" ? "bg-sky-500" : "bg-violet-500"
          }`}
        />

        <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">

          {/* ── Brand Header ── */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              {/* JWT logo mark */}
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <div>
                <h1 className="text-slate-100 font-bold text-lg tracking-tight leading-none">
                  JWT Auth
                </h1>
                <p className="text-slate-500 text-xs mt-0.5">Go backend · React frontend</p>
              </div>
              {/* Live status indicator */}
              <div className="ml-auto flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-full px-3 py-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-slate-400">localhost:8080</span>
              </div>
            </div>

            {/* ── Navigation Tabs ── */}
            <div className="flex gap-1 mt-4 bg-slate-800/60 p-1 rounded-xl">
              {NAV_TABS.map((tab) => {
                const isActive = currentPage === tab.id;
                const tabAccent = ACCENT[tab.id];
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentPage(tab.id)}
                    className={`
                      flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold
                      transition-all duration-200
                      ${isActive
                        ? `text-white shadow-lg ${
                            tabAccent === "emerald"
                              ? "bg-emerald-500 shadow-emerald-500/30"
                              : tabAccent === "sky"
                              ? "bg-sky-500 shadow-sky-500/30"
                              : "bg-violet-500 shadow-violet-500/30"
                          }`
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                      }
                    `}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Page Content ── */}
          <div className="px-6 py-6">
            {currentPage === "register" && <Register />}
            {currentPage === "login" && <Login />}
            {currentPage === "protected" && <Protected />}
          </div>

          {/* ── Footer ── */}
          <div className="px-6 pb-5">
            <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
              <p className="text-slate-600 text-xs">
                JWT · Go · React · TypeScript
              </p>
              <div className="flex items-center gap-1 text-slate-600 text-xs">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Auth
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;