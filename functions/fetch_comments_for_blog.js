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
  // Check and see if the doc exists.
  const doesDocExist = await client.query(
    q.Exists(q.Match(q.Index('comments_by_slug'), slug))
  );

  if (!doesDocExist) {
    await client.query(
      q.Create(q.Collection('comments'), {
        data: { slug: slug, comments: [] },
      })
    );
  }

  // Fetch the document for-real
  const document = await client.query(
    q.Get(q.Match(q.Index('comments_by_slug'), slug))
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      comments: document.data.comments,
    }),
  };
};