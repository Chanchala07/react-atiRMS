import './App.css';
import LoginPage from './app/components/pages/login-page/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from './app/components/pages/NotFoundPage';
import EmployeeList from './app/components/pages/employee/EmployeeList';
import NavBar from './app/components/pages/navbar/NavBar';
import HomePage from './app/components/pages/home-page/HomePage';
import AddEmployee from './app/components/pages/add-Employee/AddEmployee';
import SideBar from './app/components/pages/side-bar/SideBar';
import Dashboard from './app/components/pages/dashboard/Dashboard';
import Profile from './app/components/pages/my-profile/Profile';
import ArchivedEmployees from './app/components/pages/archived-employee/ArchivedEmployees';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home-page" element={<SideBar />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-employee/:id" element={<AddEmployee />} />
            <Route path="profile" element={<Profile />} />
            <Route path="employee-list" element={<EmployeeList />} />
            <Route path="archived-list" element={<ArchivedEmployees/>}></Route>
            {/* Add other routes as needed */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
