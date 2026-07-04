import React, { useState } from 'react';
import { FAQS_DATA } from '../data';
import { Search, ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';

interface FaqSectionProps {
  onBookDemoClick: () => void;
}

export default function FaqSection({ onBookDemoClick }: FaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const categories = ['All', 'Class Format', 'Syllabus & Tutors', 'Booking & Trial', 'Scheduling & Flexibility', 'Pricing & Billing'];

  const toggleFaq = (id: string) => {
    if (expandedFaqId === id) {
      setExpandedFaqId(null);
    } else {
      setExpandedFaqId(id);
    }
  };

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 px-6 bg-white" id="faq">
      <div className="max-w-[900px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#000928]/5 border border-[#000928]/10 px-4 py-1.5 rounded-full">
            <HelpCircle size={16} className="text-[#fe6b00]" />
            <span className="font-sans font-bold text-xs text-[#000928] uppercase tracking-wider">Help Desk</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-[#000928] font-bold">Frequently Asked Questions</h2>
          <p className="font-sans text-[15px] md:text-[16px] text-gray-500 max-w-xl mx-auto">
            Find answers to commonly asked questions regarding our tutoring formats, schedules, billing, and learning support.
          </p>

          {/* Search bar inside FAQ */}
          <div className="relative w-full max-w-md mx-auto pt-4">
            <Search className="absolute left-3.5 top-7 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search help topics, class setups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-[#fe6b00] rounded-xl pl-11 pr-4 py-3 text-sm font-sans outline-none transition-all shadow-sm"
              id="faq-search-input"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-sans font-bold rounded-full border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#fe6b00] border-[#fe6b00] text-white shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              id={`faq-cat-${cat}`}
            >
              {cat.replace(' & ', ' / ')}
            </button>
          ))}
        </div>

        {/* FAQ Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-[#fbf8fd] border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200"
                style={{ boxShadow: '5px 5px 15px #cfd0d3, -5px -5px 15px #ffffff' }}
                id={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 cursor-pointer select-none"
                >
                  <span className="font-heading font-extrabold text-[#000928] text-[15px] md:text-[16px] leading-snug">
                    {faq.question}
                  </span>
                  <div className="text-[#fe6b00] shrink-0 p-1 bg-white border border-gray-100 rounded-full shadow-sm">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-1 text-sm font-sans text-gray-600 leading-relaxed border-t border-gray-200/40 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 font-sans text-sm">
              No matching help topics found.
            </div>
          )}
        </div>

        {/* CTA box at the bottom */}
        <div className="mt-14 bg-primary text-white p-6 md:p-8 rounded-[24px] text-center space-y-4 shadow-md">
          <h3 className="font-heading font-extrabold text-xl">Still have questions?</h3>
          <p className="font-sans text-xs md:text-sm text-gray-300 max-w-md mx-auto">
            Book a complimentary 1-on-1 evaluation class with Kanishak Sharma to understand how our courses align with your math targets.
          </p>
          <button
            onClick={onBookDemoClick}
            className="inline-flex items-center gap-1.5 bg-[#fe6b00] hover:bg-white hover:text-[#000928] text-white py-3 px-6 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95"
            id="faq-cta-btn"
          >
            Schedule Free Evaluation
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
