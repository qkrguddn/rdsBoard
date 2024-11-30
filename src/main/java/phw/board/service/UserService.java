package phw.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import phw.board.domain.dto.UserDto;
import phw.board.domain.entity.UserEntity;
import phw.board.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Transactional
    public Long signUp(UserEntity userEntity) throws Exception {
        Long id = null;
        Optional<UserEntity> user = Optional.ofNullable(userRepository.findByLoginId(userEntity.getLoginId()));
        if(user.isEmpty()){
            id = userRepository.save(userEntity).getId();
        }
        else throw new Exception("이미 존재하는 id입니다.");
        return id;
    }

    @Transactional
    public Long login(String id, String pw){
        return userRepository.findByLoginIdAndPw(id, pw).getId();
    }
}
