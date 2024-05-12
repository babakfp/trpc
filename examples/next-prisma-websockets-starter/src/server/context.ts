import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import type { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import { getSession } from 'next-auth/react';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export const createContext = async (
  opts: CreateNextContextOptions | CreateWSSContextFnOptions,
) => {
  const session = await getSession({
    req: {
      headers: opts.req.headers,
    },
  });

  console.log('createContext for', session?.user?.name ?? 'unknown user');

  // setTimeout(() => {
  //   opts.req.socket.destroy();
  // }, 5e3);

  return {
    session,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
