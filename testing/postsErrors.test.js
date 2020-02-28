var request = require('supertest');
var express = require('express');
var app = require('../server/index');

describe('Ping Test', () => {
  it('should receive an error for post requests without tags query', async () => {
    const res = await request(app)
      .get('/api/posts')
      expect(res.statusCode).toEqual(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toEqual("Tags parameter is required")
  })

  it('should receive an error for post requests without an empty tags query', async () => {
    const res = await request(app)
      .get('/api/posts?tags')
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toEqual("Tags parameter is required")
  })

  it('should receive an error for post requests with incorrect sortBy value', async () => {
    const res = await request(app)
      .get('/api/posts?tags=health&sortBy=pizza')
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toEqual("sortBy parameter is invalid")
  })

  it('should receive an error for post requests with incorrect direction value', async () => {
    const res = await request(app)
      .get('/api/posts?tags=health&direction=cupcake')
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toEqual("direction parameter is invalid")
  })
})
