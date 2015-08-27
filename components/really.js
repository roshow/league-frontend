function makeLogFunc (really) {
	return function () {
		console.log(really);
	};
}

export default {
	basic: makeLogFunc('really?'),
	oh: makeLogFunc('oh, really?'),
	longone: makeLogFunc('reeeeeeeally?')
};