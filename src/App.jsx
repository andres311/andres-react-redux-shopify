import React, { useEffect } from 'react';
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import {  useDispatch } from 'react-redux';

//pages
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

//components
import Cart from './components/shared/Cart';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import ProductQuickView from './components/shared/ProductQuickView';

//ShopifyProvider
import ShopifyProvider from './services/ShopifyBuyManager';

//redux
import { setCheckout } from './redux';

const debug = process.env.NODE_ENV === 'production' ? void 0 : new DebugEngine();

const engine = new Styletron();

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const createCheckout = async () => {
      const res = await ShopifyProvider.createCheckout();
      Cookies.set('checkout', res);
      dispatch(setCheckout(res));
    };
    createCheckout();
  }, [dispatch]);

  return (
    <>
      <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <Router>
          <Navbar />
          <Cart />
          <ProductQuickView />
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/product/:id" component={ProductDetail} />
            <Route path="*" status={404} />
          </Switch>
          <Footer />
        </Router>
      </StyletronProvider>
    </>
  );
};

export default App;