import EditorChrome from "@/components/EditorChrome";
import Hero from "@/components/sections/Hero";
import Pendidikan from "@/components/sections/Pendidikan";
import Keahlian from "@/components/sections/Keahlian";
import Project from "@/components/sections/Project";
import Sertifikat from "@/components/sections/Sertifikat";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <EditorChrome>
      <Hero />
      <Pendidikan />
      <Keahlian />
      <Project />
      <Sertifikat />
      <Contact />
    </EditorChrome>
  );
}
