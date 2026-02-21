import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, LogOut, User, CheckCircle } from 'lucide-react';

interface Student {
  name: string;
  email: string;
  picture: string;
  enrollments: any[];
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('student_email');
    if (email) {
      fetchStudent(email);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchStudent = async (email: string) => {
    try {
      const res = await fetch(`/api/student/me?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setStudent(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('student_email');
    setStudent(null);
    window.location.href = '/courses';
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!student) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-black text-slate-900 mb-4">Not Authenticated</h2>
      <p className="text-slate-500 mb-8">Please log in from the courses page to view your dashboard.</p>
      <a href="/courses" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold">Go to Courses</a>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 bg-white p-8 rounded-[2.5rem] shadow-sm">
          <div className="flex items-center gap-6">
            <img src={student.picture} alt={student.name} className="w-20 h-20 rounded-full border-4 border-blue-50" />
            <div>
              <h1 className="text-3xl font-black text-slate-900">Welcome, {student.name}!</h1>
              <p className="text-slate-500 font-medium">{student.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <BookOpen className="text-blue-600" /> My Enrolled Courses
            </h2>
            
            {student.enrollments.length === 0 ? (
              <div className="p-12 bg-white rounded-[2.5rem] text-center border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium mb-6">You haven't enrolled in any courses yet.</p>
                <a href="/courses" className="text-blue-600 font-bold hover:underline">Browse Courses</a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {student.enrollments.map((enrollment) => (
                  <motion.div 
                    key={enrollment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100"
                  >
                    <img src={enrollment.course_thumbnail} alt={enrollment.course_title} className="w-full h-40 object-cover" />
                    <div className="p-6">
                      <h3 className="font-bold text-slate-900 mb-4">{enrollment.course_title}</h3>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          enrollment.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {enrollment.status}
                        </span>
                        <button className="text-blue-600 font-bold text-sm hover:underline">Continue Learning</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <User className="text-blue-600" /> Learning Progress
            </h2>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">Courses Enrolled</span>
                <span className="text-2xl font-black text-slate-900">{student.enrollments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">Completed</span>
                <span className="text-2xl font-black text-emerald-600">
                  {student.enrollments.filter(e => e.status === 'completed').length}
                </span>
              </div>
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 text-blue-600 font-bold">
                  <CheckCircle size={20} />
                  <span>Keep going, you're doing great!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
