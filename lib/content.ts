// lib/content.ts
// Semua isi konten diambil dari portofolio asli Billy, hanya tampilannya yang diubah.

export const profile = {
  name: "Billy Andreas",
  role: "Mahasiswa & Front-End Developer",
  tagline: "Coding with passion & precision.",
  intro:
    "Seorang mahasiswa yang bersemangat dalam dunia pengembangan perangkat lunak dan teknologi web.",
  bio: "Saya suka mempelajari hal-hal baru, terutama di bidang web development, database system, software engineering, dan quality assurance (QA). Saya memiliki minat untuk mengembangkan aplikasi yang efisien, fungsional, dan mudah digunakan, serta terus meningkatkan keterampilan teknis saya melalui pembelajaran dan praktik langsung.",
  cvUrl:
    "https://drive.google.com/file/d/13XBgbxpgE4yOTrhh2pJWrQQsWYKQMgUy/view?usp=sharing",
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

export const skills = {
  "Bahasa Pemrograman": ["JavaScript", "HTML5", "CSS3", "C++"],
  "Frameworks & Libraries": ["React.js", "Tailwind CSS", "Next.js"],
  "Tools & Others": ["Git & GitHub", "Figma", "VS Code", "SQL Management Studio", "Jira"],
};

export const projects = [
  {
    id: "rancar",
    title: "Membuat Aplikasi",
    role: "Front-End",
    desc: "Proyek ini dibuat untuk project tugas akhir di mata kuliah saya.",
    image: "/images/project-rancar.jpg",
    link: "https://big-com18.github.io/Cv_Billy/CV-Home/",
  },
  {
    id: "disavowed",
    title: "Membuat Game",
    role: "Sound and Assets",
    desc:
      "Membantu membuat game, role saya mencari backsound dan ambience yang sesuai dengan kondisi di dalam game.",
    image: "/images/project-disavowed.jpeg",
    link: "https://vntrydev.itch.io/disavowed",
  },
  {
    id: "bmi",
    title: "Membuat Website BMI",
    role: "Fullstack",
    desc:
      "Dalam salah satu kursus yang saya ikuti untuk memperluas pengetahuan, saya diminta membuat sebuah website sederhana sebagai proyek akhir.",
    image: "/images/project-bmi.jpg",
    link: "https://big-com18.github.io/BMI-project/index.html",
  },
  {
    id: "botwa",
    title: "Bot WA Integrated System",
    role: "JavaScript",
    desc:
      "Proyek pembuatan Bot WhatsApp berbasis Node.js (Baileys) dengan fitur integrasi panel admin untuk kontrol sistem dan manajemen pesan otomatis.",
    image: "/images/project-botwa.jpg",
    link: "https://big-com18.github.io/BMI-project/index.html",
  },
  {
    id: "Project Management Student",
    title: "Project Management Student",
    role: "Front-End",
    desc:
      "Project UTS Mata Kuliah Mobile, Membuat Aplikasi Sederhana dengan menggunakan bahasa pemrograman Dart dan framework Flutter.",
    image: "/images/stundent.png",
    link: "https://github.com/Big-com18/uts_project_mobile",
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
  { label: "LinkedIn", value: "bill-and", href: "https://www.linkedin.com/in/bill-and/" },
  { label: "GitHub", value: "Big-com18", href: "https://github.com/Big-com18" },
  { label: "Instagram", value: "bill.and18", href: "https://www.instagram.com/bill.and18/" },
];
