package com.amadeus.prueba.ms_books.configs;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpneAPI() {
        final String securitySchemeName = "bearerAuth";
        return new OpenAPI()
                .info(new Info().title("Book API").description("Book Controller"))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(
                    new io.swagger.v3.oas.models.Components()
                            .addSecuritySchemes(securitySchemeName, new SecurityScheme()
                                    .type(SecurityScheme.Type.HTTP)
                                    .scheme("bearer")
                                    .bearerFormat("JWT")
                            )
                );
    }
}
