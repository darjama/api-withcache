var request = require('supertest');
var express = require('express');
var app = require('./index');

describe('Ping Test', () => {
  it('should receive a response for a ping', async () => {
    const res = await request(app)
      .get('/api/ping')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('success')
    expect(res.body.success).toEqual(true)
  })
})