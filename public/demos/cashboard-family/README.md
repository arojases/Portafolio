# CashBoard Family · demo histórica

Esta compilación recupera el frontend estático del [primer commit de CashBoard Family](https://github.com/arojases/CashBoard-Family/tree/1b9f7d5906d160d3db72e08f93b47ba703de2b5a/frontend). Usa datos ficticios de la revisión original. Los movimientos que se agregan existen durante la sesión de la página.

Para reproducir la compilación, extrae solo `frontend/` de esa revisión. Aplica `scripts/cashboard-demo.patch` desde la raíz del checkout histórico con `git apply <ruta-al-parche>`. El parche añade el aviso bilingüe, el enlace al caso de estudio y el restablecimiento, y sustituye los nombres de ejemplo. Desde `frontend/`, ejecuta `npm ci` y `npm run build -- --base-href ./`. Copia los archivos de `dist/client/browser/` y el aviso `dist/client/3rdpartylicenses.txt` a este directorio.

La aplicación full stack actual tiene sus propias instrucciones en el [repositorio de CashBoard Family](https://github.com/arojases/CashBoard-Family).
