package phw.board.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String loginId;
    private String pw;
    private String nickname;

    public UserEntity(String loginId, String pw, String nickname) {
        this.loginId = loginId;
        this.pw = pw;
        this.nickname = nickname;
    }
}
