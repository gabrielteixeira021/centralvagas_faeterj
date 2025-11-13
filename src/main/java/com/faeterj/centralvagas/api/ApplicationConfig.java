package com.faeterj.centralvagas.api;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/api")
public class ApplicationConfig extends Application {
    // Esta classe habilita JAX-RS no contexto /api
}
