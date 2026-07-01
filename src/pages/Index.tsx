import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import BookingBar from '@/components/sections/BookingBar';
import Catalog from '@/components/sections/Catalog';
import About from '@/components/sections/About';
import Advantages from '@/components/sections/Advantages';
import Gallery from '@/components/sections/Gallery';
import HowItWorks from '@/components/sections/HowItWorks';
import Pricing from '@/components/sections/Pricing';
import Insurance from '@/components/sections/Insurance';
import Reviews from '@/components/sections/Reviews';
import Terms from '@/components/sections/Terms';
import Blog from '@/components/sections/Blog';
import Faq from '@/components/sections/Faq';
import CtaBanner from '@/components/sections/CtaBanner';
import Contacts from '@/components/sections/Contacts';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <BookingBar />
      <Catalog />
      <About />
      <Advantages />
      <Gallery />
      <HowItWorks />
      <Pricing />
      <Insurance />
      <Reviews />
      <Terms />
      <Blog />
      <Faq />
      <CtaBanner />
      <Contacts />
    </Layout>
  );
};

export default Index;
