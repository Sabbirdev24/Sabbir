import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioData } from './types';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Courses from './pages/Courses';
import Community from './pages/Community';
import Contact from './pages/Contact';
import StudentDashboard from './pages/StudentDashboard';
import Hire from './pages/Hire';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data", err);
      // Fallback to minimal data if API fails (useful for static previews)
      const fallbackData: PortfolioData = {
        settings: {
          name: 'Sabbir Sakib',
          designation: 'Motion Designer & Video Editor',
          tagline: 'Crafting Motion. Telling Stories.',
          about_me: 'A passionate motion designer and video editor...',
          email: 'sakibulislamsbmc@gmail.com',
          whatsapp: '+8801345417317',
          primary_color: '#4285f4',
          youtube_url: 'https://www.youtube.com/embed/7AuNdV_JSlM',
          about_image_url: 'https://picsum.photos/seed/sabbir/800/1000',
          media_type: 'image',
          media_width: '1080',
          media_height: '1080',
          aspect_ratio: '1:1',
          about_extra_image_url: 'https://picsum.photos/seed/extra/1200/600',
        },
        skills: [],
        experience: [],
        education: [],
        courses: [],
        projects: [],
        social: [],
        community_stats: {
          students: '0',
          projects: '0',
          discussions: '0',
          likes: '0',
        }
      };
      setData(fallbackData);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) return <div>Error loading portfolio.</div>;

  if (isAdmin) {
    return <AdminDashboard data={data} onUpdate={fetchData} onExit={() => setIsAdmin(false)} />;
  }

  return (
    <Router>
      <Layout 
        data={data} 
        isAdmin={isAdmin} 
        onAdminClick={() => setIsAdmin(true)}
        onExitAdmin={() => setIsAdmin(false)}
      >
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/about" element={<About data={data} />} />
          <Route path="/portfolio" element={<Portfolio data={data} />} />
          <Route path="/courses" element={<Courses data={data} onUpdate={fetchData} />} />
          <Route path="/community" element={<Community data={data} />} />
          <Route path="/contact" element={<Contact data={data} />} />
          <Route path="/hire" element={<Hire data={data} />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
