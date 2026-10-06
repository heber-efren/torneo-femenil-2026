-- =====================================================================
-- 001_esquema.sql
-- Torneo Femenil 2026 · X-Hazil Sur
--
-- Crea las tablas, sus relaciones y las reglas de integridad.
-- También carga la configuración real del torneo (1 fila en "torneo"
-- y las 2 fases). No crea equipos, jugadoras ni partidos.
-- Activa RLS en todas las tablas: hasta ejecutar 002, el sitio web no
-- puede leer ni escribir nada (es lo esperado).
--
-- Cómo ejecutarla: Supabase → SQL Editor → New query → pegar todo → Run.
-- Ejecútala UNA sola vez. Si algo falla, no se guarda nada (begin/commit).
-- =====================================================================

begin;

-- ---------------------------------------------------------------------
-- Utilidad: actualizar "updated_at" automáticamente al modificar una fila
-- ---------------------------------------------------------------------
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;


-- =====================================================================
-- 1. TORNEO (una sola fila con la configuración general)
-- =====================================================================
create table public.torneo (
  id              smallint primary key default 1,
  nombre          text not null,
  comunidad       text not null,
  anio            smallint not null,
  descripcion     text,
  reglamento      text,
  puntos_victoria smallint not null default 3,
  puntos_empate   smallint not null default 1,
  puntos_derrota  smallint not null default 0,
  zona_horaria    text not null default 'America/Cancun',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  constraint torneo_fila_unica      check (id = 1),
  constraint torneo_nombre_valido   check (length(btrim(nombre)) between 2 and 120),
  constraint torneo_comunidad_valida check (length(btrim(comunidad)) between 2 and 120),
  constraint torneo_anio_valido     check (anio between 2000 and 2100),
  constraint torneo_puntos_validos  check (
    puntos_derrota >= 0 and puntos_empate >= puntos_derrota and puntos_victoria > puntos_empate
  )
);

comment on table public.torneo is
  'Configuración general. Siempre existe exactamente una fila (id = 1). Nombre visible = nombre + año.';


-- =====================================================================
-- 2. FASES (formato configurable: fase regular, final, etc.)
-- =====================================================================
create table public.fases (
  id                bigint generated always as identity primary key,
  nombre            text not null,
  tipo              text not null,
  orden             smallint not null,
  cuenta_para_tabla boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  constraint fases_nombre_unico  unique (nombre),
  constraint fases_orden_unico   unique (orden),
  constraint fases_nombre_valido check (length(btrim(nombre)) between 2 and 60),
  constraint fases_tipo_valido   check (tipo in ('liga', 'eliminatoria')),
  constraint fases_orden_valido  check (orden > 0),
  -- Solo una fase de liga puede sumar puntos a la tabla de posiciones
  constraint fases_tabla_solo_liga check (not cuenta_para_tabla or tipo = 'liga')
);

comment on column public.fases.cuenta_para_tabla is
  'true = sus partidos suman a la tabla de posiciones y a las estadísticas de equipo (fase regular).';


-- =====================================================================
-- 3. EQUIPOS
-- =====================================================================
create table public.equipos (
  id               bigint generated always as identity primary key,
  nombre           text not null,
  abreviatura      text not null,
  slug             text not null,
  escudo_path      text,
  color_primario   text not null default '#6d28d9',
  color_secundario text not null default '#ffffff',
  entrenador       text,
  descripcion      text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  constraint equipos_nombre_valido      check (length(btrim(nombre)) between 2 and 60),
  constraint equipos_abreviatura_valida check (abreviatura ~ '^[A-ZÑ0-9]{2,4}$'),
  constraint equipos_slug_valido        check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint equipos_color1_valido      check (color_primario ~ '^#[0-9a-fA-F]{6}$'),
  constraint equipos_color2_valido      check (color_secundario ~ '^#[0-9a-fA-F]{6}$'),
  constraint equipos_escudo_es_ruta     check (escudo_path is null or escudo_path !~ '^[a-z]+://')
);

create unique index equipos_nombre_unico      on public.equipos (lower(btrim(nombre)));
create unique index equipos_slug_unico        on public.equipos (slug);
create unique index equipos_abreviatura_unica on public.equipos (abreviatura);

comment on column public.equipos.abreviatura is 'De 2 a 4 letras mayúsculas o números. Ej.: TIG. Se usa en la tabla en celular.';
comment on column public.equipos.escudo_path is 'Ruta del archivo dentro del bucket "escudos" de Storage (no la URL completa).';


-- =====================================================================
-- 4. JUGADORAS
-- =====================================================================
create table public.jugadoras (
  id         bigint generated always as identity primary key,
  equipo_id  bigint not null,
  nombre     text not null,
  numero     smallint,
  posicion   text,
  foto_path  text,
  activa     boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Si se elimina un equipo (sin partidos), se eliminan sus jugadoras.
  -- Si alguna ya tiene goles o alineaciones, la eliminación se bloquea.
  constraint jugadoras_equipo_fk     foreign key (equipo_id) references public.equipos (id) on delete cascade,
  constraint jugadoras_nombre_valido check (length(btrim(nombre)) between 2 and 80),
  constraint jugadoras_numero_valido check (numero between 0 and 99),
  constraint jugadoras_posicion_valida check (posicion in ('portera', 'defensa', 'media', 'delantera')),
  constraint jugadoras_foto_es_ruta  check (foto_path is null or foto_path !~ '^[a-z]+://')
);

-- Un número no se repite entre jugadoras ACTIVAS del mismo equipo
create unique index jugadoras_numero_unico_por_equipo
  on public.jugadoras (equipo_id, numero)
  where activa and numero is not null;
create index jugadoras_equipo_idx on public.jugadoras (equipo_id);


-- =====================================================================
-- 5. PARTIDOS (el marcador vive aquí; no hay tabla "resultados")
-- =====================================================================
create table public.partidos (
  id                  bigint generated always as identity primary key,
  fase_id             bigint not null,
  jornada             smallint,
  fecha_hora          timestamptz,
  campo               text,
  equipo_local_id     bigint,
  equipo_visitante_id bigint,
  etiqueta_local      text,
  etiqueta_visitante  text,
  estado              text not null default 'programado',
  goles_local         smallint,
  goles_visitante     smallint,
  penales_local       smallint,
  penales_visitante   smallint,
  notas               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  constraint partidos_fase_fk      foreign key (fase_id)             references public.fases (id)   on delete restrict,
  constraint partidos_local_fk     foreign key (equipo_local_id)     references public.equipos (id) on delete restrict,
  constraint partidos_visitante_fk foreign key (equipo_visitante_id) references public.equipos (id) on delete restrict,

  constraint partidos_jornada_valida check (jornada between 1 and 50),
  constraint partidos_estado_valido  check (estado in ('programado', 'en_juego', 'finalizado', 'aplazado', 'suspendido')),
  constraint partidos_equipos_distintos check (equipo_local_id <> equipo_visitante_id),
  -- Cada lado necesita un equipo o, mientras no se conozca, una etiqueta ("1.º lugar")
  constraint partidos_local_identificado     check (equipo_local_id is not null or nullif(btrim(etiqueta_local), '') is not null),
  constraint partidos_visitante_identificado check (equipo_visitante_id is not null or nullif(btrim(etiqueta_visitante), '') is not null),

  constraint partidos_goles_validos   check (goles_local between 0 and 99 and goles_visitante between 0 and 99),
  constraint partidos_penales_validos check (penales_local between 0 and 99 and penales_visitante between 0 and 99),
  constraint partidos_marcador_completo check ((goles_local is null) = (goles_visitante is null)),
  constraint partidos_penales_completos check ((penales_local is null) = (penales_visitante is null)),
  -- Un partido programado o aplazado no tiene marcador
  constraint partidos_marcador_segun_estado check (estado not in ('programado', 'aplazado') or goles_local is null),
  -- Un partido finalizado tiene ambos equipos y marcador
  constraint partidos_finalizado_completo check (
    estado <> 'finalizado'
    or (equipo_local_id is not null and equipo_visitante_id is not null and goles_local is not null)
  ),
  -- Penales: solo con marcador empatado y la tanda debe tener ganador
  constraint partidos_penales_solo_con_empate check (
    penales_local is null
    or (goles_local is not null and goles_local = goles_visitante and penales_local <> penales_visitante)
  )
);

create index partidos_fase_jornada_idx on public.partidos (fase_id, jornada);
create index partidos_local_idx        on public.partidos (equipo_local_id);
create index partidos_visitante_idx    on public.partidos (equipo_visitante_id);
create index partidos_fecha_idx        on public.partidos (fecha_hora);
create index partidos_estado_idx       on public.partidos (estado);

comment on column public.partidos.etiqueta_local is 'Texto mientras el equipo no se conoce. Ej.: "1.º lugar" en la final.';


-- =====================================================================
-- 6. ALINEACIONES (quién jugó cada partido y quién fue la portera)
-- =====================================================================
create table public.alineaciones (
  partido_id  bigint not null,
  jugadora_id bigint not null,
  equipo_id   bigint not null,
  fue_portera boolean not null default false,
  created_at  timestamptz not null default now(),

  constraint alineaciones_pk          primary key (partido_id, jugadora_id),
  -- Al borrar un partido se borra su alineación (no quedan datos huérfanos)
  constraint alineaciones_partido_fk  foreign key (partido_id)  references public.partidos (id)  on delete cascade,
  constraint alineaciones_jugadora_fk foreign key (jugadora_id) references public.jugadoras (id) on delete restrict,
  constraint alineaciones_equipo_fk   foreign key (equipo_id)   references public.equipos (id)   on delete restrict
);

-- Una sola portera por equipo en cada partido
create unique index alineaciones_una_portera_por_equipo
  on public.alineaciones (partido_id, equipo_id)
  where fue_portera;
create index alineaciones_jugadora_idx on public.alineaciones (jugadora_id);
create index alineaciones_equipo_idx   on public.alineaciones (equipo_id);


-- =====================================================================
-- 7. GOLES (los penales de la tanda NO se registran aquí)
-- =====================================================================
create table public.goles (
  id           bigint generated always as identity primary key,
  partido_id   bigint not null,
  equipo_id    bigint not null,
  goleadora_id bigint,
  asistente_id bigint,
  minuto       smallint,
  autogol      boolean not null default false,
  created_at   timestamptz not null default now(),

  -- Al borrar un partido se borran sus goles (no quedan datos huérfanos)
  constraint goles_partido_fk   foreign key (partido_id)   references public.partidos (id)  on delete cascade,
  constraint goles_equipo_fk    foreign key (equipo_id)    references public.equipos (id)   on delete restrict,
  constraint goles_goleadora_fk foreign key (goleadora_id) references public.jugadoras (id) on delete restrict,
  constraint goles_asistente_fk foreign key (asistente_id) references public.jugadoras (id) on delete restrict,

  constraint goles_minuto_valido check (minuto between 1 and 130),
  constraint goles_asistente_distinta check (asistente_id <> goleadora_id),
  constraint goles_autogol_sin_asistencia check (not autogol or asistente_id is null)
);

create index goles_partido_idx   on public.goles (partido_id);
create index goles_equipo_idx    on public.goles (equipo_id);
create index goles_goleadora_idx on public.goles (goleadora_id);
create index goles_asistente_idx on public.goles (asistente_id);

comment on column public.goles.equipo_id    is 'Equipo al que se le suma el gol en el marcador (en un autogol, el equipo beneficiado).';
comment on column public.goles.goleadora_id is 'null = goleadora no identificada: cuenta en el marcador, no en la tabla de goleadoras.';


-- =====================================================================
-- 8. DESEMPATE POR SORTEO (solo se usa si persiste un empate en la tabla)
-- =====================================================================
create table public.desempate_sorteo (
  equipo_id  bigint primary key,
  orden      smallint not null,
  created_at timestamptz not null default now(),

  constraint desempate_equipo_fk    foreign key (equipo_id) references public.equipos (id) on delete cascade,
  constraint desempate_orden_unico  unique (orden),
  constraint desempate_orden_valido check (orden > 0)
);

comment on table public.desempate_sorteo is
  'Resultado del sorteo: orden 1 queda arriba. Solo se consulta cuando puntos, DG, GF y enfrentamiento directo no desempatan.';


-- =====================================================================
-- 9. NOTICIAS
-- =====================================================================
create table public.noticias (
  id           bigint generated always as identity primary key,
  titulo       text not null,
  slug         text not null,
  resumen      text,
  contenido    text not null default '',
  portada_path text,
  publicada    boolean not null default false,
  publicada_en timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  constraint noticias_slug_unico      unique (slug),
  constraint noticias_titulo_valido   check (length(btrim(titulo)) between 3 and 160),
  constraint noticias_slug_valido     check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint noticias_resumen_valido  check (length(resumen) <= 300),
  constraint noticias_portada_es_ruta check (portada_path is null or portada_path !~ '^[a-z]+://'),
  constraint noticias_fecha_publicacion check (not publicada or publicada_en is not null)
);

create index noticias_publicadas_idx on public.noticias (publicada, publicada_en desc);


-- =====================================================================
-- 10. GALERÍA
-- =====================================================================
create table public.galeria (
  id          bigint generated always as identity primary key,
  imagen_path text not null,
  titulo      text,
  descripcion text,
  partido_id  bigint,
  orden       integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  -- Si se borra el partido, la foto se conserva sin partido asociado
  constraint galeria_partido_fk  foreign key (partido_id) references public.partidos (id) on delete set null,
  constraint galeria_imagen_es_ruta check (imagen_path !~ '^[a-z]+://' and length(btrim(imagen_path)) > 0)
);

create index galeria_partido_idx on public.galeria (partido_id);
create index galeria_orden_idx   on public.galeria (orden, created_at desc);


-- =====================================================================
-- ROW LEVEL SECURITY activado desde el inicio.
-- Sin políticas, nadie puede leer ni escribir desde la web. Las
-- políticas (lectura pública, escritura solo admin) se crean en 002.
-- =====================================================================
alter table public.torneo           enable row level security;
alter table public.fases            enable row level security;
alter table public.equipos          enable row level security;
alter table public.jugadoras        enable row level security;
alter table public.partidos         enable row level security;
alter table public.alineaciones     enable row level security;
alter table public.goles            enable row level security;
alter table public.desempate_sorteo enable row level security;
alter table public.noticias         enable row level security;
alter table public.galeria          enable row level security;


-- =====================================================================
-- REGLAS DE INTEGRIDAD (triggers)
-- Validan lo que una restricción CHECK no puede ver porque involucra
-- varias tablas. Los mensajes están en español para mostrarlos en el panel.
-- =====================================================================

-- Equipo con el que jugó una jugadora en un partido: el de su alineación
-- y, si no está en la alineación, su equipo actual.
create function public.equipo_de_jugadora_en_partido(p_partido_id bigint, p_jugadora_id bigint)
returns bigint
language sql
stable
set search_path = ''
as $$
  select coalesce(
    (select a.equipo_id from public.alineaciones a
      where a.partido_id = p_partido_id and a.jugadora_id = p_jugadora_id),
    (select j.equipo_id from public.jugadoras j where j.id = p_jugadora_id)
  );
$$;


-- ---------- Partidos ----------
create function public.validar_partido()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_fase public.fases%rowtype;
begin
  select * into v_fase from public.fases where id = new.fase_id;
  if not found then
    return new;  -- la clave foránea mostrará el error
  end if;

  if v_fase.tipo = 'liga' then
    if new.jornada is null then
      raise exception 'Los partidos de "%" necesitan número de jornada.', v_fase.nombre
        using errcode = 'check_violation';
    end if;
    if new.penales_local is not null then
      raise exception 'Los penales solo existen en partidos de eliminación, como la final.'
        using errcode = 'check_violation';
    end if;
  end if;

  if v_fase.tipo = 'eliminatoria'
     and new.estado = 'finalizado'
     and new.goles_local = new.goles_visitante
     and new.penales_local is null then
    raise exception 'El partido de "%" terminó empatado: registra el resultado de la tanda de penales.', v_fase.nombre
      using errcode = 'check_violation';
  end if;

  -- Un equipo no puede jugar dos partidos en la misma jornada de la misma fase
  if new.jornada is not null and exists (
    select 1
    from public.partidos p
    where p.fase_id = new.fase_id
      and p.jornada = new.jornada
      and p.id <> new.id
      and (p.equipo_local_id     in (new.equipo_local_id, new.equipo_visitante_id)
        or p.equipo_visitante_id in (new.equipo_local_id, new.equipo_visitante_id))
  ) then
    raise exception 'Uno de los equipos ya tiene partido en la jornada % de "%".', new.jornada, v_fase.nombre
      using errcode = 'check_violation';
  end if;

  return new;
end;
$$;

create trigger partidos_validar
  before insert or update on public.partidos
  for each row execute function public.validar_partido();


-- ---------- Alineaciones ----------
create function public.validar_alineacion()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_local bigint;
  v_visitante bigint;
  v_equipo_jugadora bigint;
begin
  select equipo_local_id, equipo_visitante_id into v_local, v_visitante
  from public.partidos where id = new.partido_id;
  if not found then
    return new;  -- la clave foránea mostrará el error
  end if;

  if new.equipo_id is distinct from v_local and new.equipo_id is distinct from v_visitante then
    raise exception 'La alineación debe ser de uno de los dos equipos del partido.'
      using errcode = 'check_violation';
  end if;

  -- Al registrarla, la jugadora debe pertenecer a ese equipo
  if tg_op = 'INSERT'
     or new.jugadora_id <> old.jugadora_id
     or new.equipo_id <> old.equipo_id then
    select equipo_id into v_equipo_jugadora from public.jugadoras where id = new.jugadora_id;
    if found and v_equipo_jugadora <> new.equipo_id then
      raise exception 'La jugadora % no pertenece al equipo indicado en la alineación.', new.jugadora_id
        using errcode = 'check_violation';
    end if;
  end if;

  return new;
end;
$$;

create trigger alineaciones_validar
  before insert or update on public.alineaciones
  for each row execute function public.validar_alineacion();


-- ---------- Goles ----------
create function public.validar_gol()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  v_local bigint;
  v_visitante bigint;
  v_rival bigint;
  v_equipo bigint;
begin
  select equipo_local_id, equipo_visitante_id into v_local, v_visitante
  from public.partidos where id = new.partido_id;
  if not found then
    return new;  -- la clave foránea mostrará el error
  end if;

  if new.equipo_id is distinct from v_local and new.equipo_id is distinct from v_visitante then
    raise exception 'El gol debe ser de uno de los dos equipos del partido.'
      using errcode = 'check_violation';
  end if;

  v_rival := case when new.equipo_id = v_local then v_visitante else v_local end;

  if new.goleadora_id is not null then
    v_equipo := public.equipo_de_jugadora_en_partido(new.partido_id, new.goleadora_id);
    if new.autogol and v_equipo is distinct from v_rival then
      raise exception 'En un autogol, la jugadora debe ser del equipo rival.'
        using errcode = 'check_violation';
    elsif not new.autogol and v_equipo is distinct from new.equipo_id then
      raise exception 'La goleadora no pertenece al equipo que anotó.'
        using errcode = 'check_violation';
    end if;
  end if;

  if new.asistente_id is not null then
    v_equipo := public.equipo_de_jugadora_en_partido(new.partido_id, new.asistente_id);
    if v_equipo is distinct from new.equipo_id then
      raise exception 'La asistente no pertenece al equipo que anotó.'
        using errcode = 'check_violation';
    end if;
  end if;

  return new;
end;
$$;

create trigger goles_validar
  before insert or update on public.goles
  for each row execute function public.validar_gol();


-- ---------- Consistencia del resultado (se revisa al confirmar la operación) ----------
-- Garantiza, sin importar cómo se modifiquen los datos, que:
--   * un partido NO finalizado no tenga goles ni alineación;
--   * en un partido finalizado, los goles registrados sumen exactamente el marcador;
--   * goles y alineación correspondan a los equipos del partido.
create function public.verificar_partido(p_partido_id bigint)
returns void
language plpgsql
set search_path = ''
as $$
declare
  v public.partidos%rowtype;
  v_goles_local integer;
  v_goles_visitante integer;
  v_ajenos integer;
begin
  select * into v from public.partidos where id = p_partido_id;
  if not found then
    return;  -- el partido fue eliminado junto con sus goles y alineación
  end if;

  if v.estado <> 'finalizado' then
    if exists (select 1 from public.goles g where g.partido_id = v.id)
       or exists (select 1 from public.alineaciones a where a.partido_id = v.id) then
      raise exception 'El partido % no está finalizado pero tiene goles o alineación. Usa anular_resultado() para reiniciarlo.', v.id
        using errcode = 'check_violation';
    end if;
    return;
  end if;

  select count(*) filter (where g.equipo_id = v.equipo_local_id),
         count(*) filter (where g.equipo_id = v.equipo_visitante_id),
         count(*) filter (where g.equipo_id not in (v.equipo_local_id, v.equipo_visitante_id))
    into v_goles_local, v_goles_visitante, v_ajenos
  from public.goles g
  where g.partido_id = v.id;

  if v_ajenos > 0 or exists (
    select 1 from public.alineaciones a
    where a.partido_id = v.id and a.equipo_id not in (v.equipo_local_id, v.equipo_visitante_id)
  ) then
    raise exception 'El partido % tiene goles o alineación de un equipo que no jugó ese partido.', v.id
      using errcode = 'check_violation';
  end if;

  if v_goles_local <> v.goles_local or v_goles_visitante <> v.goles_visitante then
    raise exception 'El marcador del partido % (% - %) no coincide con los goles registrados (% - %).',
      v.id, v.goles_local, v.goles_visitante, v_goles_local, v_goles_visitante
      using errcode = 'check_violation';
  end if;
end;
$$;

create function public.trg_verificar_partido()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_table_name = 'partidos' then
    perform public.verificar_partido(new.id);
  else
    if tg_op in ('UPDATE', 'DELETE') then
      perform public.verificar_partido(old.partido_id);
    end if;
    if tg_op in ('INSERT', 'UPDATE') and (tg_op = 'INSERT' or new.partido_id <> old.partido_id) then
      perform public.verificar_partido(new.partido_id);
    end if;
  end if;
  return null;
end;
$$;

-- "deferrable initially deferred": se revisa al final de la transacción,
-- cuando el marcador, los goles y la alineación ya se guardaron juntos.
create constraint trigger partidos_verificar_consistencia
  after insert or update on public.partidos
  deferrable initially deferred
  for each row execute function public.trg_verificar_partido();

create constraint trigger goles_verificar_consistencia
  after insert or update or delete on public.goles
  deferrable initially deferred
  for each row execute function public.trg_verificar_partido();

create constraint trigger alineaciones_verificar_consistencia
  after insert or update or delete on public.alineaciones
  deferrable initially deferred
  for each row execute function public.trg_verificar_partido();


-- ---------- Noticias: fecha de publicación automática ----------
create function public.preparar_noticia()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.publicada and new.publicada_en is null then
    new.publicada_en := now();
  end if;
  return new;
end;
$$;

create trigger noticias_preparar
  before insert or update on public.noticias
  for each row execute function public.preparar_noticia();


-- ---------- updated_at ----------
create trigger torneo_updated_at    before update on public.torneo    for each row execute function public.set_updated_at();
create trigger fases_updated_at     before update on public.fases     for each row execute function public.set_updated_at();
create trigger equipos_updated_at   before update on public.equipos   for each row execute function public.set_updated_at();
create trigger jugadoras_updated_at before update on public.jugadoras for each row execute function public.set_updated_at();
create trigger partidos_updated_at  before update on public.partidos  for each row execute function public.set_updated_at();
create trigger noticias_updated_at  before update on public.noticias  for each row execute function public.set_updated_at();
create trigger galeria_updated_at   before update on public.galeria   for each row execute function public.set_updated_at();


-- =====================================================================
-- DATOS REALES DE CONFIGURACIÓN (no son datos de prueba)
-- =====================================================================
insert into public.torneo (id, nombre, comunidad, anio)
values (1, 'Torneo Femenil', 'X-Hazil Sur', 2026);

insert into public.fases (nombre, tipo, orden, cuenta_para_tabla) values
  ('Fase regular', 'liga',         1, true),
  ('Final',        'eliminatoria', 2, false);

commit;
