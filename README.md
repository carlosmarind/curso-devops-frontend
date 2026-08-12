# Proyecto frontend con pruebas de aceptación

Este proyecto es una aplicación web sencilla construida con React. Incluye pruebas de aceptación automatizadas que verifican que la aplicación funciona correctamente desde el punto de vista del usuario.

---

## Tecnologías utilizadas

| Tecnología | Para qué sirve |
|---|---|
| **Vite + React** | La aplicación web que se va a probar |
| **Cucumber** | Permite escribir las pruebas en lenguaje natural (Gherkin) |
| **Playwright** | Controla el navegador para ejecutar las pruebas |

---

## Configuración inicial

Estos pasos solo son necesarios la primera vez o en una máquina nueva.

**1. Instalar las dependencias del proyecto:**
```bash
npm install
```

**2. Instalar las dependencias de sistema que necesita Playwright:**
```bash
npx playwright install-deps
```

**3. Instalar los navegadores que usará Playwright:**
```bash
npx playwright install
```

---

## Ejecutar las pruebas

```bash
npm run test
```

Al terminar, se genera un reporte visual en `tests/reports/cucumber_report.html`. Ábrelo en el navegador para ver el resultado detallado de cada prueba.

---

## Estructura de los tests

```
tests/
└── acceptance/
    ├── features/               # Pruebas escritas en lenguaje natural (Gherkin)
    │   ├── contador.feature
    │   └── login.feature
    └── step_definitions/       # Código que ejecuta cada paso de las pruebas
        ├── contador.ts
        ├── login.ts
        └── config/
            └── hooks.ts        # Configuración del navegador (abre y cierra entre pruebas)
```

---

## Cómo funciona una prueba

Las pruebas están divididas en dos partes que trabajan juntas:

**1. El archivo `.feature`** describe qué debe hacer la aplicación en lenguaje natural:

```gherkin
Scenario: El contador es incrementado
    Given el usuario visita el home del sitio
    When el usuario hace click en el boton +
    Then el usuario ve el contador incrementarse en una unidad.
```

**2. El archivo `step_definitions`** contiene el código que ejecuta cada línea anterior en el navegador:

```typescript
When('el usuario hace click en el boton +', async function (this: CustomWorld) {
    await this.page.locator('[data-testid="increase"]').click();
})
```

Cuando se corre `npm run test`, Cucumber conecta cada línea del `.feature` con su paso correspondiente y los ejecuta en orden.

---

## Cómo agregar una prueba nueva

1. Abre o crea un archivo `.feature` en `tests/acceptance/features/`
2. Escribe el escenario con `Scenario:`, `Given`, `When` y `Then`
3. Corre `npm run test` — Cucumber mostrará en consola los pasos que no tienen código todavía
4. Copia los snippets sugeridos en el archivo `.ts` correspondiente dentro de `step_definitions/`
5. Implementa el código de cada paso usando `this.page` para interactuar con el navegador
6. Vuelve a correr `npm run test` para verificar que todo pasa
