import './App.css';
import './components/Chains'
import Chains from "./components/Chains";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Soundboard</h1>
        <Chains/>
      </header>
    </div>
  );
}