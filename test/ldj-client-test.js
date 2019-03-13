'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe('LDJClient', () => {
  let stream = null;
  let client = null;

  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });

  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":"bar"}\n');
  });

  it('should emit a message event from split data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":');
    process.nextTick(() => stream.emit('data', '"bar"}'));
    process.nextTick(() => stream.emit('data', '\n'));
  });

  it('should detect an error when we pass in null to the LDJClient constructor', done => {
    assert.throws(() => {
      new LDJClient(null);
    });
    done();
  });

  it('should detect that the message\'s format in not JSON', done => {
    assert.throws(() => {
      stream.emit('data', '"foo":"bar"\n');
    });
    done();
  });

  it('shoul close event when the JSON message don\'t have  newline (\\n)', done => {
    client.on('message', message => {
      assert.deepEqual(message, { foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo": "bar"}');
    stream.emit('close');
  });

});
