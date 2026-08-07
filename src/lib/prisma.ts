import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined;
};

const prismaBase = new PrismaClient({
  // log: ["query"],
});

export const prisma =
  globalForPrisma.prisma ??
  prismaBase.$extends({
    query: {
      $allModels: {
        async findUnique({ model, operation, args, query }) {
          try {
            return await query(args);
          } catch (e: any) {
            console.warn(`Database warning on ${model}.${operation}: ${e.message || 'Connection failed'}`);
            return null;
          }
        },
        async findFirst({ model, operation, args, query }) {
          try {
            return await query(args);
          } catch (e: any) {
            console.warn(`Database warning on ${model}.${operation}: ${e.message || 'Connection failed'}`);
            return null;
          }
        },
        async findMany({ model, operation, args, query }) {
          try {
            return await query(args);
          } catch (e: any) {
            console.warn(`Database warning on ${model}.${operation}: ${e.message || 'Connection failed'}`);
            return [];
          }
        }
      }
    }
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
