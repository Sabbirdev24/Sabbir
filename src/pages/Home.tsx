import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { PortfolioData } from '../types';
import { Facebook, MessageSquare, Mail } from 'lucide-react';

export default function Home({ data }: { data: PortfolioData }) {
  const { settings, skills, social } = data;
  const [yearCount, setYearCount] = useState(2019);
  const [mediaLoading, setMediaLoading] = useState(true);

  useEffect(() => {
    const target = 2026;
    const duration = 2000;
    const steps = target - 2019;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setYearCount((prev) => {
        if (prev < target) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-400/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, -90, 0],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-400/20 rounded-full blur-3xl"
          />
        </div>

        {/* Floating Tags */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Graphic Designer', 'Meta Marker', 'Web Developer', 'Video Editor'].map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: [0, -10, 0],
              }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ 
                opacity: { delay: 0.2 + (i * 0.1) },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
              }}
              className="relative px-6 py-2 border border-dashed border-blue-300 text-slate-600 text-sm font-medium bg-white/50 backdrop-blur-sm cursor-default"
            >
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
              {tag}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [1, 1.1, 1] }}
            transition={{ 
              opacity: { delay: 0.7 },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-12 h-12 bg-[#2b6df2] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-300"
          >
            {yearCount}
          </motion.div>
        </div>

        {/* Huge Name */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[12vw] font-black text-[#7ea6ff] leading-none tracking-tighter mb-12 select-none drop-shadow-sm"
        >
          Sabbir Sakib
        </motion.h1>

        {/* Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, scale: 1.05 }}
          transition={{ delay: 0.8 }}
          className="px-10 py-5 bg-[#f0f5ff] border border-blue-100 rounded-full shadow-sm cursor-default"
        >
          <p className="text-slate-800 font-bold text-lg">{settings.tagline}</p>
        </motion.div>
      </section>

      {/* My Works Section */}
      <section className="py-32 px-4 bg-slate-50/30">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-[#7ea6ff] mb-2">My Works</h2>
            <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-black mb-16">FEATURED PROJECTS</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group mb-12"
          >
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/portfolio"
              className="inline-block px-10 py-4 bg-orange-500 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-orange-600 hover:scale-105 transition-all shadow-lg shadow-orange-200"
            >
              View More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-[#7ea6ff] mb-2">About Me</h2>
            <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-black mb-20">SKILLS & EXPERTISE</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-left">
            <div className="space-y-10">
              {skills.slice(0, 3).map((skill, i) => (
                <motion.div 
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-black text-slate-900 text-sm uppercase tracking-widest">{skill.name}</span>
                    <span className="font-black text-blue-600 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                      className="h-full bg-gradient-to-r from-purple-400 to-orange-400"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-80 h-80 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                <div className="relative w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={settings.about_image_url} 
                    alt={settings.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/about"
              className="inline-block mt-20 px-10 py-4 bg-orange-500 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-orange-600 hover:scale-105 transition-all shadow-lg shadow-orange-200"
            >
              View More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Join My Community Section */}
      <section className="py-32 px-4 bg-slate-50/50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-[#7ea6ff] mb-2">Join My Community</h2>
            <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-black mb-20">CONNECT & COLLABORATE</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-12 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center group transition-all duration-500 hover:shadow-2xl"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <Facebook size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Facebook Group</h3>
              <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed">
                Join our creative community where designers share their work and provide valuable feedback to each other.
              </p>
              <a 
                href="https://www.facebook.com/groups/bismahsoftbd"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-slate-200 rounded-full text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
              >
                Join Group
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="p-12 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center group transition-all duration-500 hover:shadow-2xl"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">WhatsApp Group</h3>
              <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed">
                Connect instantly with fellow motion designers and video editors. Share tips, tricks, and get real-time support.
              </p>
              <a 
                href="https://wa.me/8801345417317"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-slate-200 rounded-full text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
              >
                Join Group
              </a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/community"
              className="inline-block px-10 py-4 bg-orange-500 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-orange-600 hover:scale-105 transition-all shadow-lg shadow-orange-200"
            >
              View More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Me Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-[#7ea6ff] mb-2">Contact Me</h2>
            <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-black mb-20">LET'S WORK TOGETHER</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="p-12 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-8 group-hover:animate-bounce">
                <Mail size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Email</h3>
              <a href={`mailto:${settings.email}`} className="text-orange-500 font-bold text-sm mb-2 hover:underline">{settings.email}</a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="p-12 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:animate-bounce">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">WhatsApp</h3>
              <a href={`https://wa.me/${settings.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-500 font-bold text-sm mb-2 hover:underline">{settings.whatsapp}</a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/contact"
              className="inline-block px-10 py-4 bg-orange-500 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-orange-600 hover:scale-105 transition-all shadow-lg shadow-orange-200"
            >
              View More
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
