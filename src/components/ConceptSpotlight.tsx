import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

export default function ConceptSpotlight() {
  const [spotlightConcept, setSpotlightConcept] = useState<'pythagoras' | 'derivative' | 'limit'>('pythagoras');

  return (
    <section className="py-12 bg-background flex justify-center px-6" id="concept-spotlight-section">
      <div className="max-w-3xl w-full text-left bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" id="concept-spotlight">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-secondary-container/10 p-2 rounded-lg text-secondary-container">
              <GraduationCap size={20} />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-[16px] text-primary">Concept Clarity Spotlight</h4>
              <p className="font-sans text-xs text-gray-500">Understanding the reasoning behind formulas, not just memorizing.</p>
            </div>
          </div>
          {/* Spotlight tabs */}
          <div className="flex bg-gray-50 p-1 rounded-lg self-start md:self-auto text-xs">
            <button 
              onClick={() => setSpotlightConcept('pythagoras')}
              className={`px-3 py-1.5 rounded-md font-sans font-medium transition-all ${spotlightConcept === 'pythagoras' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Pythagoras Theorem
            </button>
            <button 
              onClick={() => setSpotlightConcept('derivative')}
              className={`px-3 py-1.5 rounded-md font-sans font-medium transition-all ${spotlightConcept === 'derivative' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Visual Derivatives
            </button>
            <button 
              onClick={() => setSpotlightConcept('limit')}
              className={`px-3 py-1.5 rounded-md font-sans font-medium transition-all ${spotlightConcept === 'limit' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Limits
            </button>
          </div>
        </div>

        {/* Dynamic Content based on tab */}
        <div className="min-h-[140px] flex items-center">
          {spotlightConcept === 'pythagoras' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
              <div className="md:col-span-2 space-y-2">
                <p className="font-sans text-sm text-gray-700 leading-relaxed">
                  Instead of just memorizing <strong className="text-primary font-bold">a² + b² = c²</strong>, imagine three squares attached to the sides of a right triangle. The area of the two smaller squares perfectly adds up to fill the largest square.
                </p>
                <div className="inline-flex gap-4 text-xs font-mono text-gray-500">
                  <span>• Visual Proof</span>
                  <span>• Real-world applications</span>
                  <span>• Distance calculation</span>
                </div>
              </div>
              <div className="bg-primary/5 p-4 rounded-xl flex flex-col justify-center items-center text-center border border-primary/10">
                <span className="font-mono text-xs text-gray-500 mb-1">Visual Formula</span>
                <span className="font-sans text-[18px] font-bold text-primary italic">a² + b² = c²</span>
              </div>
            </div>
          )}

          {spotlightConcept === 'derivative' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
              <div className="md:col-span-2 space-y-2">
                <p className="font-sans text-sm text-gray-700 leading-relaxed">
                  A derivative is simply the <strong>instantaneous rate of change</strong>. If you zoom in infinitely close to any curve (like a circle or parabola), it looks like a straight tangent line. The slope of that line is your derivative!
                </p>
                <div className="inline-flex gap-4 text-xs font-mono text-gray-500">
                  <span>• f(x) = x²</span>
                  <span>• f'(x) = 2x</span>
                  <span>• Slope at x=3 is 6</span>
                </div>
              </div>
              <div className="bg-primary/5 p-4 rounded-xl flex flex-col justify-center items-center text-center border border-primary/10">
                <span className="font-mono text-xs text-gray-500 mb-1">Visual Formula</span>
                <span className="font-sans text-[18px] font-bold text-primary italic">f'(x) = lim (h→0) [f(x+h) - f(x)] / h</span>
              </div>
            </div>
          )}

          {spotlightConcept === 'limit' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in">
              <div className="md:col-span-2 space-y-2">
                <p className="font-sans text-sm text-gray-700 leading-relaxed">
                  A limit asks: "What value does my function get closer and closer to, as the input approaches a target?" Even if the function has a hole right at that point, the limit tells us what value *should* be there.
                </p>
                <div className="inline-flex gap-4 text-xs font-mono text-gray-500">
                  <span>• Example: (sin x) / x at x=0</span>
                  <span>• Plugging 0 gives 0/0 (undefined)</span>
                  <span>• But approaches exactly 1</span>
                </div>
              </div>
              <div className="bg-primary/5 p-4 rounded-xl flex flex-col justify-center items-center text-center border border-primary/10">
                <span className="font-mono text-xs text-gray-500 mb-1">Visual Formula</span>
                <span className="font-sans text-[18px] font-bold text-primary italic">lim (x→0) [sin(x) / x] = 1</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
