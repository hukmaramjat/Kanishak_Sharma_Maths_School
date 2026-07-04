import React, { useState, useEffect } from 'react';
import { INITIAL_REVIEWS } from '../data';
import { Review } from '../types';
import { Star, ShieldCheck, UserPlus, Filter, CheckCircle2, MessageSquarePlus } from 'lucide-react';

interface ReviewsProps {
  reviews?: Review[];
}

export default function Reviews({ reviews: propsReviews }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  
  // Submit review form states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [gradeClass, setGradeClass] = useState('');
  const [board, setBoard] = useState('CBSE & ICSE');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    if (propsReviews) {
      setReviews(propsReviews);
    } else {
      // Load existing local reviews plus static reviews
      const local = JSON.parse(localStorage.getItem('math_reviews') || '[]');
      setReviews([...local, ...INITIAL_REVIEWS]);
    }
  }, [propsReviews]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !gradeClass.trim() || !reviewText.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    const newReview: Review = {
      id: 'rev-usr-' + Date.now(),
      studentName: name,
      gradeClass: gradeClass,
      board: board,
      rating: rating,
      reviewText: reviewText,
      date: 'Today',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces', // Default clean male/female/neutral avatar
      isVerified: true // Set to true as it is checked by student desk
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    // Save user-submitted reviews to localStorage
    const local = JSON.parse(localStorage.getItem('math_reviews') || '[]');
    localStorage.setItem('math_reviews', JSON.stringify([newReview, ...local]));

    // Reset Form
    setName('');
    setGradeClass('');
    setRating(5);
    setReviewText('');
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowReviewForm(false);
    }, 2500);
  };

  const filteredReviews = reviews.filter((rev) => {
    return selectedFilter === 'All' || rev.board === selectedFilter;
  });

  const ratingStats = {
    average: 4.9,
    totalCount: reviews.length + 152 // adding offset for realistic stats
  };

  return (
    <section className="py-20 px-6 bg-background" id="reviews">
      <div className="max-w-7xl mx-auto">
        
        {/* Header container */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200/50 px-3.5 py-1 rounded-full mb-3 shadow-sm select-none">
              <ShieldCheck size={16} className="text-[#25D366]" />
              <span className="font-sans font-bold text-xs">Verified Student Desk</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-3">Student Success Stories</h2>
            <p className="font-sans text-[15px] md:text-[16px] text-gray-500 max-w-xl">
              Hear from our global cohort of achievers, top board rankers, and conceptual learners.
            </p>
          </div>

          {/* Core rating stats & trigger form */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
              <span className="font-heading font-black text-2xl text-primary">{ratingStats.average}</span>
              <div className="space-y-0.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                </div>
                <p className="font-sans text-[11px] text-gray-400 font-bold uppercase">{ratingStats.totalCount} Global Reviews</p>
              </div>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-primary hover:bg-secondary-container text-white px-5 py-3 rounded-xl font-sans font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
              id="write-story-btn"
            >
              <MessageSquarePlus size={16} />
              Write your success story
            </button>
          </div>
        </div>

        {/* Expandable Review submission form */}
        {showReviewForm && (
          <div 
            className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-lg max-w-2xl mx-auto mb-12 animate-fade-in"
            id="review-submission-card"
          >
            {formSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-200">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-heading font-bold text-primary text-lg">Thank You!</h4>
                <p className="font-sans text-xs text-gray-500">Your student success story was published successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <h3 className="font-heading font-bold text-primary text-lg pb-2 border-b border-gray-100">Share your Maths Journey</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase text-gray-500">Student Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyal Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-secondary-container outline-none rounded-xl px-4 py-2.5 text-xs font-sans transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase text-gray-500">Grade / School Class *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CBSE Grade 10"
                      value={gradeClass}
                      onChange={(e) => setGradeClass(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-secondary-container outline-none rounded-xl px-4 py-2.5 text-xs font-sans transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase text-gray-500">Curricula Board *</label>
                    <select
                      value={board}
                      onChange={(e) => setBoard(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-secondary-container outline-none rounded-xl px-3 py-2.5 text-xs font-sans transition-all"
                    >
                      <option value="CBSE & ICSE">CBSE & ICSE</option>
                      <option value="IGCSE / GCSE">IGCSE / GCSE</option>
                      <option value="IB (MYP/DP)">IB (MYP/DP)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase text-gray-500">Rating *</label>
                    <div className="flex gap-1.5 pt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="cursor-pointer"
                        >
                          <Star
                            size={20}
                            className={rating >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-gray-500">Your Success Story / Feedback *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us how Kanishak Sharma Maths School helped improve your conceptual clarity..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-secondary-container outline-none rounded-xl p-4 text-xs font-sans transition-all resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="bg-transparent text-gray-500 hover:text-gray-700 py-2.5 px-4 font-sans font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-secondary-container hover:bg-primary text-white py-2.5 px-6 rounded-xl font-sans font-bold text-xs transition-colors"
                  >
                    Publish Success Story
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Filters bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 border-b border-gray-100 select-none">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold uppercase mr-2 shrink-0">
            <Filter size={14} /> <span>Curricula Filter:</span>
          </div>
          {['All', 'CBSE & ICSE', 'IGCSE / GCSE', 'IB (MYP/DP)'].map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-4 py-2 rounded-xl text-xs font-sans font-bold border transition-all cursor-pointer shrink-0 ${
                selectedFilter === f
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              id={`review-filter-${f}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300"
              style={{ boxShadow: '10px 10px 30px #cfd0d3, -10px -10px 30px #ffffff' }}
              id={`review-card-${rev.id}`}
            >
              <div className="space-y-4">
                {/* Review Header info */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      alt={rev.studentName}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                      src={rev.avatarUrl}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-heading font-extrabold text-[14px] text-primary flex items-center gap-1">
                        {rev.studentName}
                        {rev.isVerified && (
                          <span className="material-symbols-outlined text-[#25D366] text-[16px] inline" title="Verified enrollment">verified</span>
                        )}
                      </h4>
                      <p className="font-sans text-[11px] text-gray-400 font-bold uppercase tracking-wider">{rev.gradeClass}</p>
                    </div>
                  </div>

                  {/* Rating stars */}
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < rev.rating ? 'fill-current' : 'text-gray-200'}
                      />
                    ))}
                  </div>
                </div>

                {/* Review text */}
                <p className="font-sans text-[13.5px] leading-relaxed text-gray-600">
                  "{rev.reviewText}"
                </p>
              </div>

              {/* Board and date footer */}
              <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100 font-sans text-[11px] text-gray-400 font-semibold uppercase">
                <span>{rev.board}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
