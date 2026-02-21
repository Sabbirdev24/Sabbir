export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  instructor: string;
  thumbnail: string;
  duration: string;
  lessons: number;
  category: string;
}

export interface Enrollment {
  id: number;
  course_id: number;
  user_email: string;
  status: 'enrolled' | 'completed';
  enrolled_at: string;
}

export interface Project {
  id: number;
  title: string;
  category: 'Video Editing' | 'Graphic Design';
  thumbnail: string;
  video_url?: string;
  description: string;
  tags: string[];
}

export interface PortfolioData {
  settings: {
    name: string;
    designation: string;
    tagline: string;
    about_me: string;
    email: string;
    whatsapp: string;
    primary_color: string;
    youtube_url: string;
    about_image_url: string;
    media_type: 'video' | 'image';
    media_width: string;
    media_height: string;
    aspect_ratio: string;
    about_extra_image_url?: string;
  };
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  courses: Course[];
  projects: Project[];
  social: SocialLink[];
  community_stats: {
    students: string;
    projects: string;
    discussions: string;
    likes: string;
  };
  enrollments?: Enrollment[];
}

export interface Skill {
  id?: number;
  name: string;
  level: number;
  category: string;
  description?: string;
}

export interface Experience {
  id?: number;
  title: string;
  company: string;
  period: string;
  description: string;
  details: string[];
}

export interface Education {
  id?: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  id?: number;
  platform: string;
  url: string;
  icon: string;
}
