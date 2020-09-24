import { NextApiRequest, NextApiResponse } from 'next';

import { state } from './_state';

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      res.statusCode = 200;
      res.json({ users: state.users });
      return;
    case 'POST':
      state.users.push(JSON.parse(req.body));
      res.statusCode = 200;
      res.json({ users: state.users });
      return;
  }
};
