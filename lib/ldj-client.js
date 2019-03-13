/**
 * Módulo para leer paquetes json
 * @name ldj-client.js
 */

'use strict';
const EventEmitter = require('events').EventEmitter;

/**
 * @extends EventEmitter
 */
class LDJClient extends EventEmitter {

    /**
     * @method constructor
     * @param {stream} stream 
     */
    constructor(stream) {

        if(stream === null)
            throw new Error('Stream NULL');

        super();
        let buffer = '';
        stream.on('data', data => {
            buffer += data;
            let boundary = buffer.indexOf('\n');
            while (boundary !== -1) {
                const input = buffer.substring(0, boundary);
                buffer = buffer.substring(boundary + 1);

                try{
                    this.emit('message', JSON.parse(input));
                } catch (err) {
                    throw new Error('No JSON format in message');
                }

                boundary = buffer.indexOf('\n');
            }
        });

        stream.on('close', () => {
            let boundary = buffer.indexOf('}');
            if(boundary !== -1){
                const input = buffer. substring(0, boundary+1);
                try{
                    this.emit('message', JSON.parse(input));
                } catch (err) {
                    throw new Error('No JSON message');
                }
            }
            else 
                buffer = '';
            this.emit('close');
        });
    }

    static connect(stream) {
        return new LDJClient(stream);
    }
}

module.exports = LDJClient;