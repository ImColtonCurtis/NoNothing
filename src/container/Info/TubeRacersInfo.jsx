import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { images, videos } from '../../constants';
import './SuperDonkeyBallsInfo.scss';

const gameInfo = [
  {
    title: 'Endless Golf',
    logo: images.tubeRacersLogo,
    subtitles: ['Coming soon!'],
    longDescription:
      "In this exhilarating arcade adventure, players dive into a hyper-speed battle against racers from across the world, navigating a vibrant and dynamic world filled with obstacles and challenges.\nAs a battle-royale platformer, this game offers a thrilling multiplayer experience where everyone can compete head-to-head in a fast-paced frenzy. As players speed through colorful landscapes and defy gravity with intense barell-roll spins, they must skillfully maneuver their way to the finish line while outmaneuvering their opponents.\nWith its blend of speed, strategy, and skill, this game promises endless hours of competitive fun, making it a must-have for any gamer. Get ready to rev up your engines and embark on the ultimate race to victory in this adrenaline-pumping arcade sensation.",
    vidURL: videos.tubeRacersLCD,
    tags: ['PC/Mac', 'Console', 'Mobile'],
  },
];

const TubeRacersInfo = ({ toggleModal }) => {
  const videoSource = gameInfo[0];
  const [email, setEmail] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);
  const [isValidEmail, setValidEmail] = useState(true); // New state for email validation

  useEffect(() => {
    // Check sessionStorage to see if the user has submitted an email
    const storedSubmittedStatus = sessionStorage.getItem('isSubmitted');
    if (storedSubmittedStatus) {
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = () => {
    // Perform email validation
    const isValid = validateEmail(email);

    if (isValid) {
      // For simplicity, let's assume a valid email for now
      setSubmitted(true);
      setValidEmail(true);

      // Store the submitted status in sessionStorage
      sessionStorage.setItem('isSubmitted', 'true');
    } else {
      setValidEmail(false);
      // You can display an error message or take other actions
    }
  };

  const validateEmail = (email) => {
    // Basic email validation (contains '@' symbol and '.')
    if (!email.includes('@') || !email.includes('.')) {
      return false;
    }
  
    // Check for a valid position of '@'
    if (email.indexOf('@') <= 0) {
      return false;
    }
  
    // Check for consecutive dots
    if (/(\.{2,})/.test(email)) {
      return false;
    }
  
    // Check if the domain has at least one '.' after '@'
    const domainParts = email.split('@')[1].split('.');
    if (domainParts.length < 2) {
      return false;
    }
  
    return true;
  };

  const platformLogos = [
    { id: 'pc', src: images.pcLogo, alt: 'PC Logo' },
    { id: 'mac', src: images.appleLogo, alt: 'Mac Logo' },
    { id: 'playstation', src: images.playstationLogo, alt: 'Playstation Logo' },
    { id: 'xbox', src: images.xboxLogo, alt: 'Xbox Logo' },
    { id: 'switch', src: images.switchLogo, alt: 'Switch Logo' },
  ];
  
  return (
    <motion.div 
      className="app__info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >      
      <motion.div 
        className="app__info-videoDetails"
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <motion.div 
          className="app__info-video"
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <div className="app__info-content">
            <div className="app__info-logos">
              <img src={videoSource.logo} alt={videoSource.title} className="info-logo-image" />
              {/* Add Notify Me text box and Submit button */}              
              <div className="notify-me-container">
                {!isSubmitted ? (
                  <motion.div
                    className="notify-me-box"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <input
                      type="text"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setValidEmail(true); // Reset validation status when typing
                      }}
                      style={{ borderColor: isValidEmail ? 'initial' : 'red' }} // Highlight border on validation error
                    />
                    <button
                      onClick={handleSubmit}
                      style={{
                        cursor: email && isValidEmail ? 'pointer' : 'not-allowed',
                      }}
                      disabled={!email || !isValidEmail}
                    >
                      {email ? 'Submit' : 'Notify Me'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="submitted-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    Submitted. We'll notify you on launch!
                  </motion.div>
                )}
              </div>
            </div>            
            <video
              src={videoSource.vidURL}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="app__info-header-video"
            />
            <button 
              className="exit-button" 
              onClick={toggleModal}
            >
            <motion.div whileHover={{ scale: [1, 1.2] }}>
              <img src={images.exit} alt="Exit Button" className="exit-button-image" />
            </motion.div>
            </button>        
          </div>
        </motion.div>
        <div className="info-text-details">
          <div className='app__info-platform-logos'>
            {platformLogos.map(({ id, src, alt }) => (
              <img key={id} src={src} alt={alt} className="platform-logo" />
            ))}
          </div>
          <p className="info-subtitle-text">{videoSource.subtitles[0]}</p>
          <p className="longDescription-text">
            {videoSource.longDescription
            .split('\n')
            .map((paragraph, index) => (
              <React.Fragment key={index}>
                <p>{paragraph}</p>
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TubeRacersInfo;
