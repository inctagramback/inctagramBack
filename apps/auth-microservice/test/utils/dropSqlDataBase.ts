import { PrismaService } from 'libs/service/prisma.Service'

export async function dropSqlDataBase(prisma: PrismaService): Promise<void> {
  try {
    await prisma.$executeRawUnsafe(`
      DO
      $$
      DECLARE
          r RECORD;
      BEGIN
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
              EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE';
          END LOOP;
      END
      $$;
    `)

    console.log('Database cleaned successfully')
  } catch (error) {
    console.error('Failed to clean the database', error)
    throw error
  }
}
