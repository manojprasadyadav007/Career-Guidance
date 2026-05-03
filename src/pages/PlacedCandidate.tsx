import { useState } from 'react'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import '../style.css'
import img1 from '../assets/img/img1.png'
import img2 from '../assets/img/img2.png'
import img3 from '../assets/img/img3.png'
import img4 from '../assets/img/img4.png'
import img7 from '../assets/img/img7.png'
import img6 from '../assets/img/img6.png'

interface Testimonial {
  id: number
  name: string
  image: string
  testimonial: string
  rating: number
}

interface Stat {
  value: string
  label: string
}

// Testimonials Data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rajneesh Yadav',
    image: img3,
    testimonial: 'I am truly grateful for the guidance and support throughout my journey. With the right mentorship and preparation strategy, achieving a 300% hike and securing multiple offers from top companies like Infosys, Ascendion, M-Pocket, and KPMG. This journey boosted my confidence and clarity. Thank you for your constant support!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Vikash Jain',
    image: img4,
    testimonial: 'I could not reply earlier, but I truly want to thank you. With your guidance, I cracked offers of 14 LPA and 16 LPA, and I am now interviewing for a 20 LPA remote role. I never knew my true market value before this. Your mentorship boosted my confidence and preparation. This would not have been possible without you. Truly grateful!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Satish Johare',
    image: img1,
    testimonial: 'I was going through one of the toughest phases of my life after losing my IT job. Managing family responsibilities while working as a delivery boy was not easy, and I almost gave up on my IT career. But your guidance changed everything. You helped me regain confidence, restart my preparation, and believe in myself again. Today, I am back in IT as a Java Developer with a 116% hike. Truly grateful for your support!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Subhash Kumar',
    image: img6,
    testimonial: 'When I connected with you, I was confused and not very confident about my preparation. Your guidance helped me understand where I was doing wrong and how to improve step by step. Slowly I become more consistent and focused. This success is because of your support and motivation. Thank you for always guiding me and believing in me.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Aman',
    image: img2,
    testimonial: 'Before connecting with you, I was going through a tough time after being part of a layoff and was not sure how to restart. I was trying but not getting the right results. Your guidance gave me clarity, helped me stay consistent, and rebuild my confidence. This achievement is because of your support. Really thankful for your mentorship and encouragement.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Shrutika',
    image: img7,
    testimonial: 'After being part of a layoff, I was stressed and unsure how to restart my career. Connecting with you gave me clarity and a proper plan. With your guidance, I stayed focused and consistent, and within one month I got a new job with a 50% hike. Really thankful for your support, motivation, and constant guidance throughout this journey.',
    rating: 5,
  },
]

// Stats Data
const placementStats: Stat[] = [
  { value: '1000+', label: 'Students Placed' },
  { value: '50+', label: 'Partner Companies' },
  { value: '20 LPA', label: 'Highest Package' },
  { value: '95%', label: 'Placement Rate' },
]

function PlacedCandidate() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(testimonials.length - itemsPerPage, prev + 1)
    )
  }

  // Helper function to render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <span key={i} className="star">
        ⭐
      </span>
    ))
  }

  // Helper function to render testimonial card
  const renderTestimonialCard = (testimonial: Testimonial) => (
    <div key={testimonial.id} className="testimonial-card">
      <div className="testimonial-card-content">
        {/* Quote Icon */}
        <div className="quote-icon top">"</div>

        {/* Avatar */}
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="testimonial-avatar-icon"
        />

        {/* Testimonial Text */}
        <p className="testimonial-text">
          {testimonial.testimonial}
        </p>

        {/* Bottom Quote */}
        <div className="quote-icon bottom">"</div>

        {/* Name and Rating */}
        <div className="testimonial-footer">
          <h3 className="testimonial-name">
            {testimonial.name}
          </h3>
          <div className="testimonial-rating">
            {renderStars(testimonial.rating)}
          </div>
        </div>
      </div>
    </div>
  )

  // Helper function to render stat item
  const renderStatItem = (stat: Stat, idx: number) => (
    <div key={idx} className="stat-item">
      <div className="stat-value">
        {stat.value}
      </div>
      <div className="stat-label">
        {stat.label}
      </div>
    </div>
  )

  // Get visible testimonials based on current index
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage)

  // Calculate total pagination dots
  const totalPages = testimonials.length - itemsPerPage + 1

  return (
    <main>
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="testimonials-title">
            What people say about our roadmaps
          </h2>
          <p className="testimonials-subtitle">
            Real success stories from learners who transformed their careers with our roadmaps
          </p>

          {/* Testimonial Cards */}
          <div className="testimonials-carousel">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="carousel-button prev"
              aria-label="Previous testimonials"
            >
              <ArrowBackIos />
            </button>

            {/* Cards Grid */}
            <div className="testimonials-grid">
              {visibleTestimonials.map(renderTestimonialCard)}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= testimonials.length - itemsPerPage}
              className="carousel-button next"
              aria-label="Next testimonials"
            >
              <ArrowForwardIos />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="pagination-dots">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`pagination-dot ${currentIndex === idx ? 'active' : ''}`}
                role="button"
                aria-label={`Go to page ${idx + 1}`}
                tabIndex={0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <h2 className="stats-title">
            Our Placement Success
          </h2>
          <div className="stats-grid">
            {placementStats.map(renderStatItem)}
          </div>
        </div>
      </section>
    </main>
  )
}

export default PlacedCandidate
