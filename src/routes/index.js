import { BrowserRouter, Route, withRouter } from "react-router-dom";

import { Home } from "../pages/Home/index";
import { Products } from "../pages/Products";
import { Switch } from "react-router-dom";

const Routes = () => {
  return (
    <section className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/products" component={withRouter(Products)} />

          <Route exact path="/products/:id" component={withRouter(Products)} />
        </Switch>
      </BrowserRouter>
    </section>
  );
};

export default Routes;
