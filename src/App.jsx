import React from 'react';
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//pages
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

//components
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Footer from './components/Footer';

const debug = process.env.NODE_ENV === 'production' ? void 0 : new DebugEngine();

const engine = new Styletron();

const App = () => {
  return (
    <>
      <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <Router>
          <Navbar />
          <Cart />
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/product/:id" component={ProductDetail} />
            <Route path="*" status={404} />
          </Switch>
          <Signup />
          <Footer />
        </Router>
      </StyletronProvider>
    </>
  );
};

export default App;