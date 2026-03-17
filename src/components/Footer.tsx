import { Link } from 'react-router-dom'
import { Phone, Email, LocationOn } from '@mui/icons-material'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-mark">CG</div>
              <div className="footer-logo-text">
                <span className="footer-brand-name">
                  Career<span className="footer-brand-highlight"> Guidance</span>
                </span>
                <span className="footer-brand-tagline">Where learning never stops</span>
              </div>
            </div>
            <p className="footer-description">
              Helping ambitious learners upskill themselves & shift to FAANG & top
              product based companies.
            </p>
            <div className="footer-social">
              <h3 className="footer-social-title">FOLLOW US</h3>
              <div className="footer-social-icons">
                <a href="https://www.linkedin.com/in/manoj-yadav-22438a16a" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                  in
                </a>
                <a href="https://topmate.io" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Topmate">
                  TM
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/placement-training">Placement Training</Link></li>
              <li><a href="#blogs">Blogs</a></li>
              <li><a href="#roadmaps">Roadmaps</a></li>
              <li><a href="#books">Books</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="footer-section">
            <h3 className="footer-section-title">Policies</h3>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#shipping">Shipping Policy</a></li>
              <li><a href="#refunds">Cancellations & Refunds</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="footer-section">
            <h3 className="footer-section-title">Contact Us</h3>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <Phone className="footer-contact-icon" />
                <a href="tel:+919113363283">+91-9113363283</a>
              </li>
              <li className="footer-contact-item">
                <Email className="footer-contact-icon" />
                <a href="mailto:manojfor4u@gmail.com">manojfor4u@gmail.com</a>
              </li>
              <li className="footer-contact-item">
                <LocationOn className="footer-contact-icon" />
                <span>📍 Embassy TechZone, Rajiv Gandhi Infotech Park, Hinjewadi Phase II, Pune, Maharashtra – 411057, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            Copyright {new Date().getFullYear()} Career Guidance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
