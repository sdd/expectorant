import { expect } from 'chai';
import chai from 'chai';
import expectorant from '../src';
chai.use(expectorant);

describe('Example of usage', function() {

    // mocha's timeout must be turned off, otherwise the REPL will only run until the timeout expires
    this.timeout(0);

    it('should fail the expectation, triggering the REPL', done => {

        // unfortunately this line is needed in every test case that you want to be able to bind a REPL to.
        chai.expectorant(s => eval(s), done);

        // this local variable should be accessible from within the REPL
        const blah = { a: 1 };

        // this failing assertion should trigger the REPL
        expect(1).to.equal(2);

    });
});
