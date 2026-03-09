import React, { useState, useEffect } from "react";
import { getProtectedData, ProtectedResponse } from "../apis/api";

const Protected: React.FC = () => {
  
  const [data, setData] = useState<ProtectedResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    fetchProtected();
  }, []);

  const fetchProtected = async () => {
    setLoading(true);
    setErrorMsg("");
    setData(null);

    try {
      // Calls GET /protected with Authorization: Bearer <token>
      const result = await getProtectedData();
      setData(result);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number; data?: { message?: string } } };
      const status = axiosErr.response?.status;

      // Handle common JWT error cases
      if (status === 401) {
        setErrorMsg("Unauthorized — please log in first.");
      } else if (status === 403) {
        setErrorMsg("Token expired or invalid. Please log in again.");
      } else {
        setErrorMsg(
          axiosErr.response?.data?.message ?? "Unauthorized or Token Expired"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  
  
  const truncateToken = (t: string) =>
    t.length > 40 ? `${t.slice(0, 20)}…${t.slice(-10)}` : t;

  
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">Protected Resource</h2>
        </div>
        <p className="text-slate-400 text-sm pl-11">JWT-authenticated endpoint from your Go server</p>
      </div>

      {/* Token Preview Box */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Stored Token</span>
        </div>
        {token ? (
          <code className="block text-xs text-violet-300 font-mono break-all leading-relaxed">
            {truncateToken(token)}
          </code>
        ) : (
          <span className="text-xs text-slate-500 italic">No token found in localStorage</span>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center gap-3 py-8 text-slate-400 text-sm">
          <svg className="animate-spin w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Verifying token with server…</span>
        </div>
      )}

      {/* Success — Protected Data */}
      {!loading && data && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Access Granted</span>
          </div>
          <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 space-y-2">
            <p className="text-violet-200 text-sm font-medium">{data.message}</p>
            {/* Show any extra fields returned by the backend */}
            {Object.keys(data).filter((k) => k !== "message").length > 0 && (
              <pre className="text-xs text-slate-400 font-mono mt-2 overflow-auto">
                {JSON.stringify(
                  Object.fromEntries(Object.entries(data).filter(([k]) => k !== "message")),
                  null,
                  2
                )}
              </pre>
            )}
          </div>
        </div>
      )}

      {/* Error — Unauthorized / Expired */}
      {!loading && errorMsg && (
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-xl">
            <svg className="w-4 h-4 mt-0.5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
          <p className="text-slate-500 text-xs pl-1">
            Navigate to <span className="text-sky-400">Sign In</span> to get a fresh token.
          </p>
        </div>
      )}

      {/* Retry Button */}
      {!loading && (
        <button
          onClick={fetchProtected}
          className="w-full py-3 px-4 bg-violet-500 hover:bg-violet-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-400/30 transition-all duration-200 flex items-center justify-center gap-2 mt-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Retry Request
        </button>
      )}
    </div>
  );
};

export default Protected;