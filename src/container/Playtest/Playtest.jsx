import React, { useState, useEffect } from 'react';
import { images, videos } from '../../constants';
import { PlaytestForm } from '../../container';
import './Playtest.scss';

const Playtest = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

  useEffect(() => {
    // Set scroll position to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {  
    if (modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [modal]);

  return (
    <div className="app__playtest app_flex">
      <div className="app__playtest-header">
        <div className="app__playtest-video-player">
          <video 
            src={videos.playtestHeader}
            autoPlay
            muted
            playsInline
            loop
            alt="Playtest Header" 
          />
        </div>
      </div>
      <div className="app__playtest-content-bg">
        <div className="app__playtest-content-1">
          <div className="app__playtest-section">
            <h1>Join <span>the</span></h1>
            <h4>Gaming Adventure</h4>
            <div className="app__playtest-section-paragraph">
              <p className="app__playtest-blurb">
              Calling all gaming enthusiasts! Join our global community to playtest our diverse range of games from the comfort of your own home.
              </p>
              <p className="app__playtest-blurb">
                Dive into the No Nothing playtesting experience, where you'll immerse yourself in unreleased content and leave an indelible mark on the game. Selected playtesters are invited to shape the adventure by signing up today, subject to a non-disclosure agreement.
              </p>
            </div>
          </div>          
        </div>
      </div>
      <div className="app__playtest-content-bg">
        <div className="app__playtest-content-2">
          <div className="app__playtest-section">
            <h2>Get Started with:</h2>
            <div className="app__playtest-section-paragraph">
              <ul>
                <li>A Passion for Gaming</li>
                <li>Proficiency in English Reading and Writing</li>
                <li>Dedicate at Least 1 Full Day to Remote Playtesting</li>
                <li>Ability to Provide Clear and Concise Feedback</li>
                <li>Commitment to a Non-Disclosure Agreement</li>
              </ul>
            </div>
            <button 
              className="app__playtest-button" 
              onClick={() => {
                toggleModal();
              }}
            >
              <img src={images.playIcon} alt="More Info Logo" className="button-logo" />
              PLAY NOW
            </button>
          </div>
        </div>
      </div>
      <div className="app__playtest-content-bg">
        <div className="app__playtest-content-3">
          <div className="app__playtest-faq">
            <h5>FAQ</h5>
            <h2>How the Magic Happens</h2>
            <div className="app__playtest-faq-content">
              <div className="app__playtest-faq-groups">
                <div className="app__playtest-faq-container">
                  <h3>
                    <img className="faq-icon" src={images.messageIcon} alt="Message Icon" />
                    Will I Receive Compensation?
                  </h3>
                  <p className="app__playtest-faq-answers">
                    Absolutely! Rewards for participating in playtests vary based on the duration and can include cash, gift cards, game keys, and exclusive merchandise. Find the details in your confirmation email.
                  </p>
                </div>
              </div>
              <div className="app__playtest-faq-line"> </div>
              <div className="app__playtest-faq-groups">                
                <div className="app__playtest-faq-container">
                  <h3>
                    <img className="faq-icon" src={images.messageIcon} alt="Message Icon" />
                    Am I Eligible to Sign Up?
                  </h3>
                  <p className="app__playtest-faq-answers">
                    We're seeking players of all backgrounds, abilities, and skill levels. No prior experience needed.
                  </p>
                </div>
              </div>              
              <div className="app__playtest-faq-line"> </div>
              <div className="app__playtest-faq-groups">                
                <div className="app__playtest-faq-container">
                  <h3>
                    <img className="faq-icon" src={images.messageIcon} alt="Message Icon" />
                    Are There Any Age Restrictions to Participate?
                  </h3>
                  <p className="app__playtest-faq-answers">
                    Yes. Participants must be 18 years or older.
                  </p>
                </div>
              </div>              
              <div className="app__playtest-faq-line"> </div>
              <div className="app__playtest-faq-groups">                
                <div className="app__playtest-faq-container">
                  <h3>
                    <img className="faq-icon" src={images.messageIcon} alt="Message Icon" />
                    I've Signed Up—What's Next?
                  </h3>
                  <p className="app__playtest-faq-answers">
                    Thanks for applying! Every application is carefully reviewed, and we'll be in touch when there's a test that suits your profile.
                  </p>
                </div>
              </div>
              <div className="app__playtest-faq-line"> </div>
              <div className="app__playtest-faq-groups">                
                <div className="app__playtest-faq-container">
                  <h3>
                  <img className="faq-icon" src={images.messageIcon} alt="Message Icon" />
                  How Do You Choose Playtesters?
                  </h3>
                  <p className="app__playtest-faq-answers">
                    Playtesters are selected based on the specific content we're seeking feedback on. Once decided, we reach out to applicants who align with our desired profile for the playtest, providing all necessary details for a successful experience.
                  </p>
                </div>
              </div>
              <div className="app__playtest-faq-line"> </div>
              <div className="app__playtest-faq-groups">                
                <div className="app__playtest-faq-container">
                  <h3>
                    <img className="faq-icon" src={images.messageIcon} alt="Message Icon" />
                    What Happens to My Submitted Information?
                  </h3>
                  <p className="app__playtest-faq-answers">
                    Your application details are used solely to build our playtester groups and are not shared with third parties or retained without your consent.
                  </p>
                </div>
              </div>
              <div className="app__playtest-faq-line"> </div>
              <div className="app__playtest-faq-groups">                
                <div className="app__playtest-faq-container">
                  <h3>
                    <img className="faq-icon" src={images.messageIcon} alt="Message Icon" />
                    I've Been Chosen For a Playtest! What's Next?
                  </h3>
                  <p className="app__playtest-faq-answers">
                    After validating your profile, you'll receive detailed instructions on when and how to participate in the upcoming playtest.
                  </p>
                </div>
              </div>
              <div className="app__playtest-faq-line"> </div>
              <div className="app__playtest-faq-groups">                
                <div className="app__playtest-faq-container">
                  <h3>
                    <img className="faq-icon" src={images.messageIcon} alt="Message Icon" />
                    Will I Need to Sign an NDA?
                  </h3>
                  <p className="app__playtest-faq-answers">
                    Yes. A Non-Disclosure Agreement (NDA) is a vital contract ensuring the confidentiality of shared information during our interactions.
                  </p>
                </div>
              </div>
              <div className="app__playtest-faq-line"> </div>
              <div className="app__playtest-faq-groups">                
                <div className="app__playtest-faq-container">
                  <h3>
                    <img className="faq-icon" src={images.messageIcon} alt="Message Icon" />
                    Is Playtesting a Job?
                  </h3>
                  <p className="app__playtest-faq-answers">
                    Distinct from QA Testing, playtesting is not a professional role at No Nothing. Join for the love of gaming and contributing to an unparalleled gaming experience!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-tag">
        <h3>
          For information and assistance regarding playtesting please contact playtest@nonothing.net
        </h3>
      </div>
      {modal && (
        <div>
          <div onClick={toggleModal} className="form-overlay"></div>
          <PlaytestForm toggleModal={toggleModal} />
        </div>
      )}
    </div>
  );
};

export default Playtest;
