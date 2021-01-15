import logo from './logo.svg';
import './App.css';
import fgb from './img/ferretbg.jpg'

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <img src={fgb}></img>
          <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
