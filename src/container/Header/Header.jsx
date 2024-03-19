import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppWrap } from '../../wrapper';
import { images, videos } from '../../constants';
import { EndlessGolfInfo, SuperDonkeyBallsInfo, TubeRacersInfo } from '../../container';
import anime from 'animejs/lib/anime.es.js';
import './Header.scss';

// Function to shuffle array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const gameVideos = shuffleArray([
  {
    title: 'Super Donkey Balls',
    logo: images.superDonkeyBallsLogo,
    subtitles: ['In development.', 'On the way!', 'In the works!'],
    shortDescription: 'Race against your friends in this tactile, party-platforming adventure.',
    vidURL: videos.superDonkeyBallsLCD,
  },
  {
    title: 'Endless Golf',    
    logo: images.endlessGolfLogo,
    subtitles: ['Out Now!', 'Now Available.', 'Play Now!'],
    shortDescription: 'Toss the little cyclops around in this endless, procedurally-generated, cozy golf game.',
    vidURL: videos.endlessGolfLCD,
  },
  
  {
    title: 'Tube Racers',    
    logo: images.tubeRacersLogo,
    subtitles: ['Coming soon!', 'Almost ready!', 'Available soon!'],
    shortDescription: 'Survive the cource and battle against players from across the globe in this retro-style space racing game!',
    vidURL: videos.tubeRacersLCD,
  },
]);

const Header = ({ toggleModal, modal, toggleMoreInfoModal, moreInfoModal }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoReady, setNextVideoReady] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [fadeInWhiteScreen, setFadeInWhiteScreen] = useState(false);
  const videoRef = useRef(null);
  const cleanupRef = useRef(() => {});

  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    // Log the received props when the component mounts
    console.log('Header component mounted with props:', { toggleModal, modal, toggleMoreInfoModal, moreInfoModal });

    // ... existing code ...
  }, [toggleModal, modal, toggleMoreInfoModal, moreInfoModal]);

  useEffect(() => {
    // Set scroll position to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleVideoEnd = useCallback(() => {
    // Reset the current video to the beginning
    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      currentVideoRef.currentTime = 0;

      // Toggle between the videos
      const nextVideoIndex = (currentVideoIndex + 1) % gameVideos.length;
      setCurrentVideoIndex(nextVideoIndex);
      setNextVideoReady(false);

      // Reset fade in of white screen
      setFadeInWhiteScreen(false);
    }
  }, [currentVideoIndex]);

  useEffect(() => {
    // Add event listener for video end
    const currentVideoRef = videoRef.current;
    currentVideoRef.addEventListener('ended', handleVideoEnd);

    // Assign the cleanup function to the ref
    cleanupRef.current = () => {
      currentVideoRef.removeEventListener('ended', handleVideoEnd);
    };

    // Cleanup event listener on component unmount
    return () => {
      // Execute the cleanup function from the ref
      cleanupRef.current();
    };
  }, [currentVideoIndex, handleVideoEnd]);

  useEffect(() => {
    // Start preparing the next video when the current video starts
    const currentVideoRef = videoRef.current;
    const handlePlay = () => {
      setNextVideoReady(true);
    };

    // Add event listener for video play
    currentVideoRef.addEventListener('play', handlePlay);

    // Cleanup event listener on component unmount
    return () => {
      currentVideoRef.removeEventListener('play', handlePlay);
    };
  }, [currentVideoIndex]);

  useEffect(() => {
    // Preload the next video
    const nextVideoIndex = (currentVideoIndex + 1) % gameVideos.length;
    const nextVideo = new Audio(gameVideos[nextVideoIndex].vidURL);
    nextVideo.preload = 'auto';

    // Cleanup the audio element on component unmount
    const cleanupNextVideo = () => {
      nextVideo.remove();
    };

    // Assign the cleanup function to the ref
    cleanupRef.current = () => {
      cleanupNextVideo();
    };

    // Cleanup the audio element on component unmount
    return () => {
      cleanupRef.current();
    };
  }, [currentVideoIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentVideoRef = videoRef.current;
      if (currentVideoRef) {
        const currentTime = currentVideoRef.currentTime;
        const duration = currentVideoRef.duration;
        if (duration) {
          console.log("current time: " + currentTime + " duration: " + duration);
          // Start preparing the next video 0.73 seconds before the current video ends
          if (currentTime >= duration - 0.73 && !fadeInWhiteScreen) {
            setFadeInWhiteScreen(true);
          }
        }
      }
    }, 50); // Check every 0.05 seconds (50 milliseconds)
  
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [nextVideoReady, fadeInWhiteScreen]);
  

  // Dynamically set the video source and subtitle based on the current video index
  const currentVideo = gameVideos[currentVideoIndex];
  const videoSource = currentVideo.vidURL;

  useEffect(() => {
    // Randomly select a subtitle for the current video
    const randomSubtitleIndex = Math.floor(Math.random() * currentVideo.subtitles.length);
    setCurrentSubtitle(currentVideo.subtitles[randomSubtitleIndex]);
  }, [currentVideoIndex, currentVideo.subtitles]);

  const videoContentRef = useRef(null);

  useEffect(() => {
    const videoContentElement = videoContentRef.current;
    const videoElement = videoContentElement.querySelector('.app__header-video');
  
    if (modal) {
      // Smoothly transition the playbackRate from 1.0 to 0 over 0.15 seconds
      if (videoElement) {
        anime({
          targets: videoElement,
          playbackRate: 0,
          duration: 1, // Duration in milliseconds
          easing: 'linear',
          complete: () => videoElement.pause(), // Pause the video after the animation
        });
      }
      document.body.classList.add('active-modal');
    } else {
      // Restore normal playback speed over 0.15 seconds
      if (videoElement) {
        videoElement.play(); // Resume the video
        anime({
          targets: videoElement,
          playbackRate: 1,
          duration: 1, // Duration in milliseconds
          easing: 'linear',
        });
      }
      document.body.classList.remove('active-modal');

      // Check if modal is closed and reset selectedGame to null
      if (!modal) {
        setSelectedGame(null);
      }
    }
  
    // Cleanup function to reset playbackRate on component unmount
    return () => {
      if (videoElement) {
        videoElement.playbackRate = 1.0; // Restore normal playback rate
      }
    };
  }, [modal, videoContentRef]);

  return (
    <div className="app__header app__flex">
      <div className="app__header-white-screen" style={{  zIndex: fadeInWhiteScreen ? 3 : -3, opacity: fadeInWhiteScreen ? 1 : 0 }} />
      <div className="app__header-video-bg">
        <div className="app__header-content" ref={videoContentRef}>
          <video
            ref={videoRef}
            key={videoSource}
            src={videoSource}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="app__header-video"
            onTimeUpdate={() => {
              const currentVideoRef = videoRef.current;
              if (currentVideoRef) {
                const currentTime = currentVideoRef.currentTime;
                const duration = currentVideoRef.duration;
                // Start preparing the next video 3 seconds before the current video ends
                if (currentTime > duration - 3 && !nextVideoReady) {
                  setNextVideoReady(true);
                }
              }
            }}
          />
          {nextVideoReady && (
            <div className='app__header-videoDetails'>
              <img src={currentVideo.logo} alt={currentVideo.title} className="logo-image" />
              <div className="text-details">
                <p className="subtitle-text">{currentSubtitle}</p>
                <p className="description-text">{currentVideo.shortDescription}</p>
                <button 
                  className="more-info-button" 
                  onClick={() => {
                    setSelectedGame(currentVideo.title);                    
                    toggleMoreInfoModal();
                    toggleModal();
                  }}
                >
                  <img src={images.infoIcon} alt="More Info Logo" className="button-logo" />
                  More Info
                </button>
              </div>
            </div>
          )}
        </div>        
      </div>
      {modal && selectedGame && (
      <div className="app__info-modal">
        <div onClick={() => { 
          toggleModal();
          if (moreInfoModal) {
            toggleMoreInfoModal();
          }          
          }}
          className="overlay">
        </div>        
        {selectedGame === 'Endless Golf' && (<EndlessGolfInfo toggleModal={toggleModal} />)}
        {selectedGame === 'Super Donkey Balls' && (<SuperDonkeyBallsInfo toggleModal={toggleModal} />)}
        {selectedGame === 'Tube Racers' && (<TubeRacersInfo toggleModal={toggleModal} />)}
      </div>
      )}
    </div>
  );
};

export default AppWrap(Header, 'header');