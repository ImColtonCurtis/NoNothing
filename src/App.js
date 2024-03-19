import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer, Header, About, Work, Playtest, PlaytestForm, Press, Support, SupportForm, Contact, ContactForm, Privacy, Terms, SuperDonkeyBallsInfo } from './container';
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
          <Route path="/NoNothing" element={<HomePage toggleModal={toggleModal} modal={modal} toggleMoreInfoModal={toggleMoreInfoModal} moreInfoModal={moreInfoModal}/>} />
          <Route path="/NoNothing/work" element={<Work toggleModal={toggleModal} modal={modal} toggleMoreInfoModal={toggleMoreInfoModal} moreInfoModal={moreInfoModal}/>} />
          <Route path="/NoNothing/playtest" element={<Playtest />} />
          <Route path="/NoNothing/playtest-form" element={<PlaytestForm />} />
          <Route path="/NoNothing/press" element={<Press />} />
          <Route path="/NoNothing/support" element={<Support />} />
          <Route path="/NoNothing/support-form" element={<SupportForm />} />
          <Route path="/NoNothing/contact" element={<Contact />} />
          <Route path="/NoNothing/contact-form" element={<ContactForm />} />
          
          <Route path="/NoNothing/superdonkeyballs-info" element={<SuperDonkeyBallsInfo  toggleModal={toggleModal}/>} />

          <Route path="/NoNothing/about" element={<About />} />
          <Route path="/NoNothing/privacy-policy" element={<Privacy />} />          
          <Route path="/NoNothing/terms-of-use" element={<Terms />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
