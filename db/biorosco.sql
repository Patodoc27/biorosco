-- BIOROSCO · Base de jugadores compartida
-- Correr UNA SOLA VEZ en Supabase → SQL Editor → "Run".
-- Crea la tabla biorosco_jugadores y la función biorosco_sumar que el juego
-- usa para registrar a cada persona y acumularle puntos.

create table if not exists public.biorosco_jugadores (
  clave       text primary key,          -- nombre+apellido normalizados (sin tildes, sin dobles letras/espacios)
  nombre      text not null,
  apellido    text not null default '',
  seccion     text not null default '',
  avatar      int  not null default 0,
  puntos      int  not null default 0,
  aciertos    int  not null default 0,
  partidas    int  not null default 0,
  creado      timestamptz not null default now(),
  actualizado timestamptz not null default now()
);

alter table public.biorosco_jugadores enable row level security;

-- El juego entra sin login (anon key): lectura y escritura abiertas solo a esta tabla.
drop policy if exists biorosco_lectura on public.biorosco_jugadores;
create policy biorosco_lectura on public.biorosco_jugadores
  for select to anon, authenticated using (true);

drop policy if exists biorosco_escritura on public.biorosco_jugadores;
create policy biorosco_escritura on public.biorosco_jugadores
  for insert to anon, authenticated with check (true);

drop policy if exists biorosco_edicion on public.biorosco_jugadores;
create policy biorosco_edicion on public.biorosco_jugadores
  for update to anon, authenticated using (true) with check (true);

-- Suma atómica: una partida terminada suma puntos/aciertos/partidas a la misma persona.
create or replace function public.biorosco_sumar(
  p_clave text, p_nombre text, p_apellido text,
  p_seccion text, p_avatar int, p_puntos int, p_aciertos int
) returns void
language plpgsql security definer set search_path = public as $$
begin
  insert into public.biorosco_jugadores
    (clave, nombre, apellido, seccion, avatar, puntos, aciertos, partidas)
  values
    (p_clave, p_nombre, p_apellido, p_seccion, p_avatar, p_puntos, p_aciertos, 1)
  on conflict (clave) do update set
    nombre      = excluded.nombre,
    apellido    = excluded.apellido,
    seccion     = excluded.seccion,
    avatar      = excluded.avatar,
    puntos      = public.biorosco_jugadores.puntos   + excluded.puntos,
    aciertos    = public.biorosco_jugadores.aciertos + excluded.aciertos,
    partidas    = public.biorosco_jugadores.partidas + 1,
    actualizado = now();
end;
$$;

grant execute on function public.biorosco_sumar(text,text,text,text,int,int,int) to anon, authenticated;
