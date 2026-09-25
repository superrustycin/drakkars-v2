# Plantillas de flyer — Drakkars × Mesón Terraza León

Cinco diseños que comparten los mismos datos del evento. Cambias los artistas una vez y todos los diseños se actualizan.

| # | Diseño | Estilo |
|---|--------|------|
| 1 | **Oro y Vino** | Clásico centrado: negro, oro y trazo vino del logo del Mesón. Marco dorado doble. |
| 2 | **Aurora** | Mismo lenguaje del sitio web: aurora neón (violeta, magenta, cian), glass cards y botón dorado. |
| 3 | **Dúo** | Split vertical con foto de cada headliner (vino / violeta) y separador dorado. |
| 4 | **Editorial** | Tipográfico, con el número del día en grande y un talón de boleto dorado con QR. |
| 5 | **Art Déco** | Vino profundo, sunburst detrás del logo, marco dorado con esquinas déco y fuente serif. |

Mockups listos en `mockups/` (PNG de 2160 px de ancho, post 4:5 y story 9:16).

## Cómo hacer un flyer nuevo

1. **Edita `event.js`**: artistas, fecha, horario, precios, link de boletos, redes y letra chica.
   Si dejas un campo vacío (`""` o `[]`), se oculta. Los nombres largos se ajustan solos al ancho.
2. **Fotos de artistas** (se usan en el diseño 3): guárdalas en `assets/artistas/` y pon la ruta en
   `photo`, p. ej. `photo: "assets/artistas/gox.jpg"`. Mientras no haya foto, se muestra una silueta.
3. **Vista previa**: abre `flyers/index.html` en el navegador (galería de los 5), o un diseño suelto con
   `flyer.html?v=1..5&f=post|story`.
4. **Exportar PNG** (requiere Playwright): `node flyers/render.mjs` exporta todos los diseños.
   `node flyers/render.mjs 2 story` exporta solo el diseño 2 en formato story.

## Qué incluye cada flyer

Línea "presenta", logos de Drakkars y del Mesón Terraza León, nombre de la noche y género, headliners con
tipo de set, artistas invitados, día, fecha y horario, recinto y dirección, precios por tipo de acceso,
QR a la venta de boletos, "sin cargos ocultos", reservaciones, +18, dress code, aforo controlado, redes,
hashtag y letra chica de admisión. Los formatos son post de Instagram 1080×1350 y story 1080×1920; los
márgenes del story dejan libres las zonas que tapa la interfaz de Instagram.

Colores y fuentes del sitio: obsidian `#08070B`, oro `#D4AF37` / `#F4CE6E` / `#8A7226`, neón violeta
`#8B5CF6`, magenta `#E1379F` y cian `#3EE8E0`, más el vino `#7A1426` del logo del Mesón. Las fuentes son
Livingstone (`public/fonts`), Sora y Manrope; Cinzel se usa en los diseños 1 y 5. Todas se cargan de forma local.
