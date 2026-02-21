import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PortfolioData } from '../types';
import { Send, Briefcase, Calendar, DollarSign, MessageSquare } from 'lucide-react';

export default function Hire({ data }: { data: PortfolioData }) {
  const { settings } = data;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-xl text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-8">
            <Send size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Inquiry Sent!</h2>
          <p className="text-slate-500 font-medium mb-10">
            Thank you for your interest. I'll review your project details and get back to you within 24 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Send Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-[#7ea6ff] mb-6"
        >
          Hire Me
        </motion.h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Let's discuss your next big project. Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 rounded-[3rem] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-5"
        >
          {/* Sidebar Info */}
          <div className="lg:col-span-2 bg-slate-900 p-12 text-white">
            <h3 className="text-2xl font-black mb-10">Project Details</h3>
            <div className="space-y-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-1">Service</h4>
                  <p className="text-sm font-medium">Motion Graphics, Video Editing, or Web Development.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-1">Timeline</h4>
                  <p className="text-sm font-medium">Standard projects take 1-3 weeks depending on complexity.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-purple-400 flex-shrink-0">
                  <DollarSign size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-1">Budget</h4>
                  <p className="text-sm font-medium">Flexible pricing based on project scope and requirements.</p>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-white/10">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">Direct Contact</p>
              <p className="text-sm font-bold">{settings.email}</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input required type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Project Type</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium appearance-none">
                  <option>Motion Graphics</option>
                  <option>Video Editing</option>
                  <option>Web Development</option>
                  <option>Graphic Design</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Budget Range</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium appearance-none">
                  <option>$500 - $1,000</option>
                  <option>$1,000 - $3,000</option>
                  <option>$3,000 - $5,000</option>
                  <option>$5,000+</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Project Description</label>
                <textarea required rows={4} placeholder="Tell me about your project goals..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium resize-none"></textarea>
              </div>

              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3">
                <Send size={18} />
                Send Inquiry
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
