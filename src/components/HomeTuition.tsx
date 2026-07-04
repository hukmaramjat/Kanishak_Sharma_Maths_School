import React from 'react';
import { Home, ShieldCheck, Star, Sparkles, MapPin, Check, ArrowRight } from 'lucide-react';

interface HomeTuitionProps {
  onBookDemoClick: () => void;
}

export default function HomeTuition({ onBookDemoClick }: HomeTuitionProps) {
  const safetyFeatures = [
    {
      title: 'Vetted Math Experts',
      desc: 'All home mentors are subject-matter specialists, fully audited, and background verified.',
      icon: <ShieldCheck className="text-secondary-container" size={20} />
    },
    {
      title: 'Personalized School Pace',
      desc: 'The physical tutor aligns lessons directly with your school homework, class tests, and textbooks.',
      icon: <Sparkles className="text-secondary-container" size={20} />
    },
    {
      title: 'Flexible Monthly Logs',
      desc: 'Get granular physical feedback report cards and monthly evaluation logs on student performance.',
      icon: <Star className="text-secondary-container" size={20} />
    }
  ];

  const locations = [
    { city: 'Jaipur (Home Tuitions)', area: 'Available in Vaishali Nagar, Malviya Nagar, C-Scheme, Raja Park, Mansarovar, Jagatpura, Tonk Road, Civil Lines & all major neighborhoods.' },
    { city: 'International Students (Online Live Classes)', area: 'Interactive 1-on-1 virtual sessions for students across USA, UK, UAE, Singapore, Canada, Australia, and worldwide.' }
  ];

  return (
    <section className="py-20 px-6 bg-background border-t border-gray-100" id="home-tuition">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-secondary-container/10 border border-secondary-container/25 px-4 py-1.5 rounded-full">
            <Home size={16} className="text-secondary-container" />
            <span className="font-sans font-bold text-xs text-secondary-container uppercase tracking-wider">Premium Offline Tutoring</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold">1-on-1 Home Tuitions & Online Classes</h2>
          <p className="font-sans text-[15px] md:text-[16px] text-gray-500 max-w-2xl mx-auto">
            Bring the high-rigor, concept-focused curriculum of Kanishak Sharma Maths School directly to your doorstep in Jaipur with certified physical math tutors, or join our global interactive online cohort from anywhere in the world.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Feature Checklist & USP */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h3 className="font-heading font-extrabold text-primary text-2xl md:text-3xl">
                Premium, Safe, & Results-Driven Tutoring
              </h3>
              <p className="font-sans text-[15px] text-gray-600 leading-relaxed">
                For parents seeking physical offline classes in Jaipur, we dispatch elite home tutors specialized in international and board curricula to provide meticulous conceptual oversight. For our international students, we offer premium interactive 1-on-1 live online classes equipped with digital whiteboards and smart resources.
              </p>
            </div>

            {/* Feature Cards list */}
            <div className="space-y-6">
              {safetyFeatures.map((feat, index) => (
                <div 
                  key={index} 
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4 transition-all hover:shadow-md"
                  style={{ boxShadow: '10px 10px 30px #cfd0d3, -10px -10px 30px #ffffff' }}
                >
                  <div className="bg-secondary-container/5 p-3 rounded-xl h-fit">
                    {feat.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-primary text-[15px]">{feat.title}</h4>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Available Cities & Interactive CTA Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl space-y-6"
               style={{ boxShadow: '20px 20px 60px #cfd0d3, -20px -20px 60px #ffffff' }}>
            
            <div className="space-y-2">
              <h4 className="font-heading font-extrabold text-primary text-lg flex items-center gap-2">
                <MapPin size={20} className="text-secondary-container" /> Active Operational Zones
              </h4>
              <p className="font-sans text-xs text-gray-500 leading-normal">
                We currently deploy handpicked academic home tutors across these major global metropolitan territories:
              </p>
            </div>

            {/* Operational Areas Grid */}
            <div className="space-y-3">
              {locations.map((loc, idx) => (
                <div key={idx} className="bg-background p-4 rounded-xl border border-gray-100 space-y-1">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-500 font-bold" />
                    <span className="font-heading font-bold text-sm text-primary">{loc.city}</span>
                  </div>
                  <p className="font-sans text-[11px] text-gray-500 pl-6">{loc.area}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <div className="bg-primary/5 p-4 rounded-xl text-center">
                <p className="font-sans text-xs text-gray-700">
                  Includes a <strong>Free 45-min Physical Diagnostic Session</strong> at your house.
                </p>
              </div>

              <button
                onClick={onBookDemoClick}
                className="w-full bg-primary hover:bg-secondary-container text-white py-3.5 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                id="home-tuition-book-btn"
              >
                Inquire For Home Tuition
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
