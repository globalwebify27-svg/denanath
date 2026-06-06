import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined;
};

const prismaBase = new PrismaClient({
  log: ["query"],
});

export const prisma =
  globalForPrisma.prisma ??
  prismaBase.$extends({
    query: {
      $allModels: {
        async findUnique({ model, operation, args, query }) {
          try {
            return await query(args);
          } catch (e) {
            console.error(`Database error on ${model}.${operation}:`, e);
            return null;
          }
        },
        async findFirst({ model, operation, args, query }) {
          try {
            return await query(args);
          } catch (e) {
            console.error(`Database error on ${model}.${operation}:`, e);
            return null;
          }
        },
        async findMany({ model, operation, args, query }) {
          try {
            return await query(args);
          } catch (e) {
            console.error(`Database error on ${model}.${operation}:`, e);
            return [];
          }
        }
      }
    }
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
