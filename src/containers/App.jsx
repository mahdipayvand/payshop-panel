import { Main } from "layouts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Main>
      <Routes>
        <Route path="/" element={<h1>داشبورد</h1>} />
        <Route path="/product" element={<h1>محصولات</h1>} />
        <Route path="/user" element={<h1>کاربران</h1>} />
      </Routes>
    </Main>
  </Router>
);

export default App;
