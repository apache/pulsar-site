import React from 'react';

import LinkButton from '../LinkButton/LinkButton';
import Input from '../Input/Input';

import Logo from './pictures/logo.svg';

import s from './Header.module.css';

const Header = () => {

  return (
    <div className={s.block}>
      <div className={s.container}>
        {/* <svg > */}
          <Logo className={s.logo} />
        {/* </svg> */}

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
  )
}

export default Header;