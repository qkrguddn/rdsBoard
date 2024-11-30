package phw.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import phw.board.domain.entity.BoardEntity;

import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    List<BoardEntity> findByTitleContaining(String keyword);
}
