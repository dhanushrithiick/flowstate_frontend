import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Solution from "../components/Solution";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Levels from "../components/Levels";
import CTA from "../components/CTA";
import Footer from "../components/footer";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <Levels />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
