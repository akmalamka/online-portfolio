import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Page from './components/Page';
import { Provider } from 'react-redux';
import store from 'redux-toolkit/store';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Page>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Page>
    </Provider>
  );
};

export default App;
