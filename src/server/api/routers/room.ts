import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/*
    Required procedures:
    1. get all information from a room
    2. add a history record to this room
    3. undo the last history record
*/
export const roomRouter = createTRPCRouter({
  getRoom: publicProcedure
    .input(z.object({ roomID: z.number().int() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.room.findFirstOrThrow({
        where: { id: input.roomID },
        include: {
          history: true,
        },
      });
    }),
  addHistory: publicProcedure
    .input(
      z.object({
        roomID: z.number(),
        scores: z.object({
          yellowScore: z.number(),
          blueScore: z.number(),
          redScore: z.number(),
          greenScore: z.number(),
        }),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.historyRecord.create({
        data: {
          room: {
            connect: {
              id: input.roomID,
            },
          },
          yellowScore: input.scores.yellowScore,
          blueScore: input.scores.blueScore,
          redScore: input.scores.redScore,
          greenScore: input.scores.greenScore,
        },
      });
    }),
  undoLastHistoryRecord: publicProcedure
    .input(z.object({ roomID: z.number() }))
    .mutation(async ({ input, ctx }) => {
      // First, get the id of the last history record
      const lastHistoryRecord = await ctx.prisma.historyRecord.findFirstOrThrow(
        {
          where: {
            room: {
              id: input.roomID,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }
      );
      // Then, delete the last history record
      return ctx.prisma.historyRecord.delete({
        where: {
          id: lastHistoryRecord.id,
        },
      });
    }),
});
