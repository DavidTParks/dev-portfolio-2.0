const faunadb = require('faunadb');
exports.handler = async (event) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });
  const { slug } = event.queryStringParameters;
  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Article slug not provided',
      }),
    };
  }

  const doesDocExist = await client.query(
    q.Exists(q.Match(q.Index('volts_by_slug'), slug))
  );
  
  if (!doesDocExist) {
    await client.query(
      q.Create(q.Collection('volts'), {
        data: { slug: slug, volts: 0 },
      })
    );
  }

  const document = await client.query(
    q.Get(q.Match(q.Index('volts_by_slug'), slug))
  );

  await client.query(
    q.Update(document.ref, {
      data: {
        volts: document.data.volts + 1,
      },
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      volts: document.data.volts,
    }),
  };
};