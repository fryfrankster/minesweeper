import ResetButton from "./components/ResetButton";
import Square from "./components/Square";

function App() {
  const grid = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      grid.push({ x: i, y: j, value: null });
    }
  }

  const GRID_VALUES = [
    ["1", null, "B"],
    ["1", "2", "1"],
    ["B", "1", "1"],
  ];

  return (
    <div className="App">
      {GRID_VALUES.map((row) =>
        row.map((cell) => <Square key={Math.random()} value={cell} />)
      )}
      <ResetButton />
    </div>
  );
}

export default App;
