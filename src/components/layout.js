import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

import './layout.css';
// Fort AwesomeのCSSを読み込み
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
// Fort Awesomeのコンポーネント内でCSSを適応しないようにする設定
config.autoAddCss = false;

const Layout = ({ children }) => (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
);

export default Layout;
