import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData, Project } from '../types';
import { Play, ExternalLink, X } from 'lucide-react';

export default function Portfolio({ data }: { data: PortfolioData }) {
  const { projects } = data;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const videoProjects = projects.filter(p => p.category === 'Video Editing');
  const graphicProjects = projects.filter(p => p.category === 'Graphic Design');

  const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={() => setSelectedProject(project)}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-lg hover:scale-110 transition-transform"
          >
            {project.video_url ? <Play fill="currentColor" /> : <ExternalLink />}
          </button>
        </div>
      </div>
      <div className="p-8">
        <h4 className="text-xl font-black text-slate-900 mb-2">{project.title}</h4>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold text-[#7ea6ff] mb-16 text-center"
      >
        My Portfolio
      </motion.h2>

      {/* Video Editing Portfolio */}
      <div className="mb-32">
        <h3 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-4">
          <span className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg">01</span>
          Video Editing Portfolio
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videoProjects.map(project => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Graphic Design Portfolio */}
      <div className="mb-32">
        <h3 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-4">
          <span className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white text-lg">02</span>
          Graphic Design Portfolio
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {graphicProjects.map(project => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-white rounded-[3rem] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X />
              </button>
              
              <div className="aspect-video bg-black">
                {selectedProject.video_url ? (
                  <iframe
                    src={selectedProject.video_url}
                    className="w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img 
                    src={selectedProject.thumbnail} 
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              
              <div className="p-12">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4">{selectedProject.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-400 text-xs font-bold rounded-xl border border-slate-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
