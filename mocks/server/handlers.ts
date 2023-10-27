import { rest } from 'msw';

import { operations } from './mock_data';

export const handlers = [
  rest.get('https://localhost:5173/operations', (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(operations));
  }),
];
