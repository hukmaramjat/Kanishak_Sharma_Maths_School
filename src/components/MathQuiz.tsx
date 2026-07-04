import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data';
import { Brain, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Lightbulb, GraduationCap } from 'lucide-react';

interface MathQuizProps {
  onBookDemoClick: () => void;
}

export default function MathQuiz({ onBookDemoClick }: MathQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<{questionId: number, selected: number, correct: boolean}[]>([]);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswersHistory([
      ...answersHistory,
      {
        questionId: currentQuestion.id,
        selected: selectedOption,
        correct: isCorrect
      }
    ]);

    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setAnswersHistory([]);
  };

  // Recommendations generator
  const getRecommendation = () => {
    const percentage = (score / QUIZ_QUESTIONS.length) * 100;
    if (percentage >= 80) {
      return {
        title: 'Advanced Analytical & Higher Rigor',
        program: 'IB Diploma Programme (DP) / Cambridge Advanced A-Levels',
        desc: 'You possess exceptional problem-solving and logical-deduction skills! You have mastered calculus foundations and probability rules. We recommend our premier Advanced Calculus and IB DP Analysis & Approaches modules.',
        badge: 'High Rigor Master'
      };
    } else if (percentage >= 50) {
      return {
        title: 'Strong Core and Conceptual Application',
        program: 'IGCSE Higher Tier / CBSE High School Focus',
        desc: 'Your fundamental algebra and geometric modeling skills are solid. With customized training in advanced algebraic manipulation and trigonometric equations, you can comfortably unlock top scores.',
        badge: 'Conceptual Achiever'
      };
    } else {
      return {
        title: 'Conceptual Foundations Builder',
        program: 'CBSE & ICSE Middle-to-High School Core',
        desc: 'You demonstrate a good start, but there are conceptual gaps in linear models and geometry calculations. Our tailored 1-on-1 model will reinforce proofs, build strong fundamentals, and boost your testing confidence.',
        badge: 'Rising Mathematician'
      };
    }
  };

  const rec = getRecommendation();

  return (
    <section className="py-20 px-6 bg-background" id="quiz">
      <div className="max-w-250 mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary-container/10 border border-secondary-container/25 px-4 py-1.5 rounded-full mb-4">
            <Brain size={16} className="text-secondary-container" />
            <span className="font-sans font-bold text-xs text-secondary-container uppercase tracking-wider">Concept Clarity Test</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-3">Maths Diagnostic Quiz</h2>
          <p className="font-sans text-[15px] md:text-[16px] text-gray-500 max-w-xl mx-auto">
            Test your structural mathematical clarity in 2 minutes. Receive a customized curricular diagnostic and recommendations instantly.
          </p>
        </div>

        {/* Quiz Canvas */}
        <div 
          className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-xl max-w-3xl mx-auto"
          style={{ boxShadow: '20px 20px 60px #cfd0d3, -20px -20px 60px #ffffff' }}
          id="quiz-widget-card"
        >
          {!quizFinished ? (
            <div className="space-y-6">
              {/* Question progress and stats */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="font-mono text-xs text-gray-400 font-bold uppercase tracking-wider">
                  Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className={`text-[11px] font-sans font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  currentQuestion.level === 'Basic' ? 'bg-green-50 text-green-700 border border-green-100' :
                  currentQuestion.level === 'Intermediate' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                  'bg-red-50 text-red-700 border border-red-100'
                }`}>
                  {currentQuestion.level} Level
                </span>
              </div>

              {/* Quiz Question text */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-lg md:text-xl text-primary">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {currentQuestion.options.map((option, idx) => {
                  let optionStyle = 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700';
                  
                  if (selectedOption === idx) {
                    optionStyle = 'bg-primary/5 border-primary ring-1 ring-primary text-primary font-semibold';
                  }

                  if (isAnswered) {
                    if (idx === currentQuestion.correctIndex) {
                      optionStyle = 'bg-green-50 border-green-500 text-green-900 font-bold';
                    } else if (selectedOption === idx) {
                      optionStyle = 'bg-red-50 border-red-400 text-red-900';
                    } else {
                      optionStyle = 'opacity-65 bg-gray-50 border-gray-100 text-gray-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleOptionSelect(idx)}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all font-sans text-[14px] leading-snug cursor-pointer ${optionStyle}`}
                      id={`quiz-option-${idx}`}
                    >
                      <span>{option}</span>
                      {isAnswered && idx === currentQuestion.correctIndex && (
                        <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                      )}
                      {isAnswered && selectedOption === idx && idx !== currentQuestion.correctIndex && (
                        <XCircle size={18} className="text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanatory notes (popping out via 5% navy background as requested) */}
              {isAnswered && (
                <div 
                  className="bg-primary/5 p-5 rounded-2xl border border-primary/10 space-y-2 animate-fade-in"
                  id="quiz-explanation-block"
                >
                  <div className="flex items-center gap-2 text-primary font-sans font-bold text-[13px]">
                    <Lightbulb size={16} className="text-secondary-container" />
                    <span>Concept Proof & Clarity Tip:</span>
                  </div>
                  <p className="font-sans text-[13.5px] leading-relaxed text-gray-700">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Action row */}
              <div className="flex justify-end pt-4 border-t border-gray-100">
                {!isAnswered ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleSubmitAnswer}
                    className={`px-8 py-3 rounded-xl font-sans font-bold text-xs transition-all ${
                      selectedOption === null 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-secondary-container text-white hover:bg-primary cursor-pointer'
                    }`}
                    id="submit-answer-btn"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-primary hover:bg-secondary-container text-white px-8 py-3 rounded-xl font-sans font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    id="next-question-btn"
                  >
                    {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Diagnostic Results'}
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed Diagnostic Results View */
            <div className="text-center py-6 space-y-8 animate-fade-in">
              <div className="space-y-2">
                <div className="w-16 h-16 bg-secondary-container/10 text-secondary-container rounded-full flex items-center justify-center mx-auto border border-secondary-container/25">
                  <Award size={32} />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-primary">Diagnostic Analysis Completed</h3>
                <p className="font-sans text-sm text-gray-500">Based on your conceptual responses, we have mapped your math style:</p>
              </div>

              {/* Score ring */}
              <div className="flex justify-center items-baseline gap-1">
                <span className="font-heading font-black text-5xl text-primary">{score}</span>
                <span className="font-sans text-gray-400 text-lg">/ {QUIZ_QUESTIONS.length}</span>
                <span className="font-sans text-gray-500 text-sm ml-2">({Math.round((score/QUIZ_QUESTIONS.length)*100)}% accuracy)</span>
              </div>

              {/* Tailored Profile Advice Card */}
              <div className="bg-background p-6 rounded-2xl border border-gray-200/60 max-w-xl mx-auto text-left space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200/50 pb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={18} className="text-secondary-container" />
                    <span className="font-heading font-bold text-sm text-primary">Personalized Path</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-secondary-container/10 text-secondary-container border border-secondary-container/20 px-2.5 py-0.5 rounded-full uppercase">
                    {rec.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-heading font-extrabold text-primary text-[15px]">{rec.title}</h4>
                  <p className="font-sans text-xs text-secondary-container font-semibold">Recommended Curricula: {rec.program}</p>
                </div>

                <p className="font-sans text-[13px] leading-relaxed text-gray-600">
                  {rec.desc}
                </p>
              </div>

              {/* Result Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-4">
                <button
                  onClick={handleRestart}
                  className="bg-white border border-gray-200 text-gray-700 hover:text-primary py-3.5 px-6 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  style={{ boxShadow: '5px 5px 10px #cfd0d3, -5px -5px 10px #ffffff' }}
                  id="restart-quiz-btn"
                >
                  <RotateCcw size={14} /> Retake Test
                </button>
                <button
                  onClick={onBookDemoClick}
                  className="bg-primary hover:bg-secondary-container text-white py-3.5 px-6 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 flex-1 shadow-md"
                  id="quiz-cta-book-demo"
                >
                  Book a Free Trial Lesson
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
