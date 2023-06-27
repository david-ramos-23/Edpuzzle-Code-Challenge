// eslint-disable-next-line @typescript-eslint/no-var-requires
const { jsWithTsESM: tsjPreset } = require('ts-jest/presets')

module.exports = {
	...tsjPreset,
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js'],
	testRegex: '.*.test.ts',
	setupFiles: ['dotenv/config'],
}
