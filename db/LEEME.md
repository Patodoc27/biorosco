# Activar la clasificación compartida

El juego ya trae todo listo. Solo falta crear la tabla en Supabase **una sola vez**:

1. Entrá a [supabase.com](https://supabase.com) → tu proyecto (el mismo de las otras apps).
2. Menú lateral → **SQL Editor** → **New query**.
3. Pegá todo el contenido de `biorosco.sql` → **Run**.
4. Listo: cada partida terminada suma puntos a la persona y la Clasificación pasa a ser compartida entre todos los celulares.

La tabla reconoce a la misma persona aunque escriba su nombre distinto (sin tildes, con doble espacio o una letra repetida al final), y junta los puntos de todas sus partidas en los modos Solo, Contra Boti y En línea.
