# Rebotlution - Agentes IA para Restaurantes

Una aplicación web funcional para un sistema de gestión de restaurantes con agentes de voz inteligentes.

## Características

- **Diseño Responsivo**: Adaptado para todos los dispositivos (móvil, tablet, escritorio)
- **Navegación Suave**: Scroll suave entre secciones con indicadores activos
- **Formularios Validados**: Validación de formularios de contacto y solicitudes de demo
- **Modales Interactivos**: Ventanas modales para solicitudes de demo
- **Animaciones**: Animaciones sutiles al hacer scroll para mejorar la experiencia de usuario
- **Diseño Moderno**: Interfaz limpia y profesional basada en el mockup original

## Estructura del Proyecto

```
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos CSS
├── js/
│   └── app.js         # Funcionalidad JavaScript
├── assets/
│   └── images/        # Imágenes (placeholder)
├── Dockerfile         # Configuración de Docker
├── nginx.conf         # Configuración de Nginx
└── README.md         # Documentación
```

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño con Flexbox y Grid
- **JavaScript Vanilla**: Funcionalidad interactiva sin dependencias
- **Docker**: Contenerización para despliegue
- **Nginx**: Servidor web para producción

## Funcionalidades Implementadas

### Navegación
- Menú de navegación fijo con enlaces a secciones
- Indicador visual de sección activa
- Menú hamburguesa para dispositivos móviles

### Secciones
- **Hero**: Presentación principal con llamada a la acción
- **Beneficios**: Ventajas del producto
- **Características**: Funcionalidades detalladas
- **Cómo Funciona**: Proceso de implementación
- **Por Qué Elegirnos**: Diferenciadores
- **Precios**: Planes disponibles
- **Contacto**: Formulario de contacto e información

### Interactividad
- Formularios con validación en tiempo real
- Modales para solicitudes de demo
- Animaciones al hacer scroll
- Transiciones suaves en elementos interactivos

### Diseño Responsivo
- Adaptación a diferentes tamaños de pantalla
- Optimización para dispositivos móviles
- Reorganización de elementos en pantallas pequeñas

## Instalación y Despliegue

### Desarrollo Local

1. Clona el repositorio
2. Abre `index.html` en tu navegador

### Despliegue con Docker

1. Construye la imagen:
   ```bash
   docker build -t rebotlution .
   ```

2. Ejecuta el contenedor:
   ```bash
   docker run -p 8080:80 rebotlution
   ```

3. Accede a la aplicación en `http://localhost:8080`

## Personalización

### Colores y Estilos
Los colores principales están definidos en `css/style.css`:
- Negro: `#000` (para botones y texto principal)
- Amarillo: `#ffc816` (para acentos y elementos destacados)
- Gris claro: `#ebebeb` (para fondos de secciones)

### Contenido
El contenido se puede modificar directamente en `index.html`:
- Textos y descripciones
- Enlaces de navegación
- Información de contacto

## Mejoras Futuras

- Integración con backend real
- Sistema de autenticación
- Panel de administración
- Integración con APIs externas
- Sistema de notificaciones

## Licencia

Este proyecto es para fines demostrativos basados en el mockup original de Rebotlution.