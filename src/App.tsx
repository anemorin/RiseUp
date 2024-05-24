import { FC } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Calendar from './views/Calendar';
import MainLayout from './components/MainLayout';
import Workouts from './views/Workouts';
import Templates from './views/Templates';
import Profile from './views/Profile';
import Registration from './views/Auth/Registration';
import Login from './views/Auth/Login';
import PageLayout from './components/PageLayout';

const App : FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        element={<PageLayout />}
        path="/auth"
      >
        <Route
          element={<Registration />}
          path="registration"
        />
        <Route
          element={<Login />}
          path="login"
        />
      </Route>
      <Route element={<MainLayout />}>
        <Route
          element={<Profile />}
          path="/"
        />
        <Route
          element={<Calendar />}
          path="/Calendar"
        />
        <Route
          element={<Workouts />}
          path="/Workouts"
        />
        <Route
          element={<Templates />}
          path="/Templates"
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
