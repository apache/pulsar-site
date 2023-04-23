import React, { useState } from 'react';

import LinkButton from '../../../components/LinkButton/LinkButton';
import Input from '../../../components/Input/Input';

import Logo from './pictures/logo.svg';
import Hamburger from './pictures/hamburger.svg';
import Close from './pictures/close.svg';

import s from './Header.module.css';

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={s.block} style={{ height: isOpen ? '100vh' : 'auto' }}>
      <div className={s.container}>
        <div className={s.TODO_CHANGE_ME_1}>
          <Logo className={s.logo} />
          {isOpen
            ? <Close onClick={() => setIsOpen(false)} className={s.menu_button} />
            : <Hamburger onClick={() => setIsOpen(true)} className={s.menu_button} />
          }
        </div>
        <div className={`${s.navbar} ${isOpen && s.show}`}>
          <div className={s.auxiliary} />
          <div className={s.links}>
            <a href='./'> Get started </a>
            <a href='./'> Docs </a>
            <a href='./'> Contribute </a>
            <a href='./'> Community </a>
            <a href='./'> Learn </a>
          </div>

          <div className={s.functionality}>
            <Input placeholder='Search' />
            
            <LinkButton
              link='./'
              title='Download'
              filled={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;