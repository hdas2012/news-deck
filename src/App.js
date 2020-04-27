import React from "react";
import "./styles.scss";
import { Route, Switch } from "react-router-dom";
import NewsComponent from "./components/news/NewsComponent";
import NavBarComponent from "./components/common/NavBarComponent";

export default class App extends React.Component {
  render() {
    return (
      <main>
        <NavBarComponent />
        <Switch>
          <Route
            path="/:newsType?"
            component={props => (
              <NewsComponent {...props} key={window.location.pathname} />
            )}
          />
        </Switch>
      </main>
    );
  }
}
