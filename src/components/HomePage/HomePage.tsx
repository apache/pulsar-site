import React from 'react';

import Announcement from '../shared/Announcement/Announcements';
import Footer from '../shared/Footer/Footer';
import Header from '../shared/Header/Header';
import Features from './Features/Features';
import ShortInfo from './ShortInfo/ShortInfo';
import Users from './Users/Users';

import s from './HomePage.module.css';

const HomePage = () => {

  return (
    <div className={s.block}>
      <Announcement />
      <Header />
      <ShortInfo />
      <Features />
      <Users />
      <Footer />
    </div>
  )
}

export default HomePage