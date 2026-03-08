import { auth } from "@/auth";
import Hero from "@/components/Hero";
import BestWorkers from "@/components/BestWorkers";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-base-200">
      <Hero variant="default" session={session} />
      
      <BestWorkers />
      
      <Testimonials />
      
      {/* Placeholder for additional sections */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-base-content mb-4">
            How It Works
          </h2>
          <p className="text-base-content/70">
            More sections coming soon...
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
