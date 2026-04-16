import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  DollarSign, 
  Globe, 
  Send,
  ArrowLeft
} from 'lucide-react';
import { useLeads } from '../hooks/useLeads';
import { cn } from '../lib/utils';

export default function AddLead() {
  const navigate = useNavigate();
  const { addLead } = useLeads();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'New' as const,
    source: '',
    value: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addLead(formData);
      navigate('/leads');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header className="flex items-center space-x-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-white">Add New Lead</h2>
          <p className="text-slate-400 mt-1">Fill in the details to create a new business opportunity.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Full Name *</span>
            </label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Address *</span>
            </label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Phone Number</span>
            </label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>Company</span>
            </label>
            <input 
              type="text" 
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              placeholder="Acme Inc."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Source</span>
            </label>
            <input 
              type="text" 
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              placeholder="Website, LinkedIn, etc."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Estimated Value</span>
            </label>
            <input 
              type="number" 
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Status</label>
          <div className="grid grid-cols-3 gap-4">
            {['New', 'Contacted', 'Closed'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFormData({ ...formData, status: status as any })}
                className={cn(
                  "py-2.5 rounded-xl border text-sm font-medium transition-all duration-200",
                  formData.status === status 
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20" 
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-900/20 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Create Lead</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
