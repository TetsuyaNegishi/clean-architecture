import React, {useEffect} from 'react';
import { useObserver } from "mobx-react-lite"
import logo from './logo.svg';
import './App.css';
import {TestDriver} from './lib/driver/test';
import {TestGateway} from './lib/gateway/test';
import {TestUsecase} from './lib/usecase/test'
import {TestStore} from './lib/store/test';

const store = new TestStore();
const driver = new TestDriver();
const gateway = new TestGateway(driver);
const usecase = new TestUsecase(gateway, store);

const StoreContext = React.createContext<TestStore>({} as TestStore);
const UsecaseContext = React.createContext<TestUsecase>({} as TestUsecase);

const SetUpApp:React.FC = ({ children }) => (
  <StoreContext.Provider value={store}>
    <UsecaseContext.Provider value={usecase}>
      {children}
    </UsecaseContext.Provider>
  </StoreContext.Provider>
)

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

export default () => <SetUpApp><App /></SetUpApp>;
