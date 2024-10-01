import './App.css';
import './components/Chains'
import Chains from "./components/Chains";

export default function App() {

  // async function temp() {
  //   // const data = fetch('/data/audio.json');
  //   // data.then((res) => {
  //   //   console.log(res.json());
  //   // })
  //   fetch('/data/audio.json')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err));
  // }



  return (
    <div className="App">
      <header className="App-header">
        <h1>Soundboard</h1>
        <Chains/>
      </header>
    </div>
  );
}