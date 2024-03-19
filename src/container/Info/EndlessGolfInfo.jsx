import React from 'react';
import { motion } from 'framer-motion';
import { images, videos } from '../../constants';
import './SuperDonkeyBallsInfo.scss';

const gameInfo = [
  {
    title: 'Endless Golf',
    logo: images.endlessGolfLogo,
    subtitles: ['Out Now!'],
    longDescription:
      "In this charming and whimsical golf-inspired adventure, players are invited to embark on an endless journey through procedurally-generated landscapes with their trusty little cyclops companion.\nSet in a cozy and inviting world, the game offers a unique twist on the traditional mini-golfing experience, as players toss their one-eyed friend across lush green landscapes, navigating through obstacles and terrain variations. With each procedurally-generated level presenting new challenges and surprises, the game promises endless replayability and discovery. As players hone their skills and perfect their pitches, they'll uncover hidden secrets and unlock special rewards scattered throughout the whimsical world.\nWhether playing solo or competing with friends for the highest score, fling the little cyclops offers a delightful blend of relaxation and excitement, making it a perfect choice for players of all ages looking for a cozy and infinitely enjoyable gaming experience.",
    vidURL: videos.endlessGolfLCD,
    tags: ['PC/Mac', 'Console', 'Mobile'],
  },
];

const EndlessGolfInfo = ({ toggleModal }) => {
  const videoSource = gameInfo[0];

  const platformLogos = [
    { id: 'pc', src: images.pcLogo, alt: 'PC Logo' },
    { id: 'ios', src: images.appleLogo, alt: 'iOS Logo' },    
    { id: 'android', src: images.andoirdLogo, alt: 'Adnroid Logo' },
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
              {/* Add Notify Me text box and Submit button              
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
               */}
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

export default EndlessGolfInfo;
