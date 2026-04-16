import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  DollarSign, 
  Globe, 
  Save 
} from 'lucide-react';
import { Lead } from '../types';
import { cn } from '../lib/utils';

interface EditLeadModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: Partial<Lead>) => Promise<void>;
}

export function EditLeadModal({ lead, isOpen, onClose, onSave }: EditLeadModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Lead>>({});

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        status: lead.status,
        source: lead.source,
        value: lead.value,
      });
    }
  }, [lead]);

  if (!isOpen || !lead) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(lead.id, formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <header className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Edit Lead</h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Full Name</span>
              </label>
              <input 
                required
                type="text" 
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email Address</span>
              </label>
              <input 
                required
                type="email" 
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Phone Number</span>
              </label>
              <input 
                type="tel" 
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>Company</span>
              </label>
              <input 
                type="text" 
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Source</span>
              </label>
              <input 
                type="text" 
                value={formData.source || ''}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>Estimated Value</span>
              </label>
              <input 
                type="number" 
                value={formData.value || 0}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
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
        </form>

        <footer className="p-6 border-t border-slate-800 bg-slate-800/30 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-900/20 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </footer>
      </div>
    </div>
  );
}
