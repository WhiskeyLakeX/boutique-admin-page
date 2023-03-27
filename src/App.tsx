import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./routes";
import rdPersistFunction from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const { store, persistor } = rdPersistFunction();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
