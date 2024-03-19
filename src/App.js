import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer, Header, About, Work, Playtest, PlaytestForm, Press, Support, SupportForm, Contact, ContactForm, Privacy, Terms, EndlessGolfInfo, SuperDonkeyBallsInfo, TubeRacersInfo } from './container';
import { Navbar } from './components';
import './App.scss';

// Create a functional component for the home page
const HomePage = ({ toggleModal, modal, toggleMoreInfoModal, moreInfoModal }) => {
  useEffect(() => {
    console.log('HomePage component mounted with props:', { toggleModal, modal, toggleMoreInfoModal, moreInfoModal });
  }, [toggleModal, modal, toggleMoreInfoModal, moreInfoModal]);

  return (
    <div>
      <Header toggleModal={toggleModal} modal={modal} toggleMoreInfoModal={toggleMoreInfoModal} moreInfoModal={moreInfoModal}/>
      <Work toggleModal={toggleModal} modal={modal} toggleMoreInfoModal={toggleMoreInfoModal} moreInfoModal={moreInfoModal}/>
    </div>
  );
};

const App = () => {
  const [modal, setModal] = useState(false);
  const [moreInfoModal, setMoreInfoModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

  const toggleMoreInfoModal= () => {
    setMoreInfoModal(!moreInfoModal);
  }

  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>No Nothing</title>
        <link rel="canonical" href="http://nonothing.net/" />
        <meta name="description" content="No Nothing Official Website" />
      </Helmet>

      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage toggleModal={toggleModal} modal={modal} toggleMoreInfoModal={toggleMoreInfoModal} moreInfoModal={moreInfoModal}/>} />
          <Route path="/work" element={<Work toggleModal={toggleModal} modal={modal} toggleMoreInfoModal={toggleMoreInfoModal} moreInfoModal={moreInfoModal}/>} />
          <Route path="/playtest" element={<Playtest />} />
          <Route path="/playtest-form" element={<PlaytestForm />} />
          <Route path="/press" element={<Press />} />
          <Route path="/support" element={<Support />} />
          <Route path="/support-form" element={<SupportForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-form" element={<ContactForm />} />
          
          <Route path="/endlessGolf-info" element={<EndlessGolfInfo  toggleModal={toggleModal}/>} />          
          <Route path="/superDonkeyBalls-info" element={<SuperDonkeyBallsInfo  toggleModal={toggleModal}/>} />          
          <Route path="/tubeRacers-info" element={<TubeRacersInfo  toggleModal={toggleModal}/>} />

          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<Privacy />} />          
          <Route path="/terms-of-use" element={<Terms />} />

          {/* Fallback route */}
          <Route path="*" element={<HomePage toggleModal={toggleModal} modal={modal} toggleMoreInfoModal={toggleMoreInfoModal} moreInfoModal={moreInfoModal}/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
