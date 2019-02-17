const request = require('supertest');
const server = require('../server.js');

describe('home page', () => {
  it('should return 200 OK', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
});

describe('download', () => {
  it('should return 422 validation error', (done) => {
    request(server)
      .post('/api/download')
      .send({
      })
      .expect(422, done);
  });

  it('should return 200 OK', (done) => {
    request(server)
      .post('/api/download')
      .send({
        browserId: 'someBrowserId',
        link: 'https://open.spotify.com/track/1vE4IQhZwp1BDR0MCdUYKT?si=cp4_-jQcSeG_iRYUfSeY1A'
      })
      .expect(200, done);
  });
});

describe('cancel download', () => {
  it('should return 200 OK', (done) => {
    request(server)
      .post('/api/download/cancel')
      .send({
        id: 1
      })
      .expect(200, done);
  });
});
