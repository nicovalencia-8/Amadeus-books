package com.amadeus.prueba.ms_books.controllers;

import com.amadeus.prueba.ms_books.controllers.request.AuthRequest;
import com.amadeus.prueba.ms_books.controllers.request.CreateUserRequest;
import com.amadeus.prueba.ms_books.controllers.response.AuthResponse;
import com.amadeus.prueba.ms_books.controllers.response.CreateUserResponse;
import com.amadeus.prueba.ms_books.controllers.response.commons.GeneralResponse;
import com.amadeus.prueba.ms_books.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/users")
@Tag(name = "Autenticacion", description = "Controlador para administrar los usuarios")
public class UserController {

    private final AuthService authService;

    @PostMapping("/token")
    @Operation(summary = "Obtener token", description = "Obtiene el token para autenticarse en los servicios, type authorization para obtener el token y refresh_token para refrezcar el token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token y refresh token generado"),
            @ApiResponse(responseCode = "401", description = "Usuario o refresh token invalido")
    })
    public ResponseEntity<GeneralResponse<AuthResponse>> users(@RequestBody @Valid AuthRequest request){
        try{
            return ResponseEntity
                    .ok(authService.auth(request));
        } catch (IllegalArgumentException e) {
            GeneralResponse<AuthResponse> response = new GeneralResponse<>(
                    HttpStatus.UNAUTHORIZED.value(),
                    HttpStatus.UNAUTHORIZED.getReasonPhrase(),
                    e.getMessage(),
                    null
            );
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }
    }

    @PostMapping("/create")
    @Operation(summary = "Crear usuario", description = "Crea un usuario en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuario creado"),
            @ApiResponse(responseCode = "500", description = "Error al crear el usuario")
    })
    public ResponseEntity<GeneralResponse<CreateUserResponse>> users(@RequestBody @Valid CreateUserRequest request){
        try{
            return ResponseEntity
                    .ok(authService.createUser(request));
        }catch (IllegalArgumentException e){
            GeneralResponse<CreateUserResponse> response = new GeneralResponse<>(
                    HttpStatus.BAD_REQUEST.value(),
                    HttpStatus.BAD_REQUEST.getReasonPhrase(),
                    e.getMessage(),
                    null
            );
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }
    }

}
