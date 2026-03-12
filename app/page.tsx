import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar"; // <-- Import the new Navbar
import Hero3D from "@/components/Hero3D";
import Overview from "@/components/Overview";
import ExperienceSection from "@/components/ExperienceSection"; 
import TechSpheres from "@/components/TechSpheres";
import CardShowcase3D from "@/components/CardShowcase3D";
import ContactSphere from "@/components/ContactSphere";
import GlobalWaveBackground from "@/components/GlobalWaveBackground";

export default async function Home() {
  const dbProjects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-transparent text-zinc-100 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      
      <GlobalWaveBackground />
      
      {/* =========================================
          THE FIXED NAVIGATION BAR
          ========================================= */}
      <Navbar />
      
      {/* SECTION 1: 3D Hero (No ID needed, it's the top) */}
      <section className="relative w-full h-screen">
        <Hero3D />
      </section>

      {/* SECTION 2: Overview (Added id="about") */}
      <section id="about" className="relative w-full min-h-screen py-24 flex items-center scroll-mt-20">
        <Overview />
      </section>

      {/* SECTION 3: Experience (Added id="experience") */}
      <section id="experience" className="relative w-full py-24 border-t border-white/5 bg-transparent scroll-mt-20">
        <ExperienceSection />
      </section>

      {/* SECTION 4: Tech Stack (No nav link, but kept in flow) */}
      <section className="relative w-full min-h-screen py-24 border-t border-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          <div className="text-center mb-16">
            <p className="text-blue-500 text-sm tracking-[0.2em] uppercase mb-4 font-semibold">
              My Arsenal
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Technologies.</h2>
          </div>
          <TechSpheres />
        </div>
      </section>

      {/* SECTION 5: 3D Project Cards (Added id="projects") */}
      <section id="projects" className="relative w-full min-h-screen py-24 bg-transparent border-t border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 z-10 relative">
          <div className="text-center mb-16">
            <p className="text-blue-500 text-sm tracking-[0.2em] uppercase mb-4 font-semibold">
              Selected Works
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Projects.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbProjects.length > 0 ? dbProjects.map((proj, idx) => (
              <CardShowcase3D key={idx} project={{
                title: proj.title,
                description: proj.description || "Awesome project built with modern tech.",
                tags: [proj.category || "Demo"],
                link: proj.liveDemoUrl || proj.githubUrl || "#",
                imageUrl: proj.imageUrl
              }} />
            )) : (
              <CardShowcase3D project={{
                title: "SpendWise: Expense Management",
                description: "A full-scale financial dashboard with real-time analytics and predictive budget tracking.",
                tags: ["React", "Next.js", "Supabase"],
                link: "#"
              }} />
            )}
          </div>
        </div>
      </section>

      {/* SECTION 6: Contact & 3D Morphing Sphere (Added id="contact") */}
      <section id="contact" className="relative w-full min-h-screen border-t border-white/5 flex items-center bg-transparent py-24 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="z-10 relative">
            <p className="text-blue-500 text-sm tracking-[0.2em] uppercase mb-4 font-semibold">
              Get in Touch
            </p>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white mt-4 md:mt-0">
              Let's Connect.
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md text-lg leading-relaxed">
              Whether you need a full-stack architecture built from scratch or a complex backend integrated, I'm ready to collaborate.
            </p>
            
            <form className="flex flex-col gap-4 max-w-md">
              <input type="text" placeholder="Name" className="bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors" />
              <input type="email" placeholder="Email" className="bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors" />
              <textarea placeholder="Tell me about your project..." rows={4} className="bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
              <button type="button" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl py-4 transition-colors mt-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] cursor-pointer">
                Send Message
              </button>
            </form>
          </div>
          
          <div className="h-[500px] md:h-[700px] w-full relative">
            <ContactSphere />
          </div>
          
        </div>
      </section>
      
    </main>
  );
}