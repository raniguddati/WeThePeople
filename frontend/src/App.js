import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BrowsePage from './BrowsePage';
import ProjectDetailsPage from './ProjectDetailsPage';
import CreateProjectPage from './CreateProjectPage';
import UserProfilePage from './UserProfilePage';
import Navbar from './Navbar';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact component={HomePage} />
        {/* <Route path="/browse" component={BrowsePage} />
        <Route path="/project/:id" component={ProjectDetailsPage} />
        <Route path="/create-project" component={CreateProjectPage} />
        <Route path="/profile" component={UserProfilePage} /> */}
      </Routes>
    </Router>
  );
}

export default App;
