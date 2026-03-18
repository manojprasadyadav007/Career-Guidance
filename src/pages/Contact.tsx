import { Email, Phone, Business, School, Code, LocationOn } from '@mui/icons-material';
import './Contact.css';

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  link?: string;
}

interface Skill {
  name: string;
  color: string;
}

function Contact() {
  const contactInfo: ContactInfo[] = [
    {
      icon: <Email />,
      label: 'Email',
      value: 'manojprasadyadav007@gmail.com',
      link: 'mailto:manojprasadyadav007@gmail.com',
    },
    {
      icon: <Phone />,
      label: 'Mobile',
      value: '9113363283',
      link: 'tel:+919113363283',
    },
    {
      icon: <School />,
      label: 'Education',
      value: 'MCA - NIT Raipur',
    },
    {
      icon: <Business />,
      label: 'Current Company',
      value: 'Nitor Infotech Pvt Ltd',
    },
    {
      icon: <LocationOn />,
      label: 'Previous Company',
      value: 'HCL Technologies',
    },
  ];

  const skills: Skill[] = [
    { name: 'React JS', color: '#61dafb' },
    { name: 'Angular', color: '#dd0031' },
    { name: 'JavaScript', color: '#f7df1e' },
    { name: 'TypeScript', color: '#3178c6' },
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Profile Card */}
        <div className="profile-card fade-in">
          {/* Left Column */}
          <div className="left-column">
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  <span className="avatar-text">MY</span>
                </div>
                <div className="online-badge"></div>
              </div>
              <h1 className="profile-name">Manoj Yadav</h1>
              <p className="profile-role">Senior Software Engineer</p>
              <p className="profile-experience">6+ Years of Experience</p>
            </div>

            {/* Professional Summary */}
            <div className="professional-summary">
              <h2 className="section-heading">
                <Code className="heading-icon" />
                Professional Summary
              </h2>
              <p className="summary-text">
                I am working as a Senior Software Engineer in Nitor Infotech Pvt Ltd with 6+ years of experience.
                Specialized in building modern, scalable web applications using cutting-edge technologies.
              </p>
            </div>

            {/* Skills Section */}
            <div className="skills-section">
              <h2 className="section-heading">
                <Code className="heading-icon" />
                Technical Skills
              </h2>
              <div className="skills-container">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="skill-badge"
                    style={{ borderColor: skill.color }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Contact Information */}
            <div className="contact-section">
              <h2 className="section-heading">
                <Email className="heading-icon" />
                Contact Information
              </h2>
              <div className="contact-items">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-item">
                    <div className="contact-icon">{item.icon}</div>
                    <div className="contact-details">
                      <span className="contact-label">{item.label}</span>
                      {item.link ? (
                        <a href={item.link} className="contact-value contact-link">
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
