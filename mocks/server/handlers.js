import { rest } from 'msw';

import { operations } from './mock_data';

export const handlers = [
  rest.get('https://localhost:5173/operations', (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(400), ctx.json(operations));
  }),
];
