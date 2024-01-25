import { Suspense } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProductScreen from "screens/product_screen/product_screen.screen";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Suspense fallback={<div />}>
        <div className="navbar_container">{/* <Navbar /> */}</div>
        <Routes>
          <Route path="/" element={<ProductScreen />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
export default App;
