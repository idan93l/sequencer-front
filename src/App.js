import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import PlayerProvider from "./components/context/PlayerProvider";
import Sequencer from "./components/Sequencer/Sequencer";
import Loader from "./components/Loader/Loader";
import Rotate from "./components/Rotate/Rotate";
import "./App.css";

const socketUrl =
  process.env.REACT_APP_SOCKET_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://sequencer-api.onrender.com"
    : "http://localhost:3001");

const socket = io(socketUrl);

function App() {
  const [orientation, setOrientation] = useState(window.screen.orientation.type);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  useEffect(() => {
    const handleOrientationChange = () =>
      setOrientation(window.screen.orientation.type);
    window.addEventListener("orientationchange", handleOrientationChange);
    return () =>
      window.removeEventListener("orientationchange", handleOrientationChange);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PlayerProvider>
                {({ player }) => {
                  if (!player) {
                    return <Loader />;
                  }
                  return orientation === "portrait-primary" ? (
                    <Rotate />
                  ) : (
                    <>
                      <div
                        className={`connection-status ${
                          isConnected ? "connected" : "connecting"
                        }`}
                        role="status"
                      >
                        {isConnected ? "Live collaboration connected" : "Connecting to collaboration server…"}
                      </div>
                      <Sequencer player={player} socket={socket} />
                    </>
                  );
                }}
              </PlayerProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
