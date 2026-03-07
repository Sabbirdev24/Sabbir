import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Code, 
  Briefcase, 
  Users, 
  Mail, 
  Settings, 
  Plus, 
  Trash2, 
  Save, 
  ExternalLink,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
  LayoutDashboard,
  Palette,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';
import { PortfolioData, Skill, Experience, SocialLink, Course } from '../types';

const ImageUpload = ({ onUpload, currentUrl }: { onUpload: (url: string) => void, currentUrl?: string }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onUpload(data.url);
      }
    } catch (err) {
      console.error('Upload failed', err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      {currentUrl && (
        <div className="relative group">
          <img src={currentUrl} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-slate-200" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <ImageIcon size={14} className="text-white" />
          </div>
        </div>
      )}
      <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-all text-sm font-bold">
        <Plus size={16} />
        {uploading ? 'Uploading...' : 'Upload Image'}
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      </label>
    </div>
  );
};

interface AdminDashboardProps {
  data: PortfolioData;
  onUpdate: () => void;
  onExit: () => void;
}

export default function AdminDashboard({ data, onUpdate, onExit }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'portfolio' | 'about' | 'courses' | 'community' | 'contact'>('home');
  const [settings, setSettings] = useState(data.settings);
  const [skills, setSkills] = useState(data.skills);
  const [experience, setExperience] = useState(data.experience);
  const [education, setEducation] = useState(data.education);
  const [courses, setCourses] = useState(data.courses);
  const [projects, setProjects] = useState(data.projects);
  const [social, setSocial] = useState(data.social);
  const [communityStats, setCommunityStats] = useState(data.community_stats);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });
      await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills }),
      });
      await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experience }),
      });
      await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ education }),
      });
      await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courses }),
      });
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects }),
      });
      await fetch('/api/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ social }),
      });
      await fetch('/api/community-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stats: communityStats }),
      });
      onUpdate();
      alert('Portfolio updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save changes.');
    }
    setSaving(false);
  };

  const addSkill = () => setSkills([...skills, { name: 'New Skill', level: 80, category: 'General', description: '' }]);
  const removeSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index));

  const addExperience = () => setExperience([...experience, { title: 'New Role', company: 'New Company', period: '2026 - Present', description: 'Description here', details: [] }]);
  const removeExperience = (index: number) => setExperience(experience.filter((_, i) => i !== index));

  const addEducation = () => setEducation([...education, { degree: 'New Degree', institution: 'New Institution', period: '2022 - 2024', description: 'Description', icon: 'school' }]);
  const removeEducation = (index: number) => setEducation(education.filter((_, i) => i !== index));

  const addSocial = () => setSocial([...social, { platform: 'New Platform', url: 'https://...', icon: 'link' }]);
  const removeSocial = (index: number) => setSocial(social.filter((_, i) => i !== index));

  const addCourse = () => setCourses([...courses, { id: Date.now(), title: 'New Course', description: 'Description', price: 0, instructor: settings.name, thumbnail: 'https://picsum.photos/800/450', duration: '1h', lessons: 1, category: 'General' }]);
  const removeCourse = (index: number) => setCourses(courses.filter((_, i) => i !== index));

  const addProject = () => setProjects([...projects, { id: Date.now(), title: 'New Project', category: 'Video Editing', thumbnail: 'https://picsum.photos/800/450', description: 'Description', tags: [] }]);
  const removeProject = (index: number) => setProjects(projects.filter((_, i) => i !== index));

  const tabs = [
    { id: 'home', name: 'Home', icon: LayoutDashboard },
    { id: 'portfolio', name: 'Portfolio', icon: Palette },
    { id: 'about', name: 'About', icon: User },
    { id: 'courses', name: 'Courses', icon: BookOpen },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'contact', name: 'Contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-200 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">A</div>
          <span className="font-black text-slate-900 tracking-tighter">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 space-y-2">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            onClick={onExit}
            className="w-full flex items-center justify-center gap-2 text-slate-500 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all"
          >
            <LogOut size={18} />
            Exit Admin
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 ml-64 overflow-y-auto p-10">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'home' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-slate-900">Home Section</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={settings.name}
                    onChange={(e) => setSettings({...settings, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Designation</label>
                  <input 
                    type="text" 
                    value={settings.designation}
                    onChange={(e) => setSettings({...settings, designation: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tagline</label>
                <input 
                  type="text" 
                  value={settings.tagline}
                  onChange={(e) => setSettings({...settings, tagline: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Hero Media Type</label>
                  <select 
                    value={settings.media_type}
                    onChange={(e) => setSettings({...settings, media_type: e.target.value as 'video' | 'image'})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="image">Profile Picture</option>
                    <option value="video">YouTube Video</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">YouTube Video URL</label>
                  <input 
                    type="text" 
                    value={settings.youtube_url}
                    onChange={(e) => setSettings({...settings, youtube_url: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Profile Image (Hero & About Me)</label>
                <input 
                  type="text" 
                  value={settings.about_image_url}
                  onChange={(e) => setSettings({...settings, about_image_url: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-2" 
                />
                <ImageUpload 
                  currentUrl={settings.about_image_url} 
                  onUpload={(url) => setSettings({...settings, about_image_url: url})} 
                />
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900">Portfolio Section</h2>
                <button onClick={addProject} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add Project
                </button>
              </div>
              <div className="space-y-6">
                {projects.map((project, i) => (
                  <div key={i} className="p-8 bg-white border border-slate-200 rounded-2xl space-y-4">
                    <div className="flex justify-between items-start">
                      <input 
                        type="text" 
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = [...projects];
                          newProjects[i].title = e.target.value;
                          setProjects(newProjects);
                        }}
                        className="text-xl font-bold bg-transparent outline-none border-b border-transparent focus:border-blue-500 w-full"
                      />
                      <button onClick={() => removeProject(i)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        value={project.category}
                        onChange={(e) => {
                          const newProjects = [...projects];
                          newProjects[i].category = e.target.value as any;
                          setProjects(newProjects);
                        }}
                        className="px-4 py-2 bg-slate-50 rounded-lg outline-none"
                      >
                        <option value="Video Editing">Video Editing</option>
                        <option value="Graphic Design">Graphic Design</option>
                      </select>
                      <input 
                        type="text" 
                        value={project.thumbnail}
                        onChange={(e) => {
                          const newProjects = [...projects];
                          newProjects[i].thumbnail = e.target.value;
                          setProjects(newProjects);
                        }}
                        placeholder="Thumbnail URL"
                        className="px-4 py-2 bg-slate-50 rounded-lg outline-none"
                      />
                    </div>
                    <div className="flex justify-end">
                      <ImageUpload 
                        currentUrl={project.thumbnail}
                        onUpload={(url) => {
                          const newProjects = [...projects];
                          newProjects[i].thumbnail = url;
                          setProjects(newProjects);
                        }}
                      />
                    </div>
                    <input 
                      type="text" 
                      value={project.video_url || ''}
                      onChange={(e) => {
                        const newProjects = [...projects];
                        newProjects[i].video_url = e.target.value;
                        setProjects(newProjects);
                      }}
                      placeholder="Video URL (optional)"
                      className="w-full px-4 py-2 bg-slate-50 rounded-lg outline-none"
                    />
                    <textarea 
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...projects];
                        newProjects[i].description = e.target.value;
                        setProjects(newProjects);
                      }}
                      className="w-full px-4 py-2 bg-slate-50 rounded-lg outline-none"
                      placeholder="Project Description"
                    ></textarea>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900">About Section</h2>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">About Me Text</label>
                  <textarea 
                    rows={6}
                    value={settings.about_me}
                    onChange={(e) => setSettings({...settings, about_me: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Featured Image URL (After About Me)</label>
                  <input 
                    type="text" 
                    value={settings.about_extra_image_url || ''}
                    onChange={(e) => setSettings({...settings, about_extra_image_url: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-2" 
                  />
                  <ImageUpload 
                    currentUrl={settings.about_extra_image_url}
                    onUpload={(url) => setSettings({...settings, about_extra_image_url: url})}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">Skills</h3>
                  <button onClick={addSkill} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                    <Plus size={14} /> Add Skill
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill, i) => (
                    <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={skill.name}
                          onChange={(e) => {
                            const newSkills = [...skills];
                            newSkills[i].name = e.target.value;
                            setSkills(newSkills);
                          }}
                          className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none"
                        />
                        <input 
                          type="number" 
                          value={skill.level}
                          onChange={(e) => {
                            const newSkills = [...skills];
                            newSkills[i].level = parseInt(e.target.value);
                            setSkills(newSkills);
                          }}
                          className="w-16 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none"
                        />
                        <button onClick={() => removeSkill(i)} className="text-red-500 p-1.5 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">Experience</h3>
                  <button onClick={addExperience} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                    <Plus size={14} /> Add Experience
                  </button>
                </div>
                <div className="space-y-4">
                  {experience.map((exp, i) => (
                    <div key={i} className="p-6 bg-white border border-slate-200 rounded-xl space-y-4">
                      <div className="flex justify-between">
                        <input 
                          type="text" 
                          value={exp.title}
                          onChange={(e) => {
                            const newExp = [...experience];
                            newExp[i].title = e.target.value;
                            setExperience(newExp);
                          }}
                          className="font-bold bg-transparent outline-none border-b border-transparent focus:border-blue-500 flex-1"
                        />
                        <button onClick={() => removeExperience(i)} className="text-red-500 p-1.5 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...experience];
                            newExp[i].company = e.target.value;
                            setExperience(newExp);
                          }}
                          placeholder="Company"
                          className="px-3 py-1.5 bg-slate-50 rounded-lg text-sm outline-none"
                        />
                        <input 
                          type="text" 
                          value={exp.period}
                          onChange={(e) => {
                            const newExp = [...experience];
                            newExp[i].period = e.target.value;
                            setExperience(newExp);
                          }}
                          placeholder="Period"
                          className="px-3 py-1.5 bg-slate-50 rounded-lg text-sm outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900">Courses Section</h2>
                <button onClick={addCourse} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                  <Plus size={16} /> Add Course
                </button>
              </div>
              <div className="space-y-6">
                {courses.map((course, i) => (
                  <div key={i} className="p-8 bg-white border border-slate-200 rounded-2xl space-y-4">
                    <div className="flex justify-between items-start">
                      <input 
                        type="text" 
                        value={course.title}
                        onChange={(e) => {
                          const newCourses = [...courses];
                          newCourses[i].title = e.target.value;
                          setCourses(newCourses);
                        }}
                        className="text-xl font-bold bg-transparent outline-none border-b border-transparent focus:border-blue-500 w-full"
                      />
                      <button onClick={() => removeCourse(i)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="number" 
                        value={course.price}
                        onChange={(e) => {
                          const newCourses = [...courses];
                          newCourses[i].price = parseFloat(e.target.value);
                          setCourses(newCourses);
                        }}
                        placeholder="Price"
                        className="px-4 py-2 bg-slate-50 rounded-lg outline-none"
                      />
                      <input 
                        type="text" 
                        value={course.category}
                        onChange={(e) => {
                          const newCourses = [...courses];
                          newCourses[i].category = e.target.value;
                          setCourses(newCourses);
                        }}
                        placeholder="Category"
                        className="px-4 py-2 bg-slate-50 rounded-lg outline-none"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        value={course.thumbnail}
                        onChange={(e) => {
                          const newCourses = [...courses];
                          newCourses[i].thumbnail = e.target.value;
                          setCourses(newCourses);
                        }}
                        placeholder="Thumbnail URL"
                        className="w-full px-4 py-2 bg-slate-50 rounded-lg outline-none mb-2"
                      />
                      <ImageUpload 
                        currentUrl={course.thumbnail}
                        onUpload={(url) => {
                          const newCourses = [...courses];
                          newCourses[i].thumbnail = url;
                          setCourses(newCourses);
                        }}
                      />
                    </div>
                    <textarea 
                      value={course.description}
                      onChange={(e) => {
                        const newCourses = [...courses];
                        newCourses[i].description = e.target.value;
                        setCourses(newCourses);
                      }}
                      className="w-full px-4 py-2 bg-slate-50 rounded-lg outline-none"
                      placeholder="Course Description"
                    ></textarea>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-slate-900">Community Section</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Students Count</label>
                  <input 
                    type="text" 
                    value={communityStats.students}
                    onChange={(e) => setCommunityStats({...communityStats, students: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Projects Count</label>
                  <input 
                    type="text" 
                    value={communityStats.projects}
                    onChange={(e) => setCommunityStats({...communityStats, projects: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Discussions Count</label>
                  <input 
                    type="text" 
                    value={communityStats.discussions}
                    onChange={(e) => setCommunityStats({...communityStats, discussions: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Likes Count</label>
                  <input 
                    type="text" 
                    value={communityStats.likes}
                    onChange={(e) => setCommunityStats({...communityStats, likes: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900">Contact Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={settings.email}
                      onChange={(e) => setSettings({...settings, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp Number</label>
                    <input 
                      type="text" 
                      value={settings.whatsapp}
                      onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">Social Links</h3>
                  <button onClick={addSocial} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                    <Plus size={14} /> Add Link
                  </button>
                </div>
                <div className="space-y-4">
                  {social.map((link, i) => (
                    <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4">
                      <input 
                        type="text" 
                        value={link.platform}
                        onChange={(e) => {
                          const newSocial = [...social];
                          newSocial[i].platform = e.target.value;
                          setSocial(newSocial);
                        }}
                        placeholder="Platform"
                        className="w-32 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none"
                      />
                      <input 
                        type="text" 
                        value={link.url}
                        onChange={(e) => {
                          const newSocial = [...social];
                          newSocial[i].url = e.target.value;
                          setSocial(newSocial);
                        }}
                        placeholder="URL"
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none"
                      />
                      <button onClick={() => removeSocial(i)} className="text-red-500 p-1.5 hover:bg-red-50 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
