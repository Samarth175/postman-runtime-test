var _ = require('lodash'),
    expect = require('chai').expect,
    sdk = require('postman-collection'),
    AuthLoader = require('../../lib/authorizer').AuthLoader,
    createAuthInterface = require('../../lib/authorizer/auth-interface'),


    Request = sdk.Request,
    Url = sdk.Url,
    rawRequests = require('../fixtures/auth-requests');
function test(){

    var request = new Request(rawRequests.basic),
    auth = request.auth,
    authInterface = createAuthInterface(auth),
    // username = rawRequests.basic.auth.basic.username,
    // password = rawRequests.basic.auth.basic.password,

    username = "abhijit",
    password = "kane",
    expectedAuthHeader = 'Authorization: Basic ' +
                         Buffer.from(`${username}:${password}`, 'utf8').toString('base64'),
    handler = AuthLoader.getHandler(auth.type),
    headers,
    authHeader;


    handler.sign(authInterface, request, _.noop);
    console.log(authInterface);
    headers = request.headers.all();
    console.log(headers);
    console.log(username);
    expect(headers).to.have.lengthOf(1);

    authHeader = headers[0];
    console.log(authHeader);
    expect(authHeader.toString()).to.eql(expectedAuthHeader);
    expect(authHeader.system).to.be.true;


    // handler.sign(authInterface, request, _.noop);
    // headers = request.headers.all();
    
    // expect(headers).to.have.lengthOf(1);

    // authHeader = headers[0];
    // expect(authHeader.toString()).to.eql(expectedAuthHeader);
    // expect(authHeader.system).to.be.true;
    // var request = new Request({
    //     auth: {
    //         noauth: {},
    //         type: 'noauth'
    //     }
    // }),
    // auth = request.auth,    
    // authInterface = createAuthInterface(auth),
    // handler = AuthLoader.getHandler(auth.type);

    // handler.sign(authInterface, request, _.noop);

    // console.log(request);
    // expect(request).to.eql(request);
    // authInterface.set({foo: 'bar'});

    // handler.sign(authInterface, request, _.noop);

    // console.log(request.auth.parameters());
    // // expect(request.auth.parameters().toObject()).to.eql({
    // //     foo: 'bar'

}
test();