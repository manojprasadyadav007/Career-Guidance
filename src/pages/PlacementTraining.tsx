import { useState, type JSX } from 'react'
import {
  CheckCircle,
  School,
  TrendingUp,
  Group,
  Code,
  Assessment,
  Business,
  EmojiEvents,
  PlayArrow,
  ArrowForward,
  ExpandMore
} from '@mui/icons-material'
import './PlacementTraining.css'

interface Module {
  id: number
  title: string
  duration: string
  topics: string[]
}

interface Feature {
  icon: JSX.Element
  title: string
  description: string
}

interface Partner {
  name: string
  logo: string
}

interface PricingTier {
  name: string
  price: string
  duration: string
  features: string[]
  popular?: boolean
}

interface FAQ {
  question: string
  answer: string
}

function PlacementTraining() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  // Training Modules
  const modules: Module[] = [
    {
      id: 1,
      title: 'DSA Fundamentals',
      duration: '6 Weeks',
      topics: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & Graphs', 'Dynamic Programming', 'Sorting & Searching']
    },
    {
      id: 2,
      title: 'System Design',
      duration: '4 Weeks',
      topics: ['Scalability Basics', 'Database Design', 'Caching Strategies', 'Load Balancing', 'Microservices', 'Real-world Case Studies']
    },
    {
      id: 3,
      title: 'Core CS Subjects',
      duration: '5 Weeks',
      topics: ['Operating Systems', 'DBMS', 'Computer Networks', 'OOPs Concepts', 'SQL Queries', 'ACID Properties']
    },
    {
      id: 4,
      title: 'Aptitude & Reasoning',
      duration: '3 Weeks',
      topics: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Puzzles', 'Pattern Recognition', 'Speed Math']
    },
    {
      id: 5,
      title: 'Mock Interviews',
      duration: 'Ongoing',
      topics: ['Technical Rounds', 'HR Rounds', 'Group Discussions', 'Case Studies', 'Coding Assessments', 'Behavioral Questions']
    },
    {
      id: 6,
      title: 'Soft Skills',
      duration: '2 Weeks',
      topics: ['Communication Skills', 'Resume Building', 'LinkedIn Optimization', 'Email Etiquette', 'Presentation Skills', 'Body Language']
    }
  ]

  // Key Features
  const features: Feature[] = [
    {
      icon: <School />,
      title: 'Expert Mentorship',
      description: '1:1 guidance from industry professionals with 10+ years of experience'
    },
    {
      icon: <Code />,
      title: 'Live Coding Sessions',
      description: 'Daily practice with real-time feedback and code reviews'
    },
    {
      icon: <Assessment />,
      title: 'Mock Interviews',
      description: 'Unlimited practice interviews mimicking real company processes'
    },
    {
      icon: <Business />,
      title: '500+ Partner Companies',
      description: 'Direct placement opportunities with top tech companies'
    },
    {
      icon: <TrendingUp />,
      title: 'Career Support',
      description: 'Resume building, profile optimization, and interview prep'
    },
    {
      icon: <Group />,
      title: 'Peer Learning',
      description: 'Collaborative environment with study groups and discussions'
    }
  ]

  // Industry Partners
  const partners: Partner[] = [
    { name: 'Google', logo: '🔵' },
    { name: 'Microsoft', logo: '🟦' },
    { name: 'Amazon', logo: '🟧' },
    { name: 'Flipkart', logo: '🟨' },
    { name: 'Adobe', logo: '🔴' },
    { name: 'Walmart', logo: '🟡' },
    { name: 'Oracle', logo: '🔴' },
    { name: 'TCS', logo: '🔵' },
    { name: 'Infosys', logo: '🟦' },
    { name: 'Wipro', logo: '🟩' },
    { name: 'Cognizant', logo: '🟦' },
    { name: 'Accenture', logo: '🟪' }
  ]

  // Pricing Tiers
  const pricingTiers: PricingTier[] = [
    {
      name: 'Basic',
      price: '₹15,999',
      duration: '3 Months',
      features: [
        'Access to all course materials',
        'Weekly doubt clearing sessions',
        'Community support',
        'Basic mock interviews',
        'Resume review',
        'Job portal access'
      ]
    },
    {
      name: 'Pro',
      price: '₹29,999',
      duration: '6 Months',
      popular: true,
      features: [
        'Everything in Basic',
        '1:1 mentorship sessions',
        'Unlimited mock interviews',
        'Priority job referrals',
        'LinkedIn profile optimization',
        'Placement assistance',
        'Interview guarantee'
      ]
    },
    {
      name: 'Premium',
      price: '₹49,999',
      duration: '12 Months',
      features: [
        'Everything in Pro',
        'Dedicated career coach',
        'Company-specific preparation',
        'Salary negotiation support',
        'Lifetime community access',
        'Advanced system design',
        '100% placement guarantee'
      ]
    }
  ]

  // FAQs
  const faqs: FAQ[] = [
    {
      question: 'Who can join this placement training program?',
      answer: 'Our program is designed for college students (2nd, 3rd, 4th year), recent graduates, and working professionals looking to switch to product-based companies. Basic programming knowledge is recommended.'
    },
    {
      question: 'What is the duration of the program?',
      answer: 'The program duration varies based on your chosen plan - 3 months for Basic, 6 months for Pro, and 12 months for Premium. However, you get lifetime access to course materials and community.'
    },
    {
      question: 'Do you guarantee placements?',
      answer: 'Yes! Our Pro and Premium plans come with placement assistance. Premium plan offers 100% placement guarantee with minimum CTC assurance. We have partnerships with 500+ companies.'
    },
    {
      question: 'What is the average package offered?',
      answer: 'Our students have received average packages ranging from 8-15 LPA, with the highest package being 45 LPA. The package depends on your skills, performance, and target companies.'
    },
    {
      question: 'Are the classes live or recorded?',
      answer: 'We offer both! Live classes are conducted daily for interactive learning, and all sessions are recorded for future reference. You can access recordings anytime from your dashboard.'
    },
    {
      question: 'What support is provided after placement?',
      answer: 'We provide ongoing support for the first 6 months after placement including onboarding guidance, performance tips, and career counseling. Premium members get lifetime support.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  return (
    <main className="placement-training">
      {/* Hero Section */}
      <section className="pt-hero">
        <div className="pt-hero-container">
          <div className="pt-hero-badge">
            <EmojiEvents className="pt-hero-badge-icon" />
            <span>95% Placement Success Rate</span>
          </div>

          <h1 className="pt-hero-title">
            Transform Your Career with Our
            <span className="pt-hero-title-highlight"> Placement Training Program</span>
          </h1>

          <p className="pt-hero-subtitle">
            Get placement-ready in 3-6 months with expert mentorship, hands-on projects,
            and guaranteed interview opportunities at top tech companies
          </p>

          <div className="pt-hero-buttons">
            <button className="pt-btn pt-btn-primary">
              Enroll Now <ArrowForward />
            </button>
            <button className="pt-btn pt-btn-secondary">
              <PlayArrow /> Watch Demo
            </button>
          </div>

          <div className="pt-hero-stats">
            <div className="pt-hero-stat">
              <div className="pt-hero-stat-value">1000+</div>
              <div className="pt-hero-stat-label">Students Placed</div>
            </div>
            <div className="pt-hero-stat">
              <div className="pt-hero-stat-value">50+</div>
              <div className="pt-hero-stat-label">Partner Companies</div>
            </div>
            <div className="pt-hero-stat">
              <div className="pt-hero-stat-value">20 LPA</div>
              <div className="pt-hero-stat-label">Highest Package</div>
            </div>
            <div className="pt-hero-stat">
              <div className="pt-hero-stat-value">12 LPA</div>
              <div className="pt-hero-stat-label">Average Package</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-features">
        <div className="pt-container">
          <h2 className="pt-section-title">Why Choose Our Program?</h2>
          <p className="pt-section-subtitle">
            Comprehensive training designed to make you industry-ready
          </p>

          <div className="pt-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="pt-feature-card">
                <div className="pt-feature-icon">{feature.icon}</div>
                <h3 className="pt-feature-title">{feature.title}</h3>
                <p className="pt-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Modules Section */}
      <section className="pt-modules">
        <div className="pt-container">
          <h2 className="pt-section-title">Comprehensive Curriculum</h2>
          <p className="pt-section-subtitle">
            Structured learning path covering all aspects of placement preparation
          </p>

          <div className="pt-modules-grid">
            {modules.map((module) => (
              <div key={module.id} className="pt-module-card">
                <div className="pt-module-header">
                  <h3 className="pt-module-title">{module.title}</h3>
                  <span className="pt-module-duration">{module.duration}</span>
                </div>
                <ul className="pt-module-topics">
                  {module.topics.map((topic, index) => (
                    <li key={index} className="pt-module-topic">
                      <CheckCircle className="pt-module-topic-icon" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Path Section */}
      <section className="pt-success-path">
        <div className="pt-container">
          <h2 className="pt-section-title">Your Success Journey</h2>
          <div className="pt-timeline">
            <div className="pt-timeline-item">
              <div className="pt-timeline-marker">1</div>
              <div className="pt-timeline-content">
                <h3>Assessment & Onboarding</h3>
                <p>Initial skill assessment and personalized learning path creation</p>
              </div>
            </div>
            <div className="pt-timeline-item">
              <div className="pt-timeline-marker">2</div>
              <div className="pt-timeline-content">
                <h3>Intensive Training</h3>
                <p>Live classes, hands-on practice, and weekly assessments</p>
              </div>
            </div>
            <div className="pt-timeline-item">
              <div className="pt-timeline-marker">3</div>
              <div className="pt-timeline-content">
                <h3>Mock Interviews</h3>
                <p>Real interview simulations with detailed feedback</p>
              </div>
            </div>
            <div className="pt-timeline-item">
              <div className="pt-timeline-marker">4</div>
              <div className="pt-timeline-content">
                <h3>Placement Drive</h3>
                <p>Direct referrals and interview opportunities with partner companies</p>
              </div>
            </div>
            <div className="pt-timeline-item">
              <div className="pt-timeline-marker">5</div>
              <div className="pt-timeline-content">
                <h3>Post-Placement Support</h3>
                <p>Onboarding guidance and career growth mentorship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Partners */}
      <section className="pt-partners">
        <div className="pt-container">
          <h2 className="pt-section-title">Our Hiring Partners</h2>
          <p className="pt-section-subtitle">
            Get placed at top product-based companies
          </p>
          <div className="pt-partners-grid">
            {partners.map((partner, index) => (
              <div key={index} className="pt-partner-card">
                <div className="pt-partner-logo">{partner.logo}</div>
                <div className="pt-partner-name">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pt-pricing">
        <div className="pt-container">
          <h2 className="pt-section-title">Choose Your Plan</h2>
          <p className="pt-section-subtitle">
            Flexible pricing options to match your career goals
          </p>

          <div className="pt-pricing-grid">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`pt-pricing-card ${tier.popular ? 'pt-pricing-card-popular' : ''}`}>
                {tier.popular && <div className="pt-pricing-badge">Most Popular</div>}
                <h3 className="pt-pricing-name">{tier.name}</h3>
                <div className="pt-pricing-price">{tier.price}</div>
                <div className="pt-pricing-duration">{tier.duration}</div>
                <ul className="pt-pricing-features">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="pt-pricing-feature">
                      <CheckCircle className="pt-pricing-feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`pt-btn ${tier.popular ? 'pt-btn-primary' : 'pt-btn-outline'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>

          <div className="pt-pricing-note">
            <p>💰 EMI options available | 🎓 Student discounts available | 🔄 Money-back guarantee</p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="pt-faqs">
        <div className="pt-container">
          <h2 className="pt-section-title">Frequently Asked Questions</h2>
          <div className="pt-faqs-container">
            {faqs.map((faq, index) => (
              <div key={index} className="pt-faq-item">
                <button
                  className={`pt-faq-question ${expandedFAQ === index ? 'pt-faq-question-active' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <ExpandMore className={`pt-faq-icon ${expandedFAQ === index ? 'pt-faq-icon-rotated' : ''}`} />
                </button>
                {expandedFAQ === index && (
                  <div className="pt-faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-cta">
        <div className="pt-container">
          <div className="pt-cta-content">
            <h2 className="pt-cta-title">Ready to Start Your Journey?</h2>
            <p className="pt-cta-subtitle">
              Join 10,000+ students who landed their dream jobs with our placement training program
            </p>
            <div className="pt-cta-buttons">
              <button className="pt-btn pt-btn-primary pt-btn-large">
                Enroll Now <ArrowForward />
              </button>
              <button className="pt-btn pt-btn-secondary-white pt-btn-large">
                Talk to Counselor
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PlacementTraining
