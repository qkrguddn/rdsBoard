import { useState, useEffect } from "react"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Main = () => {
    const [boards, setBoards] = useState([]);
    const [keyword, setKeyword] = useState('');  // 검색어 상태
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/board").then((response) => {
            setBoards(response.data);
        });
    }, []);
    const goDetail = (id) => {
        navigate(`/detail/${id}`);
    };

    const handleSearch = async () => {
        try {
          const response = await axios.get('/board/search', {
            params: { keyword }
          });
          setBoards(response.data);  // 검색 결과를 상태에 저장
        } catch (error) {
          console.error('검색 중 오류 발생:', error);
        }
      };
    return (
        <div>
            <Link to="/">
             <img src={process.env.PUBLIC_URL + '/rds.jpg'} width="90" height="50"/>
             </Link> <br></br>
             <Link to="/login">  <button className="btn btn-primary"> 로그인</button></Link>
             <Link to="/login">  <button className="btn btn-primary"> 로그아웃</button></Link>

            <h2 className="text-center">게시판</h2>

            <div className="row">
                <Link to="/create-board">  <button className="btn btn-primary"> 글 작성</button></Link>
            </div>
            <input
                   type="text"
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                          placeholder="제목 검색"
                  />
            <button className="btn btn-primary" onClick={handleSearch}>검색</button>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>작성자 </th>
                            <th>글제목 </th>
                            <th>내용 </th>
                            <th>작성일 </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            boards.map(board =>
                                    <tr key={board.id}>
                                        <td> {board.id} </td>
                                        <td> {board.writer} </td>
                                        <td style={{ color: "blue" }} onClick={() => goDetail(board.id)}>{board.title}</td>
                                        <td> {board.content} </td>
                                        <td> {board.createdDate} </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default Main;
