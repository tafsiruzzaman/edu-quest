import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home/Home';
import SignIn from './pages/Registration/SignIn/SignIn';
import AuthProvider from './contexts/AuthProvider';
import RegistrationRoute from './PrivateRoutes/RegistrationRoute/RegistrationRoute';
import GeneralRoute from './PrivateRoutes/GeneralRoute/GeneralRoute';
import NotFound from './pages/NotFound/NotFound';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import NewQuiz from './pages/Dashboard/NewQuiz/NewQuiz';
import Quiz from './pages/Quiz/Quiz/Quiz';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/quiz/:id">
              <Quiz></Quiz>
            </Route>
            <GeneralRoute path="/dashboard">
              <Dashboard></Dashboard>
            </GeneralRoute>
            <GeneralRoute path="/dashboard">
              <NewQuiz></NewQuiz>
            </GeneralRoute>
            <RegistrationRoute path="/signin">
              <SignIn></SignIn>
            </RegistrationRoute>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
