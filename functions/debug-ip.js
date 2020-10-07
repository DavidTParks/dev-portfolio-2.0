exports.handler = function(event, context, callback) {
  console.log(`{\ncontext: ${JSON.stringify(context,null,2)},\nevent: ${JSON.stringify(event,null,2)}\n}`)
  callback(null, {
  statusCode: 200,
  body: `Your IP address ${event.headers['client-ip']}`
  });
}