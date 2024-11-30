package phw.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import phw.board.domain.entity.UserEntity;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByLoginId(String loginId);
    UserEntity findByLoginIdAndPw(String loginId, String loginPw);
}
