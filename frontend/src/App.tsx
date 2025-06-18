import { Outlet } from "react-router";

const App = () => {
  return (
    <div>
      <nav>Navbar</nav>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
};

export default App;
