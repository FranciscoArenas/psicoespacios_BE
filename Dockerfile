# Dockerfile para la aplicación psicoespacios_BE en Fly.io

# Etapa de construcción (Builder Stage)
FROM node:23.11.0-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias primero
# Esto ayuda a optimizar el caché de Docker
COPY package*.json ./

# Instalar las dependencias de producción y desarrollo
RUN npm ci

# Copiar el código fuente completo del proyecto
COPY . .

# Construir la aplicación
RUN npm run build

# Verificar la estructura de directorios de compilación
RUN echo "Estructura de directorios después de la compilación:" && \
    ls -la && \
    echo "Contenido de dist:" && \
    ls -la dist && \
    echo "Verificando archivo main.js:" && \
    find dist -name "main.js"

# --- Etapa de Producción (Production Stage) ---
FROM node:23.11.0-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar solo las dependencias de producción
COPY package*.json ./

# Instalar solo las dependencias de producción
RUN npm ci --only=production

# Copiar los archivos de la aplicación ya construidos desde la etapa 'builder'
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/package*.json ./

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 3000

# Crear un script de inicio mejorado directamente en el contenedor
# Con mejor manejo de errores y ejecución de migraciones
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'set -e' >> /app/start.sh && \
    echo 'echo "Directorio actual: $(pwd)"' >> /app/start.sh && \
    echo 'echo "Contenido:"' >> /app/start.sh && \
    echo 'ls -la' >> /app/start.sh && \
    echo 'echo "Contenido de dist:"' >> /app/start.sh && \
    echo 'ls -la dist' >> /app/start.sh && \
    echo 'echo "Contenido de scripts:"' >> /app/start.sh && \
    echo 'ls -la scripts' >> /app/start.sh && \
    echo 'echo "Verificando esquema inicial..."' >> /app/start.sh && \
    echo 'NODE_ENV=production node scripts/init-database.js || echo "⚠️ Error al inicializar base de datos, pero continuando..."' >> /app/start.sh && \
    echo 'echo "Ejecutando migraciones con nuestro propio runner..."' >> /app/start.sh && \
    echo 'NODE_ENV=production node dist/src/database/migration-runner.js || echo "⚠️ Error al ejecutar migraciones, pero continuando..."' >> /app/start.sh && \
    echo 'echo "Iniciando aplicación..."' >> /app/start.sh && \
    echo 'NODE_ENV=production exec node dist/src/main.js' >> /app/start.sh && \
    chmod +x /app/start.sh && \
    cat /app/start.sh

# Configurar la variable de entorno HOST para que la aplicación escuche en todas las interfaces
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Comandos para iniciar la aplicación
CMD ["/bin/sh", "/app/start.sh"]