import { useState } from "react";
import Grid from "./components/Grid";
import { GAME_STATUSES } from "./constants";


function App() {
  const [gameStatus, setGameStatus] = useState(GAME_STATUSES.PLAYING);

  const onChangeGameStatusHandler = (status) => {
    setGameStatus(status);
  };

  return (
    <div className="App">
      <Grid gameStatus={gameStatus} onChangeGameStatus={onChangeGameStatusHandler}/>
    </div>
  );
}

export default App;
