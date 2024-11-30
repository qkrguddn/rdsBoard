import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Post = () => {

  let navigate = useNavigate();
  const [boards, setBoards] = useState({
    //''안에 초기값 설정
    writer: '',
    title: '',
    content: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoards({
      ...boards,
      [name]: value,
    });
  };
  const createBoard = async (event) => {
    event.preventDefault();
    await axios.post("/api/board", {
      writer: boards.writer,
      title: boards.title,
      content: boards.content
    });

    navigate("/");
  };
  return (
    <div>
      <Link to="/"><img src={process.env.PUBLIC_URL + '/rds.jpg'} width="90" height="50"/>
      </Link>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">작성하기</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> 작성자  </label>
                  <input placeholder="writer" name="writer" className="form-control"
                    value={boards.writer} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label> 제목 </label>
                  <input type="text" placeholder="title" name="title" className="form-control"
                    value={boards.title} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label> 내용  </label>
                  <textarea placeholder="contents" name="content" className="form-control"
                    value={boards.content} onChange={handleChange} />
                </div>
                <button className="btn btn-success" onClick={createBoard}>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

}

export default Post;
