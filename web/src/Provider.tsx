import React from 'react';
import './App.css';
import {TestDriver} from './lib/driver/test';
import {TestGateway} from './lib/gateway/test';
import {TestUsecase} from './lib/usecase/test'
import {TestStore} from './lib/store/test';

const store = new TestStore();
const driver = new TestDriver();
const gateway = new TestGateway(driver);
const usecase = new TestUsecase(gateway, store);

export const StoreContext = React.createContext<TestStore>(store);
export const UsecaseContext = React.createContext<TestUsecase>(usecase);

export const Provider:React.FC = ({ children }) => (
  <StoreContext.Provider value={store}>
    <UsecaseContext.Provider value={usecase}>
      {children}
    </UsecaseContext.Provider>
  </StoreContext.Provider>
)
