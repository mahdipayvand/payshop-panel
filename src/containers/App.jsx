import { Main } from "layouts";
import { Auth } from "containers";
import { Provider } from "react-redux";
import store, { persistor } from "store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Products, Users, NotFound, AccessDenied } from "pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer
          draggable
          rtl={true}
          pauseOnHover
          closeOnClick
          theme="colored"
          autoClose={5000}
          pauseOnFocusLoss
          newestOnTop={true}
          position="bottom-left"
          hideProgressBar={true}
        />
        <Auth>
          <Routes>
            <Route element={<Main />}>
              <Route path="/product" element={<Products />} />
              <Route path="/user" element={<Users />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/access-denied" element={<AccessDenied />} />
          </Routes>
        </Auth>
      </PersistGate>
    </Provider>
  </Router>
);

export default App;
