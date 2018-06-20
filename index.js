const express = require('express'),
    app = express(),
    hash = require('object-hash'),
    port = 3000,
    messages = {} //@todo: this should be in a real database at some point

app.use(express.json())  // to support JSON-encoded bodies

// @param string message
// returns sha256 hash of message
let hashMessage = function(message) {
    if(!message) {
        throw 'Please include a message that you want to hash.';
    }
    let hashedMessage = hash(message, {
        'algorithm': 'sha256'
    })

    return hashedMessage
}

// @param sha256 string hash
// given a hash, this looks up a message
// returns a string message
let getMessage = function(hash) {
    return messages[hash]
}

app.get('/messages/:hash', function (req, res) {
    let message = getMessage(req.params.hash)
    if(!message) {
         res.status(404).send({"err_msg": "Message not found"})
    }
    res.send(message)
})

app.post('/messages', function (req, res) {
    let body = req.body;
    if(!body) {
        throw 'Please pass a message you want to hash.'
    }

    let hashedMessage = hashMessage(body)

    //store the message for later
    messages[hashedMessage] = body

    res.send({'digest': hashedMessage})
})

app.get('/', function(req, res){
    res.send('Thanks for looking at my project.')
})

app.get('/healthcheck', function(){
    res.send('ok')
})

app.listen(port, () => console.log(`Hashing service running on port ${port}`))
