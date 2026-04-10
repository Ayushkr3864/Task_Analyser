
import { Route, Routes } from "react-router"
import Login from "./components/Login"
import Register from "./components/Register";
import Task from "./components/TaskPage"
import Protected from "./components/ProtectedRoute"
import './App.css'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/tasks"
          element={
            <Protected>
              <Task />
            </Protected>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App
