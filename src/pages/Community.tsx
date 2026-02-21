import React from 'react';
import { motion } from 'motion/react';
import { PortfolioData } from '../types';
import { Users, MessageSquare, Share2, Heart } from 'lucide-react';

export default function Community({ data }: { data: PortfolioData }) {
  const { social, community_stats } = data;

  const communityStats = [
    { label: 'Students', value: community_stats.students, icon: Users },
    { label: 'Projects', value: community_stats.projects, icon: Share2 },
    { label: 'Discussions', value: community_stats.discussions, icon: MessageSquare },
    { label: 'Likes', value: community_stats.likes, icon: Heart },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-[#7ea6ff] mb-6"
        >
          Our Community
        </motion.h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Join a vibrant community of creators, designers, and storytellers. Share your work, get feedback, and grow together.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
        {communityStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white border border-slate-100 rounded-[2rem] text-center shadow-sm"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
              <stat.icon size={24} />
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Social Connect */}
      <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
        </div>
        
        <h3 className="text-4xl font-black mb-8 relative z-10">Connect with us on Social Media</h3>
        <p className="text-slate-400 max-w-xl mx-auto mb-12 relative z-10">
          Follow our journey and stay updated with the latest tutorials, tips, and community highlights.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 relative z-10">
          {social.map((link, i) => (
            <motion.a
              key={link.platform}
              href={link.url}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-slate-900 transition-all"
            >
              {link.platform}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
