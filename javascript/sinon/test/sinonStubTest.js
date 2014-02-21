SinonStubTest = TestCase('SinonStubTest');

SinonStubTest.prototype.setUp = function () {
	this._sandbox = sinon.sandbox.create();
};

SinonStubTest.prototype.tearDown = function () {
	this._sandbox.restore();
};

SinonStubTest.prototype.testCallMyMethodShouldCallMyMethodOneTime = function () {
	expectAsserts(1);
	var myMethodStub = this._sandbox.stub(sinonStub, 'myMethod');
	sinonStub.callMyMethod(1);
	assertTrue(myMethodStub.calledOnce);
};

SinonStubTest.prototype.testMyMethodShouldCalledWithArgs = function(){
	expectAsserts(1);
	var myMethodStub = this._sandbox.stub(sinonStub, 'myMethod');
	var arg1 = 'arg one';
	var arg2 = 'arg two';
	sinonStub.callMyMethod(1,arg1,arg2);
	assertTrue(myMethodStub.withArgs(arg1,arg2).called);
};

SinonStubTest.prototype.testMyMethodShouldReturnExpectedValueOnNthCall = function(){
	expectAsserts(3);
	var myMethodStub = this._sandbox.stub(sinonStub, 'myMethod');
	var arg1 = 'arg one';
	var arg2 = 'arg two';
	var firstCall = 'first call';
	var secondCall = 'second call';
	var thirdCall = 'third call';

	myMethodStub.onCall(0).returns(firstCall);  //onFirstCall
	myMethodStub.onCall(1).returns(secondCall); //onSecondCall
	myMethodStub.onCall(2).returns(thirdCall); //onThirdCall
	var actualValue = sinonStub.callMyMethod(1,arg1,arg2);
	assertEquals(firstCall, actualValue);

	actualValue = sinonStub.callMyMethod(1,arg1,arg2);
	assertEquals(secondCall, actualValue);

	actualValue = sinonStub.callMyMethod(1,arg1,arg2);
	assertEquals(thirdCall, actualValue);
};

SinonStubTest.prototype.testMyMethodShouldAlwaysReturnExpectedValue = function(){
	expectAsserts(1);
	var myMethodStub = this._sandbox.stub(sinonStub, 'myMethod');
	var expectedValue = "some expected value";
	myMethodStub.returns(expectedValue);

	var actualValue = sinonStub.callMyMethod(3);
	assertEquals(expectedValue,actualValue);
};