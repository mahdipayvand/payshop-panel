import { Main } from "layouts";
import { Dashboard, Products, Users } from "pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => (
  <Router>
    <Main>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product" element={<Products />} />
        <Route path="/user" element={<Users />} />
      </Routes>
    </Main>
  </Router>
);

export default App;
