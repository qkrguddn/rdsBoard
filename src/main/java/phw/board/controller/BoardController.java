package phw.board.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import phw.board.domain.dto.BoardDto;
import phw.board.domain.dto.UserDto;
import phw.board.domain.entity.UserEntity;
import phw.board.service.BoardService;
import phw.board.service.UserService;

import javax.validation.Valid;
import java.util.List;


//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BoardController {
    @Autowired
    BoardService boardService;
    @Autowired
    UserService userService;

    @GetMapping("")
    public String test() {
        return "test";
    }

    /**
     * 회원가입 : 유저 생성
     */
    @PostMapping("/users")
    public Long saveUser(@RequestBody  UserDto userDto) throws Exception  {
        UserEntity user = new UserEntity(userDto.getLoginId(), userDto.getPw(), userDto.getNickname());
        return userService.signUp(user);
    }

    /**
     * 로그인
     */
    @PostMapping("/login")
    public Long Login(@RequestBody UserDto userDto) {
        String loginId = userDto.getLoginId();
        String pw = userDto.getPw();

        return userService.login(loginId, pw);
    }

    @GetMapping("/api/board")
    public List<BoardDto> getMainPage() {
        List<BoardDto> list = boardService.getList();
        return list;
    }

    //검색
    @GetMapping("/board/search")
    public List<BoardDto> search(@RequestParam(value="keyword") String keyword) {
        List<BoardDto> list = boardService.searchPosts(keyword);
        return list;
    }

    @GetMapping("/api/board/{boardId}")
    public BoardDto getDetail(@PathVariable Long boardId) {
        BoardDto board = boardService.getBoard(boardId);
        return board;
    }

    @GetMapping("/post/edit/{boardId}")
    public BoardDto getUpdate(@PathVariable Long boardId) {
        BoardDto board = boardService.getBoard(boardId);
        return board;
    }
    @PostMapping("/api/board")
    public BoardDto saveBoard(@RequestBody BoardDto boardDto) {

        return boardService.saveBoard(boardDto);
    }
    @PutMapping("/api/board/{boardId}")
    public BoardDto putBoard(@RequestBody BoardDto boardDto, @PathVariable Long boardId)
    {
        return boardService.updateBoard(boardId, boardDto);
    }

    @DeleteMapping("/api/board/{boardId}")
    public void deleteBoard(@PathVariable Long boardId){
        boardService.deleteBoard(boardId);
    }


}
