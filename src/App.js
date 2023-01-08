import Grid from "./components/Grid";
import ResetButton from "./components/ResetButton";

function App() {
  // const grid = [];
  // for (let i = 0; i < 3; i++) {
  //   for (let j = 0; j < 3; j++) {
  //     grid.push({ x: i, y: j, value: null });
  //   }
  // }

  const GRID_VALUES1 = [
    [
      { value: null, isChecked: false, isFlagged: false },
      { value: null, isChecked: false, isFlagged: false },
      { value: null, isChecked: false, isFlagged: false },
    ],
    [
      { value: null, isChecked: false, isFlagged: false },
      { value: null, isChecked: false, isFlagged: false },
      { value: null, isChecked: false, isFlagged: false },
    ],
    [
      { value: null, isChecked: false, isFlagged: false },
      { value: null, isChecked: false, isFlagged: false },
      { value: null, isChecked: false, isFlagged: false },
    ],
  ];

  return (
    <div className="App">
      <Grid values={GRID_VALUES1} />
      <ResetButton />
    </div>
  );
}

export default App;
