package phw.board.domain.dto;

import lombok.*;
import phw.board.domain.entity.BoardEntity;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class BoardDto {
    private Long id;
    private String writer;
    @NotBlank(message = "제목을 입력해주세요.")
    private String title;
    @NotBlank(message = "내용을 입력해주세요.")
    private String content;

    private LocalDateTime createdDate;

    public BoardEntity dtoToEntity(){
        BoardEntity boardEntity = BoardEntity.builder()
                .id(id)
                .writer(writer)
                .title(title)
                .content(content)
                .createdDate(createdDate.now())
                .build();
        return boardEntity;
    }
    @Builder
    public BoardDto(Long id, String writer, String title, String content, LocalDateTime createdDate) {
        this.id = id;
        this.writer = writer;
        this.title = title;
        this.content = content;
        this.createdDate = createdDate;

    }
}
