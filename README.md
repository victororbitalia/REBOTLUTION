# Rebotlution - Despliegue en EasyPanel con Docker

Rebotlution es una aplicación web estática que presenta un agente de IA para restaurantes. Esta guía explica cómo desplegarla en EasyPanel usando Docker.

## Arquitectura

La aplicación está construida como un sitio web estático con:
- HTML5 para la estructura
- CSS3 para los estilos
- JavaScript para la interactividad
- Nginx como servidor web

## Requisitos Previos

- Docker instalado en el servidor
- EasyPanel instalado y configurado
- Acceso a la línea de comandos del servidor

## Archivos de Despliegue

El proyecto incluye los siguientes archivos para facilitar el despliegue:

- `Dockerfile`: Configuración para construir la imagen Docker
- `docker-compose.yml`: Configuración para orquestar los contenedores
- `nginx.conf`: Configuración optimizada de Nginx
- `easypanel-nginx.conf`: Configuración específica para EasyPanel
- `.dockerignore`: Archivos a excluir de la imagen Docker

## Despliegue en EasyPanel

### Opción 1: Usando Docker Compose (Recomendado)

1. **Subir los archivos al servidor**
   ```bash
   # Copiar todos los archivos del proyecto al servidor
   scp -r /ruta/local/Rebotlution usuario@servidor:/ruta/del/servidor/
   ```

2. **Acceder al servidor y navegar al directorio**
   ```bash
   ssh usuario@servidor
   cd /ruta/del/servidor/Rebotlution
   ```

3. **Construir y ejecutar con Docker Compose**
   ```bash
   docker-compose up -d --build
   ```

4. **Verificar el despliegue**
   ```bash
   docker-compose ps
   docker-compose logs rebotlution
   ```

### Opción 2: Usando la interfaz de EasyPanel

1. **Crear un nuevo sitio en EasyPanel**
   - Inicia sesión en EasyPanel
   - Haz clic en "Sites" → "Add Site"
   - Selecciona "Docker" como tipo de sitio
   - Configura el dominio y puerto (ej. puerto 8080)

2. **Configurar el contenedor Docker**
   - En la configuración del sitio, selecciona "Custom Docker Image"
   - Usa la imagen: `rebotlution:latest`
   - Configura el puerto interno: 80
   - Configura el puerto externo: 8080

3. **Subir los archivos del proyecto**
   - Usa el gestor de archivos de EasyPanel para subir todos los archivos
   - Asegúrate de incluir el Dockerfile y nginx.conf

4. **Construir la imagen**
   - En la terminal de EasyPanel, ejecuta:
   ```bash
   cd /ruta/del/proyecto
   docker build -t rebotlution:latest .
   ```

5. **Iniciar el contenedor**
   - Usa la interfaz de EasyPanel para iniciar el contenedor con la imagen creada

### Opción 3: Usando Docker directamente

1. **Construir la imagen**
   ```bash
   docker build -t rebotlution:latest .
   ```

2. **Ejecutar el contenedor**
   ```bash
   docker run -d \
     --name rebotlution-app \
     -p 8080:80 \
     --restart unless-stopped \
     rebotlution:latest
   ```

## Configuración de Nginx

La configuración de Nginx incluye:

- **Compresión Gzip**: Para reducir el tamaño de los archivos transferidos
- **Caché de archivos estáticos**: Para mejorar el rendimiento
- **Cabeceras de seguridad**: Para proteger la aplicación
- **Manejo de CORS**: Para las fuentes y recursos externos

## Variables de Entorno

La aplicación utiliza las siguientes variables de entorno:

- `NODE_ENV`: Configurado como 'production' para optimización

## Monitoreo y Logs

### Ver logs del contenedor
```bash
docker-compose logs -f rebotlution
```

### Ver estado del contenedor
```bash
docker-compose ps
```

### Reiniciar el contenedor
```bash
docker-compose restart rebotlution
```

## Actualización de la Aplicación

Para actualizar la aplicación:

1. **Subir los nuevos archivos**
   ```bash
   # Subir los archivos modificados al servidor
   scp -r /ruta/local/Rebotlution/* usuario@servidor:/ruta/del/servidor/Rebotlution/
   ```

2. **Reconstruir y reiniciar**
   ```bash
   cd /ruta/del/servidor/Rebotlution
   docker-compose down
   docker-compose up -d --build
   ```

## Solución de Problemas

### La aplicación no se carga

1. Verifica que el contenedor esté en ejecución:
   ```bash
   docker-compose ps
   ```

2. Revisa los logs para detectar errores:
   ```bash
   docker-compose logs rebotlution
   ```

3. Verifica que el puerto esté disponible:
   ```bash
   netstat -tlnp | grep 8080
   ```

### Error 502 Bad Gateway

1. Verifica que Nginx se esté ejecutando dentro del contenedor:
   ```bash
   docker exec rebotlution-app ps aux | grep nginx
   ```

2. Reinicia el contenedor:
   ```bash
   docker-compose restart rebotlution
   ```

### Los archivos estáticos no se cargan

1. Verifica los permisos de los archivos:
   ```bash
   docker exec rebotlution-app ls -la /usr/share/nginx/html/
   ```

2. Revisa la configuración de Nginx:
   ```bash
   docker exec rebotlution-app nginx -t
   ```

## Rendimiento y Optimización

La configuración incluye varias optimizaciones:

- **Compresión Gzip**: Reduce el tamaño de transferencia hasta en 70%
- **Caché de navegador**: Para archivos estáticos (1 año)
- **Sin caché para HTML**: Para asegurar actualizaciones inmediatas
- **Keep-alive**: Para reutilizar conexiones TCP

## Seguridad

La configuración incluye varias medidas de seguridad:

- **Cabeceras de seguridad**: XSS Protection, Content Type Options, etc.
- **Política de contenido**: Restricción de fuentes de contenido
- **Ocultación de versión**: No se expone la versión de Nginx
- **Limitación de tamaño**: Límite de 20MB para uploads

## Contacto y Soporte

Para problemas relacionados con el despliegue en EasyPanel:

1. Revisa esta documentación primero
2. Consulta los logs del contenedor
3. Verifica la configuración de red y puertos
4. Contacta al equipo de soporte si el problema persiste

## Licencia

Este proyecto de despliegue está bajo la misma licencia que la aplicación Rebotlution.