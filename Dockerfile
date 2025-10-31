# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json (si existen)
COPY package*.json ./

# Instalar dependencias (si existen)
RUN npm install --production

# Copiar todos los archivos de la aplicación
COPY . .

# Etapa 2: Producción con Nginx
FROM nginx:alpine

# Instalar utilidades necesarias
RUN apk add --no-cache \
    gzip \
    && rm -rf /var/cache/apk/*

# Copiar archivos de la aplicación al directorio de Nginx
COPY --from=builder /app /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Crear directorios necesarios
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/run

# Establecer permisos
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /var/run /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]