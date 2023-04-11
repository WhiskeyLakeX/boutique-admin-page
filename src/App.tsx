import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./routes";
import { store, persistor } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { handleNoValidAccessToken } from "./module/utils/Notification";

function App() {
  if (window.location.pathname === "/") {
    window.location.href = "/dashboard";
  }
  useEffect(() => {
    return () => {
      if (
        window.location.pathname !== "/login" &&
        // @ts-ignore
        !store.getState().userReducer.accessToken
      ) {
        handleNoValidAccessToken();
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    };
  }, []);

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
