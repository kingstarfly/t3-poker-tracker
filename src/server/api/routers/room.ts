import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

/*
    Required procedures:
    1. get all information from a room
    2. add a history record to this room
    3. undo the last history record
    4. Create a new room
*/
export const roomRouter = createTRPCRouter({
  getRoom: publicProcedure
    .input(z.object({ roomName: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.room.findFirst({
        where: { name: input.roomName },
        include: {
          history: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
    }),
  addHistoryRecord: publicProcedure
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
  createRoom: publicProcedure.mutation(async ({ ctx }) => {
    const randomRoomName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors],
      separator: "-",
      style: "lowerCase",
      length: 3,
    });
    return ctx.prisma.room.create({
      data: {
        name: randomRoomName,
      },
    });
  }),
});
