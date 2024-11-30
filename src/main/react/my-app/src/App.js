import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Detail from './components/detail';
import Edit from './components/edit';
import Main from './components/main';
import Post from './components/post';
import Login from './components/login';
import SignUp from './components/signUp';
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signUp" element={<SignUp/>}></Route>
          <Route path="/create-board" element={<Post/>}></Route>
          <Route path="/detail/:boardId" element={<Detail/>}></Route>
          <Route path="/edit/:boardId" element={<Edit/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

