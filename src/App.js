import "./App.css";

import { Game } from './components/game/game.component';
import { Header } from './components/header/header.component';
import { Field } from './components/field/field.component';

function App() {
  return (
    <Game>
      <Header />
      <Field />
    </Game>
  );
}

export default App;
