import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { images, videos } from '../../constants';
import { EndlessGolfInfo, SuperDonkeyBallsInfo, TubeRacersInfo } from '../../container';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Work.scss';

const Work = ({ toggleModal, modal, toggleMoreInfoModal, moreInfoModal }) => {
  const [filterWork, setFilterWork] = useState([]);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [selectedPlatform, setSelectedPlatform] = useState('Platforms');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleWorkFilter = useCallback((item) => {
    setSelectedPlatform(item);
    setShowDropdown(false);

    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'Platforms') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  }, [setSelectedPlatform, setShowDropdown, setAnimateCard, setFilterWork]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    handleWorkFilter('Platforms');

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleWorkFilter, dropdownRef]);

  const videoRefs = useRef({}); // Object to store video refs

  useEffect(() => {
    // Pause all videos when modal is open
    if (modal) {
      Object.values(videoRefs.current).forEach((videoRef) => {
        if (videoRef?.current) {
          videoRef.current.pause();
        }
      });
    } else {
      Object.values(videoRefs.current).forEach((videoRef) => {
        if (videoRef?.current) {
          videoRef.current.play();
        }
      });
    }
    // Check if modal is closed and reset selectedGame to null
    if (!modal) {
      setSelectedGame(null);
    }
  }, [modal]);

  useEffect(() => {
    // Assign refs when the component mounts
    setFilterWork(works);
    videoRefs.current = works.reduce((acc, work) => {
      acc[work.title] = React.createRef();
      return acc;
    }, {});
  }, []); // Empty dependency array ensures this runs only once on mount

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleItemClick = (work) => {
    setSelectedGame(work.title);
    toggleModal();
  };

  const handleHover = (title) => {
    return modal && !moreInfoModal && selectedGame === title ? 'hover-active' : '';
  };

  const dropdownWidth = Math.max(...['Platforms', 'All', 'PC/Mac', 'Console', 'Mobile'].map((item) => item.length)) * 10;

  return (
    <>
      <div className="app__work-header app__flex">
        <h2 className="header-text">Our Games</h2>
        <div className="app__work-dropdown" ref={dropdownRef}>
          <div className="app__work-selected" onClick={toggleDropdown}>
            {selectedPlatform}
            <div className="dropdown-icon">
              <img src={images.dropDownTriangle} alt="dropdown triangle" />
            </div>
          </div>
          {showDropdown && (
            <div className="app__work-options" style={{ width: dropdownWidth, minWidth: '100px' }}>
              <div onClick={() => handleWorkFilter('All')}>All</div>
              <div onClick={() => handleWorkFilter('PC/Mac')}>PC/Mac</div>
              <div onClick={() => handleWorkFilter('Console')}>Console</div>
              <div onClick={() => handleWorkFilter('Mobile')}>Mobile</div>
            </div>
          )}
        </div>
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.3, delayChildren: 0.3 }}
        className={`app__work-portfolio`}
      >
        {filterWork.map((work, index) => (
          <div
            className={`app__work-item app__flex ${handleHover(work.title)}`}
            key={index}
          >
            <div onClick={() => handleItemClick(work)}>
              <div className="app__work-vid app__flex">
                <video
                  ref={videoRefs.current[work.title]}
                  src={work.vidURL}
                  autoPlay
                  loop
                  muted
                  playsInline
                  alt={work.title}
                />
                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.3 }}
                  className={`app__work-hover app__flex`}
                ></motion.div>
                <div className="info-icon">
                  <img src={images.infoIcon} alt="Info Icon" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
      {modal && selectedGame && (
        <div className="app__info-modal">
          <div
            onClick={() => {
              toggleModal();
              if (moreInfoModal) {
                toggleMoreInfoModal();
              }
            }}
            className="overlay"
          ></div>
          {selectedGame === 'Super Donkey Balls' && (
            <SuperDonkeyBallsInfo toggleModal={toggleModal} />
          )}
          {selectedGame === 'Endless Golf' && (
            <EndlessGolfInfo toggleModal={toggleModal} />
          )}
          {selectedGame === 'Tube Racers' && (
            <TubeRacersInfo toggleModal={toggleModal} />
          )}
        </div>
      )}
    </>
  );
};

const works = [
  { title: 'Endless Golf', vidURL: videos.endlessGolfThumbnail, tags: ['PC/Mac', 'Console', 'Mobile', 'All'] },
  { title: 'Super Donkey Balls', vidURL: videos.superDonleyBallsThumbnail, tags: ['PC/Mac', 'Console', 'All'] },
  { title: 'Tube Racers', vidURL: videos.tubeRacersThumbnail, tags: ['PC/Mac', 'Console', 'Mobile', 'All'] },
];

export default AppWrap(MotionWrap(Work, 'app__works'), 'work', 'app__darkGraybg');
