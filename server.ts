import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

import multer from "multer";

const db = new Database("portfolio.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    level INTEGER,
    category TEXT,
    description TEXT
  );
`);

// Migration: Add description to skills if missing
try {
  db.prepare("ALTER TABLE skills ADD COLUMN description TEXT").run();
} catch (e) {
  // Column already exists or other error
}

db.exec(`
  CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    company TEXT,
    period TEXT,
    description TEXT,
    details TEXT -- JSON string for bullet points
  );

  CREATE TABLE IF NOT EXISTS education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    degree TEXT,
    institution TEXT,
    period TEXT,
    description TEXT,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT,
    thumbnail TEXT,
    video_url TEXT,
    description TEXT,
    tags TEXT
  );

  CREATE TABLE IF NOT EXISTS social_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT,
    url TEXT,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    price REAL,
    instructor TEXT,
    thumbnail TEXT,
    duration TEXT,
    lessons INTEGER,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER,
    user_email TEXT,
    status TEXT,
    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses (id)
  );
`);

// Seed initial data if empty
const seedData = () => {
  const initialSettings = [
    ['name', 'Sabbir Sakib'],
    ['designation', 'Motion Designer & Video Editor'],
    ['tagline', 'Crafting Motion. Telling Stories.'],
    ['about_me', 'A passionate motion designer and video editor with expertise in creating captivating visual stories. I specialize in transforming ideas into engaging motion graphics and compelling video content.\n\nWith a strong command of industry-standard tools like After Effects, Premiere Pro, and CapCut, I bring creativity and technical excellence to every project. My work spans across social media content, advertisements, and long-form YouTube videos.\n\nI believe in continuous learning and pushing creative boundaries to deliver work that not only meets but exceeds expectations.'],
    ['email', 'sakibulislamsbmc@gmail.com'],
    ['whatsapp', '+8801345417317'],
    ['primary_color', '#4285f4'],
    ['youtube_url', 'https://www.youtube.com/embed/7AuNdV_JSlM'],
    ['about_image_url', 'https://picsum.photos/seed/sabbir/800/1000'],
    ['media_type', 'image'],
    ['media_width', '1080'],
    ['media_height', '1080'],
    ['aspect_ratio', '1:1'],
    ['about_extra_image_url', 'https://picsum.photos/seed/extra/1200/600'],
  ];
  const insertSetting = db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
  const updateSetting = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
  
  initialSettings.forEach(([key, value]) => insertSetting.run(key, value));

  // Force update contact info as requested
  updateSetting.run('email', 'sakibulislamsbmc@gmail.com');
  updateSetting.run('whatsapp', '+8801345417317');

  // Ensure new keys are added even if table is not empty
  const newKeys = [
    ['media_width', '1080'],
    ['media_height', '1080'],
    ['aspect_ratio', '1:1'],
    ['community_students', '1,200+'],
    ['community_projects', '5,000+'],
    ['community_discussions', '12k+'],
    ['community_likes', '45k+'],
  ];
  newKeys.forEach(([key, value]) => insertSetting.run(key, value));

  const settingsCount = db.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number };
  // We only seed the other tables if they are empty
  const skillsCount = db.prepare("SELECT COUNT(*) as count FROM skills").get() as { count: number };
  if (skillsCount.count === 0) {
    const initialSkills = [
      ['Graphic Design', 99, 'Core', 'Professional graphic design and visual branding'],
      ['Video Editing', 95, 'Core', 'Advanced video editing and post-production'],
      ['Web Development', 80, 'Core', 'Modern web development and responsive design'],
      ['Meta Marketing', 95, 'Core', 'Strategic social media marketing and ad management'],
    ];
    const insertSkill = db.prepare("INSERT INTO skills (name, level, category, description) VALUES (?, ?, ?, ?)");
    initialSkills.forEach(([name, level, cat, desc]) => insertSkill.run(name, level, cat, desc));

    const initialExp = [
      ['Senior Motion Designer & Video Editor', 'Creative Studio / Agency', 'July 2025 - Present', 'Leading creative projects and delivering high-quality motion graphics and video content. Mentoring junior editors and streamlining production workflows for maximum efficiency.', JSON.stringify(['Leading high-end commercial video production', 'Advanced motion graphics and visual effects', 'Team leadership and project management'])],
      ['Video Editor', 'Ajwah Global Corporation', '2024 - 2025', 'Produced engaging promotional videos and corporate content. Managed post-production processes including editing, color grading, and sound design to meet brand standards.', JSON.stringify(['Corporate video production and editing', 'Social media content strategy compliance', 'Color grading and audio enhancement'])],
      ['Freelance Motion Designer & Video Editor', 'Local & International Market', 'Ongoing', 'Delivering custom video solutions for diverse clients globally. Specializing in branded content, kinetic typography, and high-retention social media reels.', JSON.stringify(['Served 50+ local and international clients', 'Specialized in Reels, Shorts, and ads', 'Consistent 5-star client satisfaction'])],
    ];
    const insertExp = db.prepare("INSERT INTO experience (title, company, period, description, details) VALUES (?, ?, ?, ?, ?)");
    initialExp.forEach(([title, company, period, desc, details]) => insertExp.run(title, company, period, desc, details));

    const initialEdu = [
      ['HSC (Higher Secondary Certificate)', 'Govt Tolaram College', '2025 - 2027', 'Pursuing higher secondary education with a focus on Business Studies/Arts. Active participant in cultural clubs and creative societies.', 'graduation-cap'],
      ['SSC (Secondary School Certificate)', 'TalukderPara Govt Secondary High School', '2022 - 2024', 'Completed secondary education with distinct academic performance. Built strong foundation in creative arts and computer science.', 'school'],
    ];
    const insertEdu = db.prepare("INSERT INTO education (degree, institution, period, description, icon) VALUES (?, ?, ?, ?, ?)");
    initialEdu.forEach(([degree, inst, period, desc, icon]) => insertEdu.run(degree, inst, period, desc, icon));

    const initialCourses = [
      ['Motion Graphics Masterclass', 'Master the art of motion graphics with After Effects.', 49.99, 'Sabbir Sakib', 'https://picsum.photos/seed/course1/800/450', '10h 30m', 24, 'Motion Graphics'],
      ['Professional Video Editing', 'Learn industry-standard video editing techniques.', 39.99, 'Sabbir Sakib', 'https://picsum.photos/seed/course2/800/450', '8h 15m', 18, 'Video Editing'],
      ['Social Media Content Creation', 'Create viral content for Reels, Shorts, and TikTok.', 29.99, 'Sabbir Sakib', 'https://picsum.photos/seed/course3/800/450', '5h 45m', 12, 'Social Media'],
    ];
    const insertCourse = db.prepare("INSERT INTO courses (title, description, price, instructor, thumbnail, duration, lessons, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    initialCourses.forEach(c => insertCourse.run(...c));

    const initialProjects = [
      ['Cinematic Travel Reel', 'Video Editing', 'https://picsum.photos/seed/project1/800/450', 'https://www.youtube.com/embed/7AuNdV_JSlM', 'A high-energy cinematic travel reel showcasing beautiful landscapes and smooth transitions.', JSON.stringify(['Cinematic', 'Travel', 'After Effects'])],
      ['Product Promo Ad', 'Video Editing', 'https://picsum.photos/seed/project2/800/450', 'https://www.youtube.com/embed/7AuNdV_JSlM', 'Professional product advertisement with dynamic motion graphics.', JSON.stringify(['Product', 'Ad', 'Premiere Pro'])],
      ['Brand Identity Design', 'Graphic Design', 'https://picsum.photos/seed/project3/800/450', '', 'Complete brand identity design including logo, typography, and color palette.', JSON.stringify(['Branding', 'Logo', 'Illustrator'])],
      ['Social Media Kit', 'Graphic Design', 'https://picsum.photos/seed/project4/800/450', '', 'Custom social media post templates and banners for a tech startup.', JSON.stringify(['Social Media', 'Design', 'Photoshop'])],
    ];
    const insertProject = db.prepare("INSERT INTO projects (title, category, thumbnail, video_url, description, tags) VALUES (?, ?, ?, ?, ?, ?)");
    initialProjects.forEach(p => insertProject.run(...p));

    const initialSocial = [
      ['Facebook', 'https://facebook.com', 'facebook'],
      ['Instagram', 'https://instagram.com', 'instagram'],
      ['Youtube', 'https://youtube.com', 'youtube'],
      ['Whatsapp', 'https://wa.me/8801345417317', 'phone'],
    ];
    const insertSocial = db.prepare("INSERT INTO social_links (platform, url, icon) VALUES (?, ?, ?)");
    initialSocial.forEach(s => insertSocial.run(...s));
  }
};
seedData();

// Student Auth Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    google_id TEXT UNIQUE,
    email TEXT UNIQUE,
    name TEXT,
    picture TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.resolve(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });

  // Upload endpoint
  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });

  // Serve uploads statically
  app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

  // API Routes
  app.get("/api/portfolio", (req, res) => {
    const settingsRows = db.prepare("SELECT * FROM settings").all() as any[];
    const skills = db.prepare("SELECT * FROM skills").all();
    const experience = db.prepare("SELECT * FROM experience").all();
    const education = db.prepare("SELECT * FROM education").all();
    const courses = db.prepare("SELECT * FROM courses").all();
    const social = db.prepare("SELECT * FROM social_links").all();
    const projects = db.prepare("SELECT * FROM projects").all() as any[];

    const settings = Object.fromEntries(settingsRows.map(s => [s.key, s.value]));

    const portfolioData = {
      settings,
      skills,
      experience: (experience as any[]).map(e => ({ ...e, details: JSON.parse(e.details || '[]') })),
      education,
      courses,
      projects: projects.map(p => ({ ...p, tags: JSON.parse(p.tags || '[]') })),
      social,
      community_stats: {
        students: settings.community_students || '0',
        projects: settings.community_projects || '0',
        discussions: settings.community_discussions || '0',
        likes: settings.community_likes || '0',
      },
      enrollments: db.prepare("SELECT * FROM enrollments").all()
    };
    res.json(portfolioData);
  });

  app.post("/api/projects", (req, res) => {
    const { projects } = req.body;
    db.prepare("DELETE FROM projects").run();
    const insert = db.prepare("INSERT INTO projects (title, category, thumbnail, video_url, description, tags) VALUES (?, ?, ?, ?, ?, ?)");
    projects.forEach((p: any) => insert.run(p.title, p.category, p.thumbnail, p.video_url, p.description, JSON.stringify(p.tags)));
    res.json({ success: true });
  });

  app.post("/api/projects", (req, res) => {
    const { projects } = req.body;
    db.prepare("DELETE FROM projects").run();
    const insert = db.prepare("INSERT INTO projects (title, category, thumbnail, video_url, description, tags) VALUES (?, ?, ?, ?, ?, ?)");
    projects.forEach((p: any) => insert.run(p.title, p.category, p.thumbnail, p.video_url, p.description, JSON.stringify(p.tags)));
    res.json({ success: true });
  });

  app.post("/api/community-stats", (req, res) => {
    const { stats } = req.body;
    const update = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    update.run('community_students', stats.students);
    update.run('community_projects', stats.projects);
    update.run('community_discussions', stats.discussions);
    update.run('community_likes', stats.likes);
    res.json({ success: true });
  });

  // Google Auth Routes
  app.get("/api/auth/google/url", (req, res) => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: `${process.env.APP_URL}/auth/callback`,
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    const qs = new URLSearchParams(options);
    res.json({ url: `${rootUrl}?${qs.toString()}` });
  });

  app.get("/auth/callback", async (req, res) => {
    const code = req.query.code as string;
    if (!code) return res.status(400).send("No code provided");

    try {
      // Exchange code for tokens
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID || "",
          client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
          redirect_uri: `${process.env.APP_URL}/auth/callback`,
          grant_type: "authorization_code",
        }),
      });
      const tokens = await tokenResponse.json() as any;

      // Get user info
      const userResponse = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);
      const googleUser = await userResponse.json() as any;

      // Upsert student
      const upsert = db.prepare(`
        INSERT INTO students (google_id, email, name, picture)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(google_id) DO UPDATE SET
          name = excluded.name,
          picture = excluded.picture
      `);
      upsert.run(googleUser.id, googleUser.email, googleUser.name, googleUser.picture);

      // In a real app, we'd set a session cookie here.
      // For this demo, we'll pass the email back to the client via postMessage
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', email: '${googleUser.email}' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
          </body>
        </html>
      `);
    } catch (err) {
      console.error("Auth error", err);
      res.status(500).send("Authentication failed");
    }
  });

  app.get("/api/student/me", (req, res) => {
    const email = req.query.email as string;
    if (!email) return res.status(401).json({ error: "Not authenticated" });
    const student = db.prepare("SELECT * FROM students WHERE email = ?").get(email);
    if (!student) return res.status(404).json({ error: "Student not found" });
    
    const enrollments = db.prepare(`
      SELECT e.*, c.title as course_title, c.thumbnail as course_thumbnail
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_email = ?
    `).all(email);

    res.json({ ...student as any, enrollments });
  });

  app.post("/api/enroll", (req, res) => {
    const { course_id, user_email } = req.body;
    const insert = db.prepare("INSERT INTO enrollments (course_id, user_email, status) VALUES (?, ?, ?)");
    insert.run(course_id, user_email, 'enrolled');
    res.json({ success: true });
  });

  app.post("/api/complete-course", (req, res) => {
    const { enrollment_id } = req.body;
    const update = db.prepare("UPDATE enrollments SET status = 'completed' WHERE id = ?");
    update.run(enrollment_id);
    res.json({ success: true });
  });

  app.post("/api/settings", (req, res) => {
    const { settings } = req.body;
    const update = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    Object.entries(settings).forEach(([key, value]) => update.run(key, value as string));
    res.json({ success: true });
  });

  app.post("/api/skills", (req, res) => {
    const { skills } = req.body;
    db.prepare("DELETE FROM skills").run();
    const insert = db.prepare("INSERT INTO skills (name, level, category, description) VALUES (?, ?, ?, ?)");
    skills.forEach((s: any) => insert.run(s.name, s.level, s.category, s.description));
    res.json({ success: true });
  });

  app.post("/api/experience", (req, res) => {
    const { experience } = req.body;
    db.prepare("DELETE FROM experience").run();
    const insert = db.prepare("INSERT INTO experience (title, company, period, description, details) VALUES (?, ?, ?, ?, ?)");
    experience.forEach((e: any) => insert.run(e.title, e.company, e.period, e.description, JSON.stringify(e.details)));
    res.json({ success: true });
  });

  app.post("/api/education", (req, res) => {
    const { education } = req.body;
    db.prepare("DELETE FROM education").run();
    const insert = db.prepare("INSERT INTO education (degree, institution, period, description, icon) VALUES (?, ?, ?, ?, ?)");
    education.forEach((e: any) => insert.run(e.degree, e.institution, e.period, e.description, e.icon));
    res.json({ success: true });
  });

  app.post("/api/courses", (req, res) => {
    const { courses } = req.body;
    db.prepare("DELETE FROM courses").run();
    const insert = db.prepare("INSERT INTO courses (title, description, price, instructor, thumbnail, duration, lessons, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    courses.forEach((c: any) => insert.run(c.title, c.description, c.price, c.instructor, c.thumbnail, c.duration, c.lessons, c.category));
    res.json({ success: true });
  });

  app.post("/api/social", (req, res) => {
    const { social } = req.body;
    db.prepare("DELETE FROM social_links").run();
    const insert = db.prepare("INSERT INTO social_links (platform, url, icon) VALUES (?, ?, ?)");
    social.forEach((s: any) => insert.run(s.platform, s.url, s.icon));
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  // Migration: Add about_extra_image_url if not exists
  const hasExtraImage = db.prepare("SELECT * FROM settings WHERE key = 'about_extra_image_url'").get();
  if (!hasExtraImage) {
    db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run('about_extra_image_url', 'https://picsum.photos/seed/extra/1200/600');
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
