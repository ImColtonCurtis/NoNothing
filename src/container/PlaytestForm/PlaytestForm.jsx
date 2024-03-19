import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants';
import './PlaytestForm.scss';

const PlaytestForm = ({ toggleModal }) => {
  const [playtestFormName, setPlaytestFormName] = useState(sessionStorage.getItem('playtestFormName') || '');  
  const [isValidPlaytestFormName, setValidPlaytestFormName] = useState(true);

  const [playtestFormEmail, setPlaytestFormEmail] = useState(sessionStorage.getItem('playtestFormEmail') || '');  
  const [isValidPlaytestFormEmail, setValidPlaytestFormEmail] = useState(true);

  const [playtestFormFavoriteGame, setPlaytestFormFavoriteGame] = useState(sessionStorage.getItem('playtestFormFavoriteGame') || '');  
  const [isValidPlaytestFormFavoriteGame, setValidPlaytestFormFavoriteGame] = useState(true);

  const [playtestFormExplanation, setPlaytestFormExplanation] = useState(sessionStorage.getItem('playtestFormExplanation') || '');  
  const [isValidPlaytestFormExplanation, setValidPlaytestFormExplanation] = useState(true);

  const [selectedGame, setSelectedGame] = useState(sessionStorage.getItem('selectedGame') || '');
  const [selectedAge, setSelectedAge] = useState(sessionStorage.getItem('selectedAge') || '');
  const [isValidGame, setValidGame] = useState(true);
  const [isValidAge, setValidAge] = useState(true);

  const [isPlaytestFormSubmitted, setPlaytestFormSubmitted] = useState(false);
  
  const handleGameChange = (e) => {
    setSelectedGame(e.target.value);
    setValidGame(true); // Reset validation status when selecting an option
    sessionStorage.setItem('selectedGame', e.target.value);
  };

  const handleAgeChange = (e) => {
    setSelectedAge(e.target.value);
    setValidAge(true); // Reset validation status when selecting an option
    sessionStorage.setItem('selectedAge', e.target.value);
  };

  useEffect(() => {
    // Check sessionStorage to see if the user has submitted an email
    const storedSubmittedStatus = sessionStorage.getItem('isPlaytestFormSubmitted');
    if (storedSubmittedStatus) {
      setPlaytestFormSubmitted(true);
    }
  }, []);

  const handleSubmit = () => {
    // Perform validation logic here
    // Perform email validation
    const isNameValid = validatePlaytestFormName(playtestFormName);
    const isEmailValid = validatePlaytestFormEmail(playtestFormEmail);
    const isFavoriteGameValid = validatePlaytestFormFavoriteGame(playtestFormFavoriteGame);
    const isExplanationValid = validatePlaytestFormExplanation(playtestFormExplanation);

    // Validate selectedGame
    const isGameSelected = !!selectedGame;
    setValidGame(isGameSelected);

    // Validate selectedAge
    const isAgeSelected = !!selectedAge;
    setValidAge(isAgeSelected);

    if (isNameValid)
      setValidPlaytestFormName(true);
    else
      setValidPlaytestFormName(false);

    if (isEmailValid)
      setValidPlaytestFormEmail(true);
    else
      setValidPlaytestFormEmail(false);

    if (isFavoriteGameValid)
      setValidPlaytestFormFavoriteGame(true);
    else
      setValidPlaytestFormFavoriteGame(false);

    if (isExplanationValid)
      setValidPlaytestFormExplanation(true);
    else
      setValidPlaytestFormExplanation(false);

    if (isGameSelected  && isNameValid && isEmailValid && isAgeSelected && isFavoriteGameValid && isExplanationValid) {
      setPlaytestFormSubmitted(true);

      // Store the submitted status in sessionStorage
      sessionStorage.setItem('isPlaytestFormSubmitted', 'true');
    }
  };

  const validatePlaytestFormName = (playtestFormName) => {
    // Check if the name is not empty
    if (!playtestFormName.trim()) {
      return false;
    }

    // Check if the name contains only letters and spaces
    const nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
    if (!nameRegex.test(playtestFormName)) {
      return false;
    }

    // Check if the name has a minimum and maximum length
    const minLength = 2;
    const maxLength = 50;
    if (playtestFormName.length < minLength || playtestFormName.length > maxLength) {
      return false;
    }

    // Check if there are no consecutive spaces
    if (/(\s{2,})/.test(playtestFormName)) {
      return false;
    }

    // Check if the name doesn't start or end with a space
    if (playtestFormName.startsWith(' ') || playtestFormName.endsWith(' ')) {
      return false;
    }
  
    return true;
  };

  const validatePlaytestFormEmail = (playtestFormEmail) => {
    // Basic email validation (contains '@' symbol and '.')
    if (!playtestFormEmail.includes('@') || !playtestFormEmail.includes('.')) {
      return false;
    }
  
    // Check for a valid position of '@'
    if (playtestFormEmail.indexOf('@') <= 0) {
      return false;
    }
  
    // Check for consecutive dots
    if (/(\.{2,})/.test(playtestFormEmail)) {
      return false;
    }
  
    // Check if the domain has at least one '.' after '@'
    const domainParts = playtestFormEmail.split('@')[1].split('.');
    if (domainParts.length < 2) {
      return false;
    }
  
    return true;
  };

  const validatePlaytestFormFavoriteGame = (playtestFormFavoriteGame) => {
    // Check if the name is not empty
    if (!playtestFormFavoriteGame.trim()) {
      return false;
    }
  
    return true;
  };

  const validatePlaytestFormExplanation = (playtestFormExplanation) => {
    // Check if the name is not empty
    if (!playtestFormExplanation.trim()) {
      return false;
    }
  
    return true;
  };
  
  return (
    <motion.div 
      className="app__playtestForm app__flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >      
      <div className="app__playtestForm-container">
        <div className="app__playtestForm-content">
          {!isPlaytestFormSubmitted ? (
            <motion.div
              className="app__playtestForm-box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h1>Playtester Application</h1>
              <div className="custom-dropdown top-dropdown">
                <select 
                  value={selectedGame} 
                  onChange={handleGameChange}
                  style={{ 
                    borderColor: selectedGame.trim() ? (isValidGame ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                  }}
                >
                  <option value="" disabled>
                    Select A Game
                  </option>
                  <option value="Endless Golf">Endless Golf</option>
                  <option value="Tube Racers">Tube Racers</option>
                  <option value="Super Donkey Balls">Super Donkey Balls</option>
                </select>
                <div className="form-dropdown-icon">
                  <img src={images.dropDownTriangle} alt="dropdown triangle" />
                </div>
              </div>
              <input
                type="text"
                placeholder="Your Full Name"
                value={playtestFormName}
                onChange={(e) => {
                  setPlaytestFormName(e.target.value);
                  setValidPlaytestFormName(true); // Reset validation status when typing
                  sessionStorage.setItem('playtestFormName', e.target.value);
                }}
                style={{ 
                  borderColor: playtestFormName.trim() ? (isValidPlaytestFormName ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                }}
              />
              <input
                type="text"
                placeholder="Your Email"
                value={playtestFormEmail}
                onChange={(e) => {
                  setPlaytestFormEmail(e.target.value);
                  setValidPlaytestFormEmail(true); // Reset validation status when typing
                  sessionStorage.setItem('playtestFormEmail', e.target.value);
                }}
                style={{ 
                  borderColor: playtestFormEmail.trim() ? (isValidPlaytestFormEmail ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                }}
              />
              <div className="custom-dropdown">
                <select 
                  value={selectedAge} 
                  onChange={handleAgeChange} 
                  style={{ 
                    borderColor: selectedAge.trim() ? (isValidAge ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                  }}
                >
                  <option value="" disabled>
                    What Is Your Age?
                  </option>
                  <option value="Under 18">Under 18 years old</option>
                  <option value="18 to 29">18 - 29 years old</option>
                  <option value="30 to 39">30 - 39 years old</option>
                  <option value="40 to 49">40 - 49 years old</option>
                  <option value="Over 50">50+ years old</option>                  
                </select>
                <div className="form-dropdown-icon">
                  <img src={images.dropDownTriangle} alt="dropdown triangle" />
                </div>
              </div>
              <input
                type="text"
                placeholder="What Is Your Favorite Game? Why?"
                value={playtestFormFavoriteGame}
                onChange={(e) => {
                  setPlaytestFormFavoriteGame(e.target.value);
                  setValidPlaytestFormFavoriteGame(true); // Reset validation status when typing
                  sessionStorage.setItem('playtestFormFavoriteGame', e.target.value);
                }}
                className="input-textarea" // Apply the class here
                style={{ 
                  borderColor: playtestFormFavoriteGame.trim() ? (isValidPlaytestFormFavoriteGame ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                }}
              />
              <input
                type="text"
                placeholder="Why Do You Want To Be A Playtester?"
                className="bottom-field"
                value={playtestFormExplanation}
                onChange={(e) => {
                  setPlaytestFormExplanation(e.target.value);
                  setValidPlaytestFormExplanation(true); // Reset validation status when typing
                  sessionStorage.setItem('playtestFormExplanation', e.target.value);
                }}
                style={{ 
                  borderColor: playtestFormExplanation.trim() ? (isValidPlaytestFormExplanation ? 'initial' : 'red') : 'rgba(255, 255, 255, 0.5)', 
                }}                
              />

              <button
                onClick={handleSubmit}
                style={{
                  cursor: selectedGame && isValidGame && playtestFormName && isValidPlaytestFormName && playtestFormEmail && isValidPlaytestFormEmail && selectedAge && isValidAge && playtestFormFavoriteGame && isValidPlaytestFormFavoriteGame && playtestFormExplanation && isValidPlaytestFormExplanation ? 'pointer' : 'not-allowed',
                }}
                disabled={!selectedGame || !isValidGame || !playtestFormName || !isValidPlaytestFormName || !playtestFormEmail || !isValidPlaytestFormEmail || !selectedAge || !isValidAge || !playtestFormFavoriteGame || !isValidPlaytestFormFavoriteGame || !playtestFormExplanation || !isValidPlaytestFormExplanation}
              >
                {'Submit Form'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="form-submitted-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              Application Submitted.
            </motion.div>
          )}
        </div>
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
  );
};

export default PlaytestForm;
