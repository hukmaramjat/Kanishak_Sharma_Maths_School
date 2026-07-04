import React, { useState } from 'react';
import { FORMULAS_DATA } from '../data';
import { Search, Hash, Info, Star } from 'lucide-react';

export default function FormulaSheet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Arithmetic'];

  const filteredFormulas = FORMULAS_DATA.filter((formula) => {
    const matchesSearch = formula.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          formula.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || formula.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 px-6 bg-white" id="formulas">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-3">Maths Concept Vault</h2>
            <p className="font-sans text-[15px] md:text-[16px] text-gray-500 max-w-xl">
              Quick access cheat sheet for high school & secondary curricula. Proof of structural maths, made clear and visual.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search equations, terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-secondary-container rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans outline-none transition-all shadow-sm"
              id="formula-search-input"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-8 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-sans font-bold rounded-full border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              id={`formula-cat-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Formula Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFormulas.map((formula) => (
            <div
              key={formula.id}
              className="bg-background border border-gray-100 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300"
              style={{ boxShadow: '10px 10px 30px #cfd0d3, -10px -10px 30px #ffffff' }}
              id={`formula-card-${formula.id}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold bg-secondary-container/10 text-secondary-container border border-secondary-container/15 px-2.5 py-0.5 rounded-full uppercase">
                    {formula.category}
                  </span>
                  <button className="text-gray-300 hover:text-amber-400 transition-colors cursor-pointer">
                    <Star size={16} />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-heading font-extrabold text-primary text-[16px]">
                    {formula.name}
                  </h4>
                  <p className="font-sans text-[13px] leading-relaxed text-gray-500">
                    {formula.description}
                  </p>
                </div>
              </div>

              {/* Equation block (5% navy opacity to pop out as instructed) */}
              <div className="mt-5 bg-primary/5 p-4 rounded-xl border border-primary/10 text-center flex items-center justify-center min-h-16">
                <code className="font-mono text-[14px] font-semibold text-primary tracking-wider select-all" title="Click to copy formula">
                  {formula.equation}
                </code>
              </div>
            </div>
          ))}

          {filteredFormulas.length === 0 && (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 font-sans text-sm">
              No mathematical formulas found matching your criteria. Try adjusting filters or searches.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
