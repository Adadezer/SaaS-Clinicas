"use server";

import { sql } from "drizzle-orm";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";

export async function getPatientByNameAction(name: string, clinicId: string) {
  return db.query.patientsTable.findMany({
    where: sql`
      unaccent(lower(${patientsTable.name})) 
      LIKE '%' || lower(${name}) || '%' 
      AND ${patientsTable.clinicId} = ${clinicId}
    `,
  });
}

// unaccent(lower(...)) – No banco, transforma o nome do paciente em minúsculas e remove acentos para comparação.
// (Obs: para usar unaccent, é preciso habilitar a extensão no banco de dados com o comando CREATE EXTENSION IF NOT EXISTS unaccent;  .)

// SQL com LIKE '%' || ... || '%' – Isso garante que o filtro seja %like%, ou seja, encontra o texto em qualquer posição.

// AND ${patientsTable.clinicId} = ${clinicId} - garante que só traga pacientes da clínica do usuário.
