import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData } from '../types';

export default function About({ data }: { data: PortfolioData }) {
  const { settings, skills, experience } = data;
  const [mediaLoading, setMediaLoading] = useState(true);

  const getYoutubeUrl = (baseUrl: string) => {
    try {
      const url = new URL(baseUrl);
      url.searchParams.set('autoplay', '1');
      url.searchParams.set('mute', '1');
      url.searchParams.set('rel', '0');
      url.searchParams.set('modestbranding', '1');
      url.searchParams.set('showinfo', '0');
      return url.toString();
    } catch (e) {
      const separator = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${separator}autoplay=1&mute=1&rel=0&modestbranding=1`;
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold text-[#7ea6ff] mb-2 text-center"
      >
        About Me
      </motion.h2>
      <p className="text-slate-400 uppercase tracking-[0.2em] text-sm font-bold mb-16 text-center">{settings.designation}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-[2.5rem] blur-sm opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <div 
              className={`relative rounded-[2.5rem] overflow-hidden border-2 border-white/50 shadow-2xl bg-black mx-auto`}
              style={{
                aspectRatio: settings.aspect_ratio === 'custom' ? 'auto' : settings.aspect_ratio.replace(':', '/'),
                width: settings.aspect_ratio === 'custom' ? `${settings.media_width}px` : '100%',
                height: settings.aspect_ratio === 'custom' ? `${settings.media_height}px` : 'auto',
                maxWidth: '100%'
              }}
            >
              <AnimatePresence>
                {mediaLoading && (
                  <motion.div 
                    key="spinner"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900"
                  >
                    <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {settings.media_type === 'video' ? (
                <iframe
                  src={getYoutubeUrl(settings.youtube_url)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => setMediaLoading(false)}
                  className="w-full h-full"
                  loading="lazy"
                ></iframe>
              ) : (
                <img 
                  src={settings.about_image_url} 
                  alt={settings.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onLoad={() => setMediaLoading(false)}
                  onError={(e) => {
                    setMediaLoading(false);
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/error/800/1000';
                  }}
                />
              )}
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:col-span-7"
        >
          <div className="prose prose-lg prose-slate max-w-none">
            {settings.about_me.split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-6 font-medium">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Featured Picture Section */}
      {settings.about_extra_image_url && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          viewport={{ once: true }}
          className="mb-32 relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl">
            <img 
              src={settings.about_extra_image_url} 
              alt="Featured Visual" 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </motion.div>
      )}

      {/* Core Skills Section */}
      <div className="mb-32">
        <h3 className="text-2xl font-bold text-slate-900 mb-12 flex items-center gap-4">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">01</span>
          Core Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-lg text-slate-900">{skill.name}</h4>
                <span className="text-blue-600 font-black">{skill.level}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-blue-600 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mb-32">
        <h3 className="text-2xl font-bold text-slate-900 mb-12 flex items-center gap-4">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">02</span>
          Work Experience
        </h3>
        <div className="space-y-8">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h4 className="text-2xl font-black text-slate-900 mb-1">{exp.title}</h4>
                  <p className="text-blue-600 font-bold">{exp.company}</p>
                </div>
                <span className="px-6 py-2 bg-slate-50 rounded-full text-xs font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                  {exp.period}
                </span>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed font-medium">{exp.description}</p>
              <div className="flex flex-wrap gap-3">
                {exp.details.map((detail, j) => (
                  <span key={j} className="px-4 py-2 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-lg">
                    {detail}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
