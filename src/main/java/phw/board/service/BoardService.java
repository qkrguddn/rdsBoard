package phw.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import phw.board.domain.dto.BoardDto;
import phw.board.domain.entity.BoardEntity;
import phw.board.repository.BoardRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class BoardService {
    @Autowired
    BoardRepository boardRepository;

    @Transactional
    public List<BoardDto> getList(){
        List<BoardEntity> boardEntities = boardRepository.findAll();
        List<BoardDto> boardDtoList = new ArrayList<>();
        for(BoardEntity boardEntity: boardEntities){
            BoardDto boardDto = convertEntityToDto(boardEntity);
            boardDtoList.add(boardDto);
        }
        return boardDtoList;
    }
    @Transactional
    public BoardDto getBoard(Long boardId) {
        BoardEntity boardEntity = boardRepository.findById(boardId).get();
        BoardDto entityToDto = convertEntityToDto(boardEntity);
        return entityToDto;
    }

    @Transactional
    public BoardDto saveBoard(BoardDto boardDto) {
        boardRepository.save(boardDto.dtoToEntity());
        return boardDto;
        //dto -> entity 후 저장

    }
    /* @Transactional
     public void deleteBoard(Long boardId) {
         boardRepository.deleteById(boardId);
     }*/
    @Transactional
    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }
    @Transactional
    public BoardDto updateBoard(Long boardId, BoardDto boardDto) {
        BoardEntity boardEntity = boardRepository.findById(boardId).get();
        boardEntity.updateBoard(boardDto.getTitle(), boardDto.getContent());
        BoardDto entityToDto = convertEntityToDto(boardEntity);
        return boardDto;

    }

    private BoardDto convertEntityToDto(BoardEntity boardEntity) {
        return BoardDto.builder()
                .id(boardEntity.getId())
                .title(boardEntity.getTitle())
                .content(boardEntity.getContent())
                .writer(boardEntity.getWriter())
                .createdDate(boardEntity.getCreatedDate())
                .build();
    }
    //valid
    public Map<String, String> validateHandling(Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();

        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format("valid_%s", error.getField());
            validatorResult.put(validKeyName, error.getDefaultMessage());
        }
        return validatorResult;
    }
    //검색
    @Transactional
    public List<BoardDto> searchPosts(String keyword) {
        List<BoardEntity> boardEntities = boardRepository.findByTitleContaining(keyword);
        List<BoardDto> boardDtoList = new ArrayList<>();

        if (boardEntities.isEmpty()) return boardDtoList;

        for (BoardEntity boardEntity : boardEntities) {
            boardDtoList.add(this.convertEntityToDto(boardEntity));
        }

        return boardDtoList;
    }
}
/*
 * 1. getList 0
 * 2. getBoard 0
 * 3. postBoard 0
 * 4. putBoard 0
 * 5. deleteBoard 0
 * */