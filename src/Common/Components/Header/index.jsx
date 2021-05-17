import React from 'react';
import { Layout } from 'antd';

import SearchBox from '../SearchBox';

import styles from './Header.module.scss';
import variables from '../../variables.module.scss';

import logo from '../../../Assets/tekion_logo.png';

const {
  Header: HeaderAntd,
} = Layout;

export default function Header() {
  return (
    <HeaderAntd style={{ background: variables.white, height: '5rem' }} className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <SearchBox />
    </HeaderAntd>
  );
}
