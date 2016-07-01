const chalk = require('chalk');

module.exports = chai => {
    var Assertion = chai.Assertion;

    chai.expectorant = (evl, done) => {
        chai.eval = evl;
        chai.done = done;
    };

    Assertion.overwriteMethod('assert', _super => {
        return function expectorant(...args) {

        try {
            _super(...args);
        } catch (e) {

            console.log(chalk.red('Failed expectation! "' + e.message + '"'));

            const replServer = require('repl').start({
                    prompt: chalk.green('expectorant>'),
                    input: process.stdin,
                    output: process.stdout,
                    useGlobal: true,
                    eval: str => console.log(chai.eval(str))
        });
            replServer.on('exit', chai.done);
        }
    };
});
};
