import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Results from "@/components/results"
import ChartsSection from "@/components/charts-section"
import About from "@/components/about"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Results />
      <ChartsSection />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
