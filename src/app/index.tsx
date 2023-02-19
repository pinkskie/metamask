import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Config, DAppProvider, Rinkeby } from "@usedapp/core";
import { Provider } from "react-redux";

import { Header, Modal } from "./ui";
import { Home, User } from "../pages";
import { store } from "./store";
import "./styles/index.css";

const config: Config = {
  readOnlyChainId: Rinkeby.chainId,
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DAppProvider config={config}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<User />} />
          </Routes>
          <Modal />
        </DAppProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
