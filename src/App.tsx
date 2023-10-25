import { Suspense } from "react";
import "./App.scss";
import Test from "./screens/test/test.screen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./common_components/hoc/main.hoc";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div />}>
          <Routes>
            <Route
              path="/"
              element={
                <Main>
                  <Test />
                </Main>
              }
            ></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
