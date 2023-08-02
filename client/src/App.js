import "./App.css";
import { Auth } from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import Post from "./pages/post/Post";
import Settings from "./pages/settings/Settings";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Notifications from "./pages/notifications/Notifications";
import Topic from "./pages/Topic/Topic";
import Topics from "./pages/Topics/Topics";
import Chat from "./pages/chat/Chat";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />

        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />

        <Route
          path="/search/:id"
          element={user ? <Search /> : <Navigate to="../auth" />}
        />

        <Route
          path="/status/:id"
          element={user ? <Post /> : <Navigate to="../auth" />}
        />

        <Route
          path="/settings"
          element={user ? <Settings /> : <Navigate to="../auth" />}
        />

        <Route
          path="/notifications"
          element={user ? <Notifications /> : <Navigate to="../auth" />}
        />

        <Route
          path="/topic/:id"
          element={user ? <Topic /> : <Navigate to="../auth" />}
        />

        <Route
          path="/topics"
          element={user ? <Topics /> : <Navigate to="../auth" />}
        />

        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
