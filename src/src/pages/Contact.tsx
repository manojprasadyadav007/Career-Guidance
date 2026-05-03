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

interface Profile {
  initials: string;
  name: string;
  role: string;
  experience: string;
  summary: string;
  contactInfo: ContactInfo[];
  skills: Skill[];
}

function Contact() {
  const profiles: Profile[] = [
    {
      initials: 'MY',
      name: 'Manoj Yadav',
      role: 'Senior Software Engineer',
      experience: '9+ Years of Experience',
      summary: 'I am working as a Senior Software Engineer in Nitor Infotech Pvt Ltd with 9+ years of experience. Specialized in building modern, scalable web applications using cutting-edge technologies.',
      contactInfo: [
        {
          icon: <Email />,
          label: 'Email',
          value: 'cb.careerboost@gmail.com',
          link: 'mailto:cb.careerboost@gmail.com',
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
          icon: <LocationOn />,
          label: 'Previous Company',
          value: 'HCL Technologies',
        },
      ],
      skills: [
        { name: 'Full Stack', color: '#61dafb' },
        { name: 'Front-end', color: '#dd0031' },
        { name: 'Back-end', color: '#f7df1e' },
        { name: 'Testing', color: '#3178c6' },
      ],
    },
    {
      initials: 'SK',
      name: 'Subhash Kumar',
      role: 'Senior Software Engineer',
      experience: '8+ Years of Experience',
      summary: 'I am working as a Senior Software Engineer in Nitor Infotech Pvt Ltd with 8+ years of experience. Specialized in building modern, scalable web applications using cutting-edge technologies.',
      contactInfo: [
        {
          icon: <Email />,
          label: 'Email',
          value: 'cb.careerboost@gmail.com',
          link: 'mailto:cb.careerboost@gmail.com',
        },
        {
          icon: <Phone />,
          label: 'Mobile',
          value: '8207615019',
          link: 'tel:+8207615019',
        },
        {
          icon: <School />,
          label: 'Education',
          value: 'MCA - NIT Bhopal',
        },
        {
          icon: <LocationOn />,
          label: 'Previous Company',
          value: 'Oracle and Accenture',
        },
      ],
      skills: [
        { name: 'Full Stack', color: '#61dafb' },
        { name: 'Front-end', color: '#dd0031' },
        { name: 'Back-end', color: '#f7df1e' },
        { name: 'Testing', color: '#3178c6' },
      ],
    },
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        {profiles.map((profile, profileIndex) => (
          <div key={profileIndex} className="profile-card fade-in">
            {/* Left Column */}
            <div className="left-column">
              <div className="profile-header">
                <div className="profile-avatar">
                  <div className="avatar-circle">
                    <span className="avatar-text">{profile.initials}</span>
                  </div>
                  <div className="online-badge"></div>
                </div>
                <h1 className="profile-name">{profile.name}</h1>
                <p className="profile-role">{profile.role}</p>
                <p className="profile-experience">{profile.experience}</p>
              </div>

              {/* Professional Summary */}
              <div className="professional-summary">
                <h2 className="section-heading">
                  <Code className="heading-icon" />
                  Professional Summary
                </h2>
                <p className="summary-text">
                  {profile.summary}
                </p>
              </div>

              {/* Skills Section */}
              <div className="skills-section">
                <h2 className="section-heading">
                  <Code className="heading-icon" />
                  Technical Skills
                </h2>
                <div className="skills-container">
                  {profile.skills.map((skill, index) => (
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
                  {profile.contactInfo.map((item, index) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
