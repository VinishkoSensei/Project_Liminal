const File = require('inert');
const { streamHandler, streamTrack } = require('../streaming');

const plugin = {
  name: 'streamServer',

  register: async (server, options) => {
    await server.register(File);

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, h) {
        return h.file('index.html');
      },
    });

    server.route({
      method: 'GET',
      path: '/stream',
      handler: streamHandler,
    });

    server.route({
      method: 'GET',
      path: '/tracks/{trackId}',
      handler: streamTrack,
    });
  },
};

module.exports = plugin;
