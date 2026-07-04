import { Board, QuizQuestion, Review, Faq, Formula } from './types';

export const BOARDS_DATA: Board[] = [
  {
    id: 'cbse-icse',
    name: 'CBSE & ICSE',
    subtitle: 'Indian National Curriculum',
    curriculum: 'Focuses on strong fundamentals, theoretical clarity, and competitive exams prep (JEE/NEET foundation). Highly structured and conceptual.',
    timeZone: 'IST (Indian Standard Time)',
    priceInr: 4999,
    priceUsd: 60,
    iconName: 'menu_book',
    colorClass: 'bg-primary/5 text-primary border-primary/20',
    keyFeatures: [
      'Comprehensive coverage of NCERT and board-specific syllabi',
      'Regular test series matching CBSE/ICSE board formats',
      'Advanced doubt-solving sessions for board preparations',
      'Interactive visual proofs for complex geometric theorems'
    ],
    topics: [
      {
        title: 'Middle School (Grades 6-8)',
        subtopics: ['Rational Numbers', 'Simple & Compound Interest', 'Linear Equations in One Variable', 'Data Handling', 'Practical Geometry']
      },
      {
        title: 'High School (Grades 9-10)',
        subtopics: ['Quadratic Equations', 'Arithmetic Progressions', 'Trigonometric Identities', 'Coordinate Geometry', 'Surface Areas and Volumes', 'Probability']
      },
      {
        title: 'Senior Secondary (Grades 11-12)',
        subtopics: ['Sets, Relations & Functions', 'Limits and Derivatives', 'Integrals & Differential Equations', 'Matrices & Determinants', 'Vectors & 3D Geometry']
      }
    ]
  },
  {
    id: 'igcse-gcse',
    name: 'IGCSE / GCSE',
    subtitle: 'UK International Curriculum',
    curriculum: 'Emphasis on practical application, problem-solving, and reasoning. Evaluates skills rather than rote memory with international standards.',
    timeZone: 'GMT/BST (UK Time)',
    priceInr: 7499,
    priceUsd: 90,
    iconName: 'public',
    colorClass: 'bg-indigo-50 text-indigo-900 border-indigo-100',
    keyFeatures: [
      'Preparation for Cambridge Assessment (CIE) & Edexcel examinations',
      'Core & Extended mathematics pathways mapped dynamically',
      'Emphasis on investigative and multi-step practical questions',
      'Scientific and graphics calculator training integrated'
    ],
    topics: [
      {
        title: 'Foundation Tier (Grades 9-10)',
        subtopics: ['Number Operations & Accuracy', 'Algebraic Expressions & Formulae', 'Perimeters, Areas & Volumes', 'Basic Probability & Venn Diagrams']
      },
      {
        title: 'Extended/Higher Tier (Grades 9-10)',
        subtopics: ['Quadratic Formula & Graph Sketching', 'Sine and Cosine Rules', 'Vectors and Geometric Proofs', 'Transformations & Similarity', 'Cumulative Frequency and Histograms']
      },
      {
        title: 'A-Levels / Advanced (Grades 11-12)',
        subtopics: ['Polynomials & Rational Functions', 'Circular Measure & Trigonometry', 'Differentiation & Integration', 'Logarithmic & Exponential Functions']
      }
    ]
  },
  {
    id: 'ib-myp-dp',
    name: 'IB (MYP/DP)',
    subtitle: 'International Baccalaureate',
    curriculum: 'Highly rigorous curriculum nurturing critical thinking and interdisciplinary logic. Tailored for students heading to top global universities.',
    timeZone: 'Flexible / Local Time',
    priceInr: 9999,
    priceUsd: 120,
    iconName: 'school',
    colorClass: 'bg-violet-50 text-violet-950 border-violet-100',
    keyFeatures: [
      'Support for MYP (Middle Years Programme) Criterion A-D tasks',
      'Meticulous training for DP Analysis and Approaches (AA) SL/HL',
      'Meticulous training for DP Applications and Interpretation SL/HL',
      'Guidance for Maths Internal Assessments (IA) and Extended Essays'
    ],
    topics: [
      {
        title: 'MYP Years 1-5 (Grades 6-10)',
        subtopics: ['Numbers & Number Systems', 'Algebraic Equivalence & Modeling', 'Space & Geometric Transformations', 'Bivariate Statistics & Linear Regression']
      },
      {
        title: 'DP Mathematics: Analysis & Approaches (AA)',
        subtopics: ['Mathematical Induction (HL)', 'Complex Numbers & Euler Form', 'Maclaurin and Taylor Series (HL)', 'Limits, Continuity & Advanced Calculus']
      },
      {
        title: 'DP Mathematics: Applications & Interpretation',
        subtopics: ['Matrices & Eigenvalues', 'Graph Theory & Networks', 'Voronoi Diagrams', 'Chi-Squared Tests & Hypothesis Testing']
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Solve for x: 3x - 7 = 5x + 9',
    options: ['x = 8', 'x = -8', 'x = 1', 'x = -1'],
    correctIndex: 1,
    explanation: 'Subtracting 3x from both sides gives -7 = 2x + 9. Subtracting 9 from both sides gives -16 = 2x. Dividing by 2 yields x = -8.',
    level: 'Basic'
  },
  {
    id: 2,
    question: 'What is the sum of the interior angles of a regular hexagon?',
    options: ['360°', '540°', '720°', '900°'],
    correctIndex: 2,
    explanation: 'Using the formula (n - 2) × 180° for n = 6: (6 - 2) × 180° = 4 × 180° = 720°.',
    level: 'Basic'
  },
  {
    id: 3,
    question: 'If log₂(x) + log₂(x - 2) = 3, what is the value of x?',
    options: ['x = 4', 'x = -2', 'x = 4 or x = -2', 'x = 8'],
    correctIndex: 0,
    explanation: 'Using log properties: log₂(x(x - 2)) = 3 => x² - 2x = 2³ => x² - 2x - 8 = 0. Factoring gives (x - 4)(x + 2) = 0. Since log argument must be positive, x must be 4.',
    level: 'Intermediate'
  },
  {
    id: 4,
    question: 'Find the derivative of f(x) = x · ln(x) with respect to x.',
    options: ['ln(x)', '1 / x', 'ln(x) + 1', 'x + ln(x)'],
    correctIndex: 2,
    explanation: 'Using the product rule: f\'(x) = (d/dx[x]) · ln(x) + x · (d/dx[ln(x)]) = 1 · ln(x) + x · (1/x) = ln(x) + 1.',
    level: 'Intermediate'
  },
  {
    id: 5,
    question: 'A bag contains 3 red balls and 5 blue balls. If two balls are drawn at random without replacement, what is the probability that both are red?',
    options: ['9/64', '3/28', '3/14', '15/56'],
    correctIndex: 1,
    explanation: 'The probability of the first ball being red is 3/8. Since drawing is without replacement, the probability of the second ball being red is 2/7. Total probability = (3/8) * (2/7) = 6/56 = 3/28.',
    level: 'Advanced'
  },
  {
    id: 6,
    question: 'What is the limit as x approaches 0 of sin(5x) / x ?',
    options: ['0', '1', '5', 'Undefined'],
    correctIndex: 2,
    explanation: 'Using the standard limit lim(θ->0) sin(θ)/θ = 1, we can write: sin(5x)/x = 5 * (sin(5x) / 5x). Taking the limit gives 5 * 1 = 5. (Or use L\'Hôpital\'s Rule: derivative of sin(5x) is 5cos(5x) and derivative of x is 1; at x=0, 5cos(0)/1 = 5).',
    level: 'Advanced'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    studentName: 'Aarav M.',
    gradeClass: 'CBSE Grade 10',
    board: 'CBSE & ICSE',
    rating: 5,
    reviewText: 'Kanishak Sharma Maths School completely changed how I look at maths. I used to memorize formulas, but now I understand the actual concepts. Scored 98% in my Board exam!',
    date: 'June 12, 2026',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSTF634nK1A9bx4H-iLr17Mism6L0bVCTP5XeXUhX14oqTLFrKyRtzulZDH7WTO_amIvEF9X84lZL4HLkYRvg0N0R84E1HowgQRrJupd5Tuzl5_H8oF6FlsH3On0MXlPKnhcEpdqn-g4RIehGrNwEQKuMZl96nWJ02ciCZYeNXuYK--OBGdPsGFDC_Rn-2-ABpYuDSZ8aXPEkJWIjVunjBW47-DVOXi4I9toTtRSpZMy2kSMVrTeycoMgkbiLbR9X5vIeHNtzd7E4f',
    isVerified: true
  },
  {
    id: 'rev-2',
    studentName: 'Sophia Fletcher',
    gradeClass: 'IGCSE Year 11',
    board: 'IGCSE / GCSE',
    rating: 5,
    reviewText: 'The 1-on-1 focus is amazing. My tutor made trigonometric functions and vector spaces seem so straightforward. I got an A* in my CIE Extended Mathematics exams.',
    date: 'May 28, 2026',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQbqA7w_CBvwlHQv0-GV9Tjg82-MnsmsimMpd0tSM1CrTatEtlJIR0BwC6ah_E1Pcjd4vm_vDS8d_D_g2OrEPeefVky7CVkgIHBzXiTq9H0iyiE3qDy32jru1b8BnF3zuU9gTsH5_4KPQQ8TQfWvszsz078y-wk59hBl2eoV560oyw58uAdrKYAdVf7NImPe1qQty4MH1-5JUavLbTNPR6Q-6DjaWj0TkYGvDwYOGTVzMssC9S3GsGnW6ve0xGtwVSngk4HcCo_3JM',
    isVerified: true
  },
  {
    id: 'rev-3',
    studentName: 'Kabir Dev',
    gradeClass: 'IB DP Year 2',
    board: 'IB (MYP/DP)',
    rating: 5,
    reviewText: 'Mathematics AA HL is incredibly difficult, but my mentor guided me through complex integration, induction proofs, and even helped refine my Maths IA proposal. Secured a solid 7!',
    date: 'June 20, 2026',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTsh8Er6uqFjL-NKWOtP0s1Rx_iPxgU2yGdA3LvQdid6mBrv5pro132wRIoHtjzB5cmcXPHiW_hr9o1pfTV6OJLx6SHOf_6k6Ss51Zj--2BYvcundDRPnWHGy2hGRHgGiV7dRUTN2dzn9brQa8ZTB6bufwmQVFhWTuZ_42R3pyL6H93goYKHv0C5jtT0DRESbmpcMkciHik4-JV_rwmPAFjWjDlKUqH_oyfgf26BZs2Q6XDkfi5XgaROazZAiAe_bI88zyLsB6X3Mq',
    isVerified: true
  },
  {
    id: 'rev-4',
    studentName: 'Olivia Zhang',
    gradeClass: 'IB MYP Year 4',
    board: 'IB (MYP/DP)',
    rating: 4,
    reviewText: 'I love how they explain algebraic functions with virtual graphing calculators and visual proofs. Very friendly atmosphere and structured homework logs.',
    date: 'April 14, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces',
    isVerified: true
  },
  {
    id: 'rev-5',
    studentName: 'Rohan Mehta',
    gradeClass: 'ICSE Grade 9',
    board: 'CBSE & ICSE',
    rating: 5,
    reviewText: 'My grades in mathematics jumped from a C to an A+ in just one term. The concepts are taught from absolute scratch and we do plenty of problem-solving together.',
    date: 'May 05, 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    isVerified: true
  }
];

export const FAQS_DATA: Faq[] = [
  {
    id: 'faq-1',
    category: 'Class Format',
    question: 'How are the classes conducted?',
    answer: 'All our classes are conducted 1-on-1 or in ultra-small interactive groups via our premium, high-definition online classroom. We use live digital whiteboards, custom graphing apps, and screen-sharing tools to let students write alongside their tutor in real-time.'
  },
  {
    id: 'faq-2',
    category: 'Syllabus & Tutors',
    question: 'Who are the teachers at Kanishak Sharma Maths School?',
    answer: 'Our math mentors are highly vetted teachers, board educators, and top math graduates with a deep passion for conceptual education. Tutors undergo continuous academic audits to ensure the highest teaching standards are met.'
  },
  {
    id: 'faq-3',
    category: 'Booking & Trial',
    question: 'Is the initial demo class really free?',
    answer: 'Yes! The 45-minute diagnostic demo class is 100% free with no credit card required. It is designed to understand the student’s learning gaps, assess their current level, and map out a tailored math journey.'
  },
  {
    id: 'faq-4',
    category: 'Scheduling & Flexibility',
    question: 'Can we change slots or reschedule a class?',
    answer: 'Absolutely. We understand that student schedules are dynamic. Classes can be rescheduled through our student dashboard or by notifying your allocated support team up to 24 hours in advance with zero penalty.'
  },
  {
    id: 'faq-5',
    category: 'Pricing & Billing',
    question: 'How does the billing work? Are there long-term contracts?',
    answer: 'We offer flexible month-to-month billing. There are no locking-in contracts or hidden registration fees. You are billed at the start of your monthly cycle based on the curriculum and class frequency chosen.'
  }
];

export const FORMULAS_DATA: Formula[] = [
  {
    id: 'f-1',
    category: 'Algebra',
    name: 'Quadratic Formula',
    equation: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    description: 'Solves any quadratic equation of the form ax² + bx + c = 0, where a ≠ 0.'
  },
  {
    id: 'f-2',
    category: 'Geometry',
    name: 'Pythagorean Theorem',
    equation: 'a^2 + b^2 = c^2',
    description: 'Relates the lengths of the sides of a right-angled triangle, where c is the hypotenuse.'
  },
  {
    id: 'f-3',
    category: 'Trigonometry',
    name: 'Sine and Cosine Rules',
    equation: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} \\quad \\& \\quad c^2 = a^2 + b^2 - 2ab \\cos C',
    description: 'Used to solve any general oblique triangle when angles and sides are known.'
  },
  {
    id: 'f-4',
    category: 'Calculus',
    name: 'Fundamental Theorem of Calculus',
    equation: '\\int_a^b f(x) \\, dx = F(b) - F(a) \\quad \\text{where } F\'(x) = f(x)',
    description: 'Links the concept of differentiating a function with integrating it.'
  },
  {
    id: 'f-5',
    category: 'Arithmetic',
    name: 'Sum of Arithmetic Progression (AP)',
    equation: 'S_n = \\frac{n}{2} [2a + (n - 1)d]',
    description: 'Finds the sum of the first n terms of an arithmetic sequence with first term a and common difference d.'
  }
];
