# Usar directamente nginx como imagen base para aplicación estática
FROM nginx:alpine

# Instalar utilidades necesarias
RUN apk add --no-cache \
    gzip \
    && rm -rf /var/cache/apk/*

# Copiar archivos de la aplicación al directorio de Nginx
COPY . /usr/share/nginx/html

# Crear un enlace simbólico de Rebotlution.html a index.html para compatibilidad
RUN ln -sf /usr/share/nginx/html/Rebotlution.html /usr/share/nginx/html/index.html

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