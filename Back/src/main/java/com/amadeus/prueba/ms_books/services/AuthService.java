package com.amadeus.prueba.ms_books.services;

import com.amadeus.prueba.ms_books.configs.JwtUtil;
import com.amadeus.prueba.ms_books.controllers.request.AuthRequest;
import com.amadeus.prueba.ms_books.controllers.request.CreateUserRequest;
import com.amadeus.prueba.ms_books.controllers.response.AuthResponse;
import com.amadeus.prueba.ms_books.controllers.response.CreateUserResponse;
import com.amadeus.prueba.ms_books.controllers.response.commons.GeneralResponse;
import com.amadeus.prueba.ms_books.domains.User;
import com.amadeus.prueba.ms_books.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService {

    @Value("${jwt.expire}")
    private Long EXPIRE_TIME;
    @Value("${jwt.refreshExpire}")
    private Long REFRESH_EXPIRE_TIME;

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public GeneralResponse<AuthResponse> auth(AuthRequest request){
        if(request.getType().equals("authorization")){
            if(authenticate(request.getUser(), request.getPassword())){
                return getToken(request);
            } else {
                throw new IllegalArgumentException("Usuario o contraseña invalidos");
            }
        } else if(request.getType().equals("refresh_token")){
            return refreshToken(request);
        }
        throw new IllegalArgumentException("Tipo de autenticación invalido");
    }

    private boolean authenticate(String username, String password){
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new IllegalArgumentException("Usuario no encontrado");
        } else {
            return passwordEncoder.matches(password, user.getPassword());
        }
    }

    private GeneralResponse<AuthResponse> getToken(AuthRequest request){
        String token = jwtUtil.generateAccessToken(request.getUser());
        String refreshToken = jwtUtil.generateRefreshToken(request.getUser());
        AuthResponse auth = new AuthResponse(token, refreshToken, EXPIRE_TIME);
        return new GeneralResponse<>(
                HttpStatus.OK.value(),
                HttpStatus.OK.getReasonPhrase(),
                "Token generado correctamente",
                auth
                );
    }

    private GeneralResponse<AuthResponse> refreshToken(AuthRequest request){
        if(jwtUtil.isRefreshTokenValid(request.getRefreshToken())){
            String username = jwtUtil.getUsernameFromToken(request.getRefreshToken());
            String token = jwtUtil.generateAccessToken(username);
            String refreshToken = jwtUtil.generateRefreshToken(username);
            AuthResponse auth = new AuthResponse(token, refreshToken, REFRESH_EXPIRE_TIME);
            return new GeneralResponse<>(
                    HttpStatus.OK.value(),
                    HttpStatus.OK.getReasonPhrase(),
                    "Token generado correctamente",
                    auth
            );
        }
        throw new IllegalArgumentException("Refresh token inválido");
    }

    public GeneralResponse<CreateUserResponse> createUser(CreateUserRequest request){
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(encodedPassword);
        user = userRepository.save(user);
        CreateUserResponse response = new CreateUserResponse(user);
        return new GeneralResponse<>(
                HttpStatus.OK.value(),
                HttpStatus.OK.getReasonPhrase(),
                "Usuario registrado correctamente",
                response
        );
    }

}
