const {
  expect
} = require('chai');
const io = require('socket.io-client');

const socketURL = `http://${process.env.NODEJS_IP}:${process.env.NODEJS_PORT}`;

describe('Successful connection', () => {
  it('Should emit connected', (done) => {
    const socket = io(`${socketURL}?browserId=someBrowserId`);
    socket.on('connected', (data) => {
      expect(data.message).to.equal('connected');
      socket.disconnect();
      done();
    });
  });
});
