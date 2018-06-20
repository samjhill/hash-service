This is a simple hashing service that accepts messages and returns a SHA256 hash. You can then access that message later by passing that hash back to the service.

Getting Started
========

```
npm install && npm start
```

Using the service
========

POST a message to the `/messages` endpoint. It'll return a hashed version of that message.

Example:

```json
 curl  -X  POST  -H  "Content-Type:  application/json"  -d  '{"message":  "foo"}' localhost:3000/messages
```

returns:
```
{
    "digest":"ac143840aaac2e3bbc3f29df8a76061efa2ec105f8ee88dd73d1367b31b6d251"
}
```


To read your message back,

```
curl localhost:3000/messages/ac143840aaac2e3bbc3f29df8a76061efa2ec105f8ee88dd73d1367b31b6d251
```

returns `{"message":  "foo"}`
