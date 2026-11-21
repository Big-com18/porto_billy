// lib/content.ts
// Semua isi konten diambil dari portofolio asli Billy, hanya tampilannya yang diubah.

export const profile = {
  name: "Billy Andreas",
  role: "Mahasiswa , Front-End Developer and Quality Assurance (QA)",
  tagline: "Coding with passion & precision.",
  intro:
    "Seorang mahasiswa yang bersemangat dalam dunia pengembangan perangkat lunak dan teknologi web.",
  bio: "Saya suka mempelajari hal-hal baru, terutama di bidang web development, database system, software engineering, dan quality assurance (QA). Saya memiliki minat untuk mengembangkan aplikasi yang efisien, fungsional, dan mudah digunakan, serta terus meningkatkan keterampilan teknis saya melalui pembelajaran dan praktik langsung.",
  cvUrl:
    "https://drive.google.com/file/d/1g44rWhfgDm6HhUXk1_5_3QlCb2bcyrtC/view?usp=sharing",
  photo: "/images/foto-billy.jpg",
};

export const education = [
  {
    school: "Universitas Cakrawala",
    period: "2024 — 2027",
    degree: "Ilmu Komputer / S.Kom",
    desc:
      "Mempelajari dasar-dasar ilmu komputer, algoritma, struktur data, dan pengembangan perangkat lunak.",
  },
  {
    school: "SMAN 24 Jakarta",
    period: "2021 — 2024",
    degree: "IPA / SMA (Ilmu Pengetahuan Alam)",
    desc:
      "Pada masa SMA, saya aktif dalam organisasi seperti Rohkris. Saya juga masuk eligible 28 dari satu sekolah.",
  },
];

export type ProjectItem = {
  id: string;
  title: string;
  role: string;
  desc: string;
  image: string;
  link: string;       // demo / halaman project ("" kalau tidak ada)
  github?: string;    // link repo
  tags?: string[];    // tech stack
  featured?: boolean; // project andalan (tampil besar di atas)
};

/**
 * Daftar project = sama dengan daftar Showcase di website magang (5 unggulan dulu, lalu repo lainnya).
 * `image` kosong / file belum ada -> otomatis tampil placeholder, jadi aman diisi belakangan:
 * taruh screenshot di /public/images lalu samakan nama file-nya.
 */
export const projects: ProjectItem[] = [
  // ===== Unggulan =====
  {
    id: "portofolio",
    title: "Portofolio",
    role: "Front-End",
    desc:
      "Website portofolio pribadi yang sedang kamu lihat ini, dibangun dengan Next.js, TypeScript, dan Tailwind CSS.",
    image: "/images/portofolio.png",
    link: "https://porto-billy.vercel.app/",
    github: "https://github.com/Big-com18/porto_billy",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "kasbonku",
    title: "KasbonKu",
    role: "Back-End",
    desc:
      "Aplikasi manajemen kas untuk kelompok tani. Saya mengembangkan backend-nya dan mendesain schema database untuk mencatat kasbon dan arus kas secara terstruktur.",
    image: "/images/KasbonKu.png",
    link: "https://sistem-kasbon.vercel.app/",
    github: "https://github.com/Big-com18/sistem-kasbon",
    tags: ["Back-End", "Database Design", "Vercel"],
    featured: true,
  },
  {
    id: "backlogify",
    title: "Backlogify",
    role: "Back-End",
    desc:
      "Dashboard analitik dan decision engine berbasis Streamlit untuk mengelola backlog game. Saya menghubungkan backend dengan frontend dan mengelola data yang masuk ke dashboard.",
    image: "/images/Backlogify.png",
    link: "https://backlogify.streamlit.app/",
    tags: ["Python", "Streamlit", "Data Analytics"],
    featured: true,
  },
  {
    id: "game",
    title: "Game",
    role: "Sound & Assets",
    desc: "Game kecil berbasis JavaScript.",
    image: "/images/game.png",
    link: "https://vntrydev.itch.io/disavowed",
    github: "https://github.com/Big-com18/game",
    tags: ["Unity", "Game"],
    featured: true,
  },
  {
    id: "mahreen-indonesia",
    title: "Mahreen Indonesia",
    role: "TypeScript",
    desc: "Project website Mahreen Indonesia berbasis TypeScript.",
    image: "/images/mahreen-indonesia.png",
    link: "https://mahreen-indonesia-eight.vercel.app/",
    github: "https://github.com/Big-com18/mahreen_indonesia",
    tags: ["TypeScript"],
    featured: true,
  },

  // ===== Repo lainnya =====
  {
    id: "pos-toko",
    title: "POS Toko",
    role: "TypeScript",
    desc: "Project sistem kasir (point of sale) untuk toko, berbasis TypeScript.",
    image: "/images/pos-toko.png",
    link: "",
    github: "https://github.com/Big-com18/pos_toko",
    tags: ["TypeScript"],
  },
  {
    id: "lost-found",
    title: "UAS SDLC — Lost & Found",
    role: "JavaScript",
    desc: "Project UAS mata kuliah SDLC (Kelompok 2) bertema Lost & Found, dibuat dengan JavaScript.",
    image: "/images/lost-found.png",
    link: "",
    github: "https://github.com/Big-com18/UAS_Sdlc_K2_Lost-Found",
    tags: ["JavaScript", "SDLC"],
  },
  {
    id: "backend-api",
    title: "Backend API",
    role: "Back-End",
    desc: "Layanan back-end / REST API.",
    image: "/images/backend-api.png",
    link: "",
    github: "https://github.com/Big-com18/backend-api",
    tags: ["Back-End", "REST API"],
  },
  {
    id: "tugas-sesi5",
    title: "Tugas Sesi 5",
    role: "Python",
    desc: "Tugas mata kuliah sesi 5 yang dikerjakan dengan Python.",
    image: "/images/tugas-sesi5.png",
    link: "",
    github: "https://github.com/Big-com18/tugas_sesi5_sdlf",
    tags: ["Python"],
  },
  {
    id: "bmi",
    title: "Website Kalkulator BMI",
    role: "Fullstack",
    desc:
      "Website sederhana penghitung BMI, dibuat sebagai proyek akhir dari kursus yang saya ikuti untuk memperluas pengetahuan.",
    image: "/images/project-bmi.jpg",
    link: "https://big-com18.github.io/BMI-project/index.html",
    github: "https://github.com/Big-com18/BMI-project",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "rancar",
    title: "RanCar",
    role: "Front-End & UI Design",
    desc:
      "Aplikasi tugas akhir dengan tagline “Hindari macet, cek kondisi jalan lewat Rancar”. Saya merancang antarmuka dan mengembangkan fitur peta interaktif untuk laporan kemacetan dan kondisi jalan.",
    image: "/images/project-rancar.jpg",
    link: "", // link lama (Cv_Billy / CV-Home) bukan RanCar, jadi dikosongkan. Isi kalau ada demo-nya.
    github: "https://github.com/Big-com18/rancar-mobile",
    tags: ["React.js", "Leaflet", "UI/UX"],
  },
];

/**
 * Project lain yang sebelumnya ada di portofolio ini tapi tidak ada di daftar Showcase magang.
 * Tidak ditampilkan. Kalau mau dimunculkan lagi, pindahkan ke array `projects` di atas.
 */
export const otherProjects: ProjectItem[] = [
  {
    id: "film-booking",
    title: "Aplikasi Booking Film",
    role: "Front-End & Back-End",
    desc:
      "Aplikasi pemesanan tiket film sebagai project UAS mata kuliah Mobile, dibangun dengan Flutter dan Dart.",
    image: "/images/cinemas.png",
    link: "",
    github: "https://github.com/Big-com18/uas_project_mobile",
    tags: ["Flutter", "Dart", "Mobile"],
  },
  {
    id: "translink",
    title: "Translink — Desain Aplikasi",
    role: "UI/UX",
    desc:
      "Rancangan UI/UX aplikasi Translink di Figma sebagai project UAS mata kuliah UI/UX, mulai dari alur pengguna sampai tampilan layar.",
    image: "/images/translink.png",
    link: "https://www.figma.com/design/xKuMipoW5Eo9xhojojKjJ3/Home?node-id=756-436&t=Y8yIIlaKJKb096lk-1",
    tags: ["Figma", "UI/UX", "Prototyping"],
  },
  {
    id: "apel",
    title: "Web untuk Petani Apel",
    role: "Python",
    desc:
      "Website sederhana untuk membantu petani apel, dibuat dengan Python sebagai project mata kuliah AI.",
    image: "/images/appel.png",
    link: "https://uas-ai03-kelompok1.streamlit.app/",
    tags: ["Python", "Streamlit", "AI"],
  },
  {
    id: "botwa",
    title: "Bot WA Integrated System",
    role: "JavaScript",
    desc:
      "Bot WhatsApp berbasis Node.js (Baileys) dengan panel admin untuk mengontrol sistem dan mengelola pesan otomatis.",
    image: "/images/project-botwa.jpg",
    link: "",
    tags: ["Node.js", "Baileys", "JavaScript"],
  },
  {
    id: "disavowed",
    title: "Disavowed (Game)",
    role: "Sound & Assets",
    desc:
      "Membantu pembuatan game dengan mencari backsound dan ambience yang cocok dengan suasana di dalam game.",
    image: "/images/project-disavowed.jpeg",
    link: "https://vntrydev.itch.io/disavowed",
    tags: ["Game Audio", "Itch.io"],
  },
];

export const certificates = [
  {
    title: "Code Generations and Optimization",
    issuer: "Hacktiv8 Indonesia (bersama IBM SkillsBuild)",
    period: "5 — 7 Agustus 2025",
    image: "/images/sertifikat-code-gen.jpg",
    link: "https://drive.google.com/file/d/10FdJJLK4Ow7kouXaLp6oCEoDwhd87Qvs/view?usp=drive_link",
  },
  {
    title: "EF SET English Certificate (C1 Advanced)",
    issuer: "EF Standard English Test (EF SET)",
    period: "02 Januari 2026",
    extra: "Score: 61/100 — Reading: C2 Proficient, Listening: A2 Elementary",
    image: "/images/sertifikat-efset.jpg",
    link: "https://cert.efset.org/HLaudm",
  },
  {
    title: "Front End Developer",
    issuer: "PT Benih Inovasi Teknologi",
    period: "14 Januari — 14 April 2026",
    image: "/images/sertifikat-fe-dev.png",
    link: "https://drive.google.com/file/d/1klw-0EzxfqPtmdbywiHJM8CE6c8G_esQ/view?usp=sharing",
  },
  {
    title: "Coming Soon",
    issuer: "Sertifikat selanjutnya akan segera ditambahkan.",
    period: "",
    image: "/images/sertifikat-soon.jpg",
    link: "",
  },
];

export const contacts = [
  { label: "Email", value: "billyandreas441@gmail.com", href: "mailto:billyandreas441@gmail.com" },
  { label: "LinkedIn", value: "bill-and", href: "https://www.linkedin.com/in/billy-andre" },
  { label: "GitHub", value: "Big-com18", href: "https://github.com/Big-com18" },
  { label: "Instagram", value: "bill.and18", href: "https://www.instagram.com/bill.and18/" },
];

export type AnalisisItem = {
  id: string;
  title: string;
  desc: string;
  tools: string[];
  link?: string; // opsional: link ke PDF laporan / drive, kosongkan kalau tidak ada
};

export const analisis: AnalisisItem[] = [
  {
    id: "dwh-transjakarta",
    title: "Data Warehouse Transportasi Publik Jakarta (MRT & Transjakarta)",
    desc: "Merancang star schema dan pipeline ETL untuk data MRT dan Transjakarta: menarik data mentah, membangun fact & dimension table, lalu memuatnya ke data warehouse untuk kebutuhan analisis. Tugas besar mata kuliah Data Warehouse, dikerjakan berkelompok dan tidak dipublikasikan sebagai repo publik.",
    tools: ["Python", "Jupyter Notebook", "SQL", "SQLite", "Star Schema"],
    // link: "https://drive.google.com/..." // isi kalau mau lampirkan laporan
  },
];  

export type SkillItem = {
  name: string;
  icon?: string;   // slug dari skillicons.dev -> lihat daftar di https://skillicons.dev
  image?: string;  // path lokal kalau logonya nggak ada di skillicons.dev
};

export const skills: Record<string, SkillItem[]> = {
  "Bahasa Pemrograman": [
    { name: "JavaScript", icon: "js" },
    { name: "TypeScript", icon: "ts" },
    { name: "HTML5", icon: "html" },
    { name: "CSS3", icon: "css" },
    { name: "Python", icon: "py" },
    { name: "C++", icon: "cpp" },
    { name: "Dart", icon: "dart" },
    { name: "SQL", image: "/images/sql.png" },
  ],
  "Frameworks & Libraries": [
    { name: "Next.js", icon: "nextjs" },
    { name: "React.js", icon: "react" },
    { name: "Vue.js", icon: "vue" },
    { name: "Angular", icon: "angular" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "Node.js", icon: "nodejs" },
    { name: ".NET", icon: "dotnet" },
    { name: "Flutter", icon: "flutter" },
    { name: "React Native", icon: "react" },
  ],
  "Tools & Others": [
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "VS Code", icon: "vscode" },
    { name: "Figma", icon: "figma" },
    { name: "Jira", image: "/images/jira.png" },
    { name: "Android Studio", icon: "androidstudio" },
    { name: "Laragon", image: "/images/laragon.png" },
    { name: "SQL Management Studio", image: "/images/sql.png" },
    { name: "PostgreSQL", icon: "postgres" },
    { name: "Supabase", icon: "supabase" },
    { name: "Unity", icon: "unity" },
    { name: "Vercel", icon: "vercel" },
  ],
};
