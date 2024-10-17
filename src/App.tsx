import './App.css';
import LoginPage from './app/components/pages/login-page/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from './app/components/pages/NotFoundPage';
import EmployeeList from './app/components/pages/employee/EmployeeList';
import NavBar from './app/components/pages/navbar/NavBar';
import HomePage from './app/components/pages/home-page/HomePage';
import AddEmployee from './app/components/pages/add-Employee/AddEmployee';
import SideBar from './app/components/pages/side-bar/SideBar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home-page" element={<SideBar />}>
            {/* Use a relative path here */}
            <Route path="add-employee" element={<AddEmployee />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/navbar" element={<NavBar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
