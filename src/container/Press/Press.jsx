import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { images, videos } from '../../constants';
import './Press.scss';

const Press = () => {
  const [filterGames, setFilterGames] = useState([]);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [selectedPlatform, setSelectedPlatform] = useState('Platforms');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    // Set scroll position to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    handleGamesFilter('Platforms');
  }, []);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  const videoRefs = useRef({}); // Object to store video refs

  const handleGamesFilter = (item) => {
    setSelectedPlatform(item);
    setShowDropdown(false);

    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'Platforms') {
        setFilterGames(games);
      } else {
        setFilterGames(games.filter((game) => game.tags.includes(item)));
      }
    }, 500);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (game) => {
    setSelectedGame(game.title);

    // Add logic to initiate the download when a game is clicked
    const downloadLink = document.createElement('a');
    downloadLink.href = game.filePath;
    downloadLink.download = `${game.title}_Presskit.zip`;
    downloadLink.click();
  };

  const games = [    
    { title: 'Endless_Golf', vidURL: videos.endlessGolfThumbnail, tags: ['PC/Mac', 'Console', 'Mobile', 'All'], filePath: '/presskits/Endless_Golf.zip' },
    { title: 'Super_Donkey_Balls', vidURL: videos.superDonleyBallsThumbnail, tags: ['PC/Mac', 'Console', 'All'], filePath: '/presskits/Super_Donkey_Balls.zip' },
    { title: 'Tube_Racers', vidURL: videos.tubeRacersThumbnail, tags: ['PC/Mac', 'Console', 'Mobile', 'All'], filePath: '/presskits/Tube_Racers.zip' },
  ];

  const dropdownWidth = Math.max(...['Platforms', 'All', 'PC/Mac', 'Console', 'Mobile'].map(item => item.length)) * 10;

  return (
    <div className="app__press app_flex">
      <div className="app__press-header">
        <div className="app__press-video-player">
          <video 
            src={videos.pressHeader}
            autoPlay
            muted
            playsInline
            loop
            alt="Playtest Header" 
          />
        </div>
      </div>
      <div className="app__press-content-bg">
        <div className="app__press-content-1">
          <div className="app__press-section">
          <h1>Download <span>our</span></h1>
          <h4>Press Kits</h4>
          </div>          
          <div>
            <div className="app__press-games-header app__flex">
              <h2 className="header-text">Our Games</h2>
              <div className="app__press-dropdown" ref={dropdownRef}>
                <div className="app__press-selected" onClick={toggleDropdown}>
                  {selectedPlatform}
                  <div className="dropdown-icon">
                    <img src={images.dropDownTriangle} alt="dropdown triangle" />
                  </div>
                </div>
                {showDropdown && (
                <div className="app__press-options" style={{ width: dropdownWidth, minWidth: '100px' }}>
                  <div onClick={() => handleGamesFilter('All')}>All</div>
                  <div onClick={() => handleGamesFilter('PC/Mac')}>PC/Mac</div>
                  <div onClick={() => handleGamesFilter('Console')}>Console</div>
                  <div onClick={() => handleGamesFilter('Mobile')}>Mobile</div>
                </div>
                )}
              </div>
            </div>
            <motion.div
              animate={animateCard}
              transition={{ duration: 0.3, delayChildren: 0.3 }}
              className={`app__press-portfolio`}
            >
              {filterGames.map((game, index) => (
              <div
                className={`app__press-item app__flex`}
                key={index}
              >
                <div onClick={() => handleItemClick(game)}>
                  <div className="app__press-vid app__flex">
                    <video
                      ref={videoRefs.current[game.title]}
                      src={game.vidURL}
                      autoPlay
                      loop
                      muted
                      playsInline
                      alt={game.title}
                    />
                    <motion.div
                      whileHover={{ opacity: [0, 1] }}
                      transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.3 }}
                      className={`app__press-hover app__flex`}
                    />
                    <div className="download-icon">
                      <img src={images.downloadIcon} alt="Info Icon" />
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>  
      <div className="bottom-tag">
        <h3>
          For information and assistance regarding our games please contact press@nonothing.net
        </h3>
      </div>
    </div>
  );
};

export default Press