import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import ProductListPage from '../ProductListPage';
import Header from '../../Common/Components/Header';
import Fallback from '../../Common/Components/Fallback';

import { ERROR_STATES } from '../../Common/constants';

import styles from './Main.module.scss';

export default function Main() {
  return (
    <Layout className={styles.layout}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/products" />
          </Route>
          <Route path="/products">
            <ProductListPage />
          </Route>
          <Route>
            <Fallback state={ERROR_STATES.NOT_FOUND} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}
