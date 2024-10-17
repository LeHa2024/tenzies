import "./App.css";
import AllDice from "./dice/allDice";
import GameProvider from "./contexts/gameProvider";
import { useState, useEffect } from "react";

function App() {
  const [currentRolls, setCurrentRolls] = useState<number>(0);
  const [bestRolls, setBestRolls] = useState<number | null>(null); // null để xác định nếu chưa có Best Rolls
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [bestTime, setBestTime] = useState<number | null>(null); // null để xác định nếu chưa có Best Time
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Cleanup timer khi game kết thúc
    return () => clearInterval(timer);
  }, [gameStarted]);

  // Hàm để bắt đầu game mới hoặc roll dice
  const handleStartOrRoll = () => {
    if (!gameStarted) {
      setGameStarted(true); // Bắt đầu game nếu chưa bắt đầu
    } else {
      // Nếu game đã bắt đầu, tăng currentRolls sau mỗi lần "Roll"
      setCurrentRolls((prevRolls) => prevRolls + 1);
    }
  };

  // Cập nhật Best Rolls
  if (bestRolls === null || currentRolls < bestRolls) {
    setBestRolls(currentRolls);
  }
  // Cập nhật Best Time
  if (bestTime === null || currentTime < bestTime) {
    setBestTime(currentTime);
  }

  // Hàm reset game
  const resetGame = () => {
    setGameStarted(false);
    setCurrentRolls(0);
    setCurrentTime(0);
  };

  return (
    <GameProvider>
      <main className="tenzies-game">
        <div className="container">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>

          <div className="stats">
            <div className="stats-class">
              <div className="roll">
                <span className="stat-title">Current Rolls</span>
                <span className="stat-value">{currentRolls}</span>
              </div>
              <div className="roll">
                <span className="stat-title">Best Rolls</span>
                <span className="stat-value">
                  {bestRolls !== null ? bestRolls : "N/A"}
                </span>
              </div>
            </div>
            <div className="stats-class">
              <div className="roll">
                <span className="stat-title">Current Time</span>
                <span className="stat-value">{currentTime}s</span>
              </div>
              <div className="roll">
                <span className="stat-title">Best Time</span>
                <span className="stat-value">
                  {bestTime !== null ? bestTime + "s" : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="dice-container">
            <AllDice gameStarted={gameStarted} onRoll={handleStartOrRoll} />
          </div>

          <button
            onClick={gameStarted ? resetGame : handleStartOrRoll}
            style={{ marginTop: "20px", padding: "10px" }}
          >
            {gameStarted ? "Reset Game" : "Start Game"}
          </button>
        </div>
      </main>
    </GameProvider>
  );
}

export default App;
