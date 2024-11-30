import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
const Edit = () => {
    const id = useParams().boardId;
    let navigate = useNavigate();
    const [boards, setBoards] = useState({});

    useEffect(() => {
        const viewNow = async () => {
            const response = await axios.get(`/api/board/${id}`)
            setBoards({
                writer: response.data.writer,
                title: response.data.title,
                content: response.data.content,
            })
        }
        viewNow()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoards({
            ...boards,
            [name]: value,
        });
    };

    const createBoard = async (event) => {
        event.preventDefault();
        await axios.put(`/api/board/${id}`, {
            title: boards.title,
            content: boards.content
        });
        navigate("/");
    }
    return (
        <div>
            <Link to="/"><img src={process.env.PUBLIC_URL + '/rds.jpg'} width="90" height="50"/>
            </Link> <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center">수정하기</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> 작성자 </label>
                                    <input readOnly name="writer" className="form-control"
                                        value={boards.writer} />
                                </div>
                                <div className="form-group">
                                    <label> 제목 </label>
                                    <input type="text" name="title" className="form-control"
                                        value={boards.title} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label> 내용  </label>
                                    <textarea placeholder="content" name="content" className="form-control"
                                        value={boards.content} onChange={handleChange} />
                                </div>
                                <button className="btn btn-success" onClick={createBoard}>수정</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;