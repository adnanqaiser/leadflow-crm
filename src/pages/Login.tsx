import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { LogIn, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 mb-4">
            <BarChart3 className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">LeadFlow CRM</h1>
          <p className="text-slate-400 text-lg">The modern way to manage your business leads.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-indigo-500/10">
                <Zap className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Fast & Efficient</h3>
                <p className="text-sm text-slate-500">Track leads from capture to close in seconds.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Secure Data</h3>
                <p className="text-sm text-slate-500">Your business data is protected and private.</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-slate-100 text-slate-900 py-3.5 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 shadow-lg shadow-white/5"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
              ) : (
                <>
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" referrerPolicy="no-referrer" />
                  <span>Continue with Google</span>
                </>
              )}
            </button>
            {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
