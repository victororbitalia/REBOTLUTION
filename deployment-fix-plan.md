# Plan para Solucionar el Error de Despliegue

## Problema Identificado

El error en el despliegue es:
```
ERROR: failed to calculate checksum of ref 2cf00531-94d6-4e2e-a2ca-84b341faab10::kbndi24ydhwb6k5bm3vd7csbl: "/nginx.conf": not found
```

## Causa Raíz

El archivo `nginx.conf` está siendo excluido del contexto de construcción de Docker debido a que está listado en el archivo `.dockerignore` (línea 84).

## Solución Propuesta

### Opción 1: Modificar .dockerignore (Recomendado)

1. Editar el archivo `.dockerignore`
2. Comentar o eliminar la línea que excluye `nginx.conf`:
   ```
   # nginx.conf
   ```
3. Esto permitirá que el archivo `nginx.conf` se incluya en el contexto de construcción

### Opción 2: Usar easypanel-nginx.conf

1. Modificar el Dockerfile para usar `easypanel-nginx.conf` en lugar de `nginx.conf`
2. Cambiar la línea 28 del Dockerfile:
   ```
   COPY easypanel-nginx.conf /etc/nginx/conf.d/default.conf
   ```
3. Esto usaría el archivo de configuración específico para EasyPanel

## Pasos para Implementar la Solución (Opción 1)

1. **Modificar .dockerignore**:
   - Editar la línea 84 para comentar la exclusión de nginx.conf
   - Cambiar `nginx.conf` a `# nginx.conf`

2. **Verificar Dockerfile**:
   - Asegurarse de que la línea 28 sigue siendo:
   ```
   COPY nginx.conf /etc/nginx/nginx.conf
   ```

3. **Probar el despliegue**:
   - Ejecutar nuevamente el proceso de despliegue
   - Verificar que no aparezca el error de archivo no encontrado

## Justificación

La Opción 1 es recomendada porque:
- El archivo `nginx.conf` existente ya está configurado correctamente para la aplicación
- Incluye todas las directivas necesarias para un funcionamiento óptimo
- No requiere modificar el Dockerfile, que ya está configurado para usar este archivo

## Archivos a Modificar

1. `.dockerignore` - Línea 84
   - Cambiar: `nginx.conf`
   - Por: `# nginx.conf`

## Verificación

Después de aplicar los cambios, se debe verificar que:
1. El archivo `nginx.conf` esté presente en el contexto de construcción
2. El despliegue se complete sin errores
3. La aplicación sea accesible a través del navegador

## Diagrama de Flujo

```mermaid
graph TD
    A[Inicio del Despliegue] --> B[Docker Build]
    B --> C{¿nginx.conf en contexto?}
    C -->|No| D[ERROR: archivo no encontrado]
    C -->|Sí| E[Copiar nginx.conf]
    E --> F[Construcción exitosa]
    F --> G[Despliegue completado]
    D --> H[Modificar .dockerignore]
    H --> B