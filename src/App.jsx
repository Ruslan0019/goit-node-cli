import "./App.css";
import Home from "./pages/Home/Home";
import SignIn from "./pages/Login/Login";
import SignUp from "./pages/Register/Registre";

function App() {
  return (
    <>
      <SignIn />
      <SignUp />
      <Home />
    </>
  );
}

export default App;
