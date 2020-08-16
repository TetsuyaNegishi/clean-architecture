import React, {useEffect} from 'react';
import { useObserver } from "mobx-react-lite"
import logo from './logo.svg';
import './App.css';
import { Provider, StoreContext, UsecaseContext } from './Provider'

function App() {
  const store = React.useContext(StoreContext)
  const usecase = React.useContext(UsecaseContext)

  useEffect(() => {
    usecase.fetch();
  }, [usecase])

  return useObserver(() => (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {store.text && <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {store.text}
        </a>}
      </header>
    </div>
  ));
}

export default () => <Provider><App /></Provider>;
