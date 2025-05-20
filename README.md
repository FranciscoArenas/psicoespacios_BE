# 🏥 PsicoEspacios - Backend

<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge"/>
</p>

## 📋 Descripción

PsicoEspacios es una plataforma integral para la gestión de espacios terapéuticos y consultas psicológicas. Este repositorio contiene el backend de la aplicación, desarrollado con NestJS.

### 🎯 Características Principales

- 👥 Gestión de usuarios y roles (profesionales, pacientes, administradores)
- 📅 Sistema de reservas y agenda
- 💰 Gestión de pagos y suscripciones
- 📍 Administración de sedes y boxes
- 📊 Reportes y estadísticas
- 🔄 Sistema de derivaciones
- 📝 Gestión de fichas de sesión
- 📞 Módulo de contacto y atención al cliente

## 🛠️ Tecnologías Utilizadas

- **Framework:** NestJS
- **Lenguaje:** TypeScript
- **Base de Datos:** PostgreSQL
- **Contenedorización:** Docker
- **Autenticación:** JWT

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v16 o superior)
- Docker y Docker Compose
- npm o yarn

### Instalación

1. Clonar el repositorio:
   \`\`\`bash
   git clone [URL_DEL_REPOSITORIO]
   cd psicoespacios_BE
   \`\`\`

2. Instalar dependencias:
   \`\`\`bash
   npm install
   \`\`\`

3. Configurar variables de entorno:
   \`\`\`bash
   cp .env.example .env

# Editar .env con tus configuraciones

\`\`\`

4. Iniciar servicios con Docker:
   \`\`\`bash
   docker-compose up -d
   \`\`\`

5. Iniciar la aplicación:
   \`\`\`bash

# Desarrollo

npm run start:dev

# Producción

npm run start:prod
\`\`\`

## 🗂️ Estructura del Proyecto

- \`/src/admin\` - Módulo de administración
- \`/src/auth\` - Autenticación y autorización
- \`/src/boxes\` - Gestión de espacios terapéuticos
- \`/src/derivacion\` - Sistema de derivaciones
- \`/src/gestion\` - Gestión de pacientes y planes
- \`/src/pagos\` - Procesamiento de pagos
- \`/src/reportes\` - Generación de reportes
- \`/src/reservas\` - Sistema de reservas
- \`/src/sedes\` - Administración de sedes

## 🧪 Testing

\`\`\`bash

# Tests unitarios

npm run test

# Tests e2e

npm run test:e2e

# Cobertura

npm run test:cov
\`\`\`

## 🔄 Gestión de Migraciones

Para facilitar el manejo de migraciones de base de datos, se ha incluido un script \`migrate.sh\`:

\`\`\`bash

# Ejecutar migraciones

./migrate.sh run

# Mostrar estado de migraciones

./migrate.sh show

# Crear una nueva migración

./migrate.sh create NuevaMigracion

# Generar una migración basada en cambios de entidades

./migrate.sh generate CambiosEntidad

# Revertir la última migración

./migrate.sh revert
\`\`\`

## 📚 Documentación API

La documentación de la API está disponible en:

- Swagger UI: \`http://localhost:3000/api\`
- OpenAPI JSON: \`http://localhost:3000/api-json\`

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push al Branch (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

## 🚀 Despliegue en Vercel

Para desplegar la aplicación en Vercel:

1. Preparar el proyecto para despliegue:

```bash
./scripts/prepare-deploy.sh
```

2. Configurar variables de entorno en Vercel:

   - DATABASE_URL
   - DATABASE_HOST
   - DATABASE_USER
   - DATABASE_PASSWORD
   - DATABASE_NAME
   - JWT_SECRET
   - JWT_EXPIRATION

3. Ejecutar el despliegue:

```bash
npm run deploy:vercel
```

### Solución de problemas de despliegue

Si encuentras el error "Function size too large":

1. Asegúrate de que el proyecto esté limpio (`./scripts/prepare-deploy.sh`)
2. Verifica que `.vercelignore` esté configurado correctamente
3. Usa solo las dependencias necesarias para producción

## 🚂 Despliegue en Railway

1. Instalar la CLI de Railway:

```bash
brew install railway
```

2. Login en Railway:

```bash
railway login
```

3. Vincular el proyecto:

```bash
railway init
```

4. Configurar variables de entorno en Railway:

   - DATABASE_URL
   - NODE_ENV
   - JWT_SECRET
   - JWT_EXPIRATION

5. Desplegar la aplicación:

```bash
railway up
```

La aplicación se desplegará automáticamente cuando se haga push a la rama principal.
