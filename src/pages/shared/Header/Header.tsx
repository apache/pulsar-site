import React, { useState } from 'react';

import LinkButton from '../../../components/LinkButton/LinkButton';
import Input from '../../../components/Input/Input';
import Link from '../../../components/Link/Link';

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
          <a href='./'>
            <Logo className={s.logo} />
          </a>
          {isOpen
            ? <Close onClick={() => setIsOpen(false)} className={s.menu_button} />
            : <Hamburger onClick={() => setIsOpen(true)} className={s.menu_button} />
          }
        </div>
        <div className={`${s.navbar} ${isOpen && s.show}`}>
          <div className={s.auxiliary} />
          <div className={s.links}>
            <Link href='./' text='Get started' />
            <Link href='./' text='Docs' />
            <Link href='./' text='Contribute' />
            <Link href='./' text='Community' />
            <Link href='./' text='Learn' />
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