import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./routes";
import rdPersistFunction from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const { store, persistor } = rdPersistFunction();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
