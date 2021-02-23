/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Merge JS and e2e coverage reports.
 */

const fs = require( 'fs-extra' );
const istanbulReports = require( 'istanbul-reports' );
const libReport = require( 'istanbul-lib-report' );
const istanbulCoverage = require( 'istanbul-lib-coverage' );
const args = require( 'minimist' )( process.argv.slice( 2 ) );

/* [ Configuration ] */
const rootDir = './plugin/tests/coverage';
const reportOut = './plugin/tests/coverage/js-e2e';

const mergeAllReports = ( coverageMap, reports ) => {
	if ( Array.isArray( reports ) === false ) {
		return;
	}

	reports.forEach( reportFile => {
		const coverageReport = fs.readJSONSync( reportFile );
		coverageMap.merge( coverageReport );
	} );
};

const generateReport = ( coverageMap, type ) => {
	// create a context for report generation
	const context = libReport.createContext( {
		dir: reportOut,
		defaultSummarizer: 'nested',
		coverageMap,
	} );

	const reportType = Array.isArray( type ) ? type.pop() : type;

	// create an instance of the relevant report class
	const report = istanbulReports.create( reportType );

	// call execute to synchronously create and write the report to disk
	report.execute( context );

	// show the report text summary in console only if the reporter is not a text report.
	if ( ! reportType.includes( 'text' ) ) {
		const text = istanbulReports.create( 'text' );

		text.execute( context );
	}
};

async function main() {
	const coverageMap = istanbulCoverage.createCoverageMap( {} );

	const reports = [ rootDir + '/e2e/coverage-puppeteer-istanbul.json' ];

	if ( false !== args.js ) {
		reports.push( rootDir + '/js/coverage-final.json' );
	}

	if ( Array.isArray( reports ) ) {
		mergeAllReports( coverageMap, reports );
		generateReport( coverageMap, args.reporter || 'lcov' );
	}
}

main().catch( err => {
	console.error( err );
	process.exit( 1 );
} );
