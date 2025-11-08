import logo from "./logo.svg";
import "./App.css";
import Latex from "react-latex-next";

function App() {
  return (
    <div className="App">
      <Latex macros={{ "\\f": "#1f(#2)" }}>
        {"$\\f\\relax{x} = x$ is rendered using macros"}
      </Latex>{" "}
    </div>
  );
}

export default App;
