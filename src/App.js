import React from 'react';
import {Container} from "reactstrap"
import Navi from  "./components/Navi/Navi"
import Dashboard from  "./components/Root/Dashboard"
import { Route, Switch } from "react-router-dom";
import AddItem from "./components/Items/AddItem";

function App() {
  return (
      <Container>
        <Navi/>
        <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/addItem"  component={AddItem} />
        </Switch>
      </Container>
  );
}

export default App;
