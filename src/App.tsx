import './App.css';
import LoginPage from './app/components/pages/login-page/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from './app/components/pages/NotFoundPage';
import EmployeeList from './app/components/pages/employee/EmployeeList';
import NavBar from './app/components/pages/navbar/NavBar';

function App() {
  return (
  <>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={  <LoginPage/>}/>
        <Route path="/employee-list" element={  <EmployeeList/>}/>
        <Route path="/navbar" element={  <NavBar/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
