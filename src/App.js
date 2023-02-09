import {  Redirect, Route,Switch } from "react-router-dom";
import NoJokesFound from "./components/jokes/NoJokesFound";

import Layout from "./components/layout/Layout";
import JokeDetails from "./components/pages/JokeDetails";
import Jokes from "./components/pages/Jokes";
import NewJoke from "./components/pages/NewJoke";



function App() {
  return (
<Layout>
  <Switch>
    <Route path="/" exact >
    <Redirect to="/jokes"/>
    </Route>
    <Route path="/jokes" exact >
    <Jokes/>
    </Route>
    <Route path="/jokes/:jokesList">
    <JokeDetails/>
    </Route>
    <Route path="/newjoke" >
    <NewJoke/>
    </Route>
    <Route path="*" >
    <NoJokesFound />
    </Route>
  </Switch>
</Layout>
  )
}

export default App;
