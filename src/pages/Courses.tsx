import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData, Course } from '../types';
import { BookOpen, Clock, PlayCircle, LogIn, User, ShoppingCart } from 'lucide-react';

export default function Courses({ data, onUpdate }: { data: PortfolioData, onUpdate: () => void }) {
  const { courses } = data;
  const [studentEmail, setStudentEmail] = useState<string | null>(localStorage.getItem('student_email'));

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        localStorage.setItem('student_email', event.data.email);
        setStudentEmail(event.data.email);
        onUpdate();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onUpdate]);

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth/google/url');
      const { url } = await res.json();
      window.open(url, 'google_login', 'width=600,height=700');
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnroll = async (courseId: number) => {
    if (!studentEmail) {
      handleLogin();
      return;
    }

    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: courseId, user_email: studentEmail }),
      });
      if (res.ok) {
        alert('Successfully enrolled in course!');
        onUpdate();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20">
        <div className="text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-[#7ea6ff] mb-6"
          >
            Learning Center
          </motion.h2>
          <p className="text-slate-500 max-w-xl font-medium">
            Master professional motion design, video editing, and content creation with our industry-standard courses.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {studentEmail ? (
            <a 
              href="/student-dashboard"
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
            >
              <User size={18} /> My Dashboard
            </a>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all"
            >
              <LogIn size={18} /> Student Login
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600">
                  {course.category}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-black text-slate-900 mb-4 line-clamp-2">{course.title}</h3>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={16} />
                  <span className="text-xs font-bold">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <PlayCircle size={16} />
                  <span className="text-xs font-bold">{course.lessons} Lessons</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="text-2xl font-black text-slate-900">${course.price}</div>
                <button 
                  onClick={() => handleEnroll(course.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                >
                  <ShoppingCart size={14} />
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
