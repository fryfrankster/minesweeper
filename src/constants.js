const DEFAULT_NUM_BOMBS = 10;
const DEFAULT_ROWS = 9;
const DEFAULT_COLUMNS = 9;
const GAME_STATUSES = { STARTING: 1, PLAYING: 2, WIN: 3, LOSE: 4 };
const SURROUNDING_SQUARES = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];

export { DEFAULT_NUM_BOMBS, DEFAULT_ROWS, DEFAULT_COLUMNS, GAME_STATUSES, SURROUNDING_SQUARES };
