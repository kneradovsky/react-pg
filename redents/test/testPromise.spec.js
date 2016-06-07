import server from './testServer';
import promiseMiddleware from '../src/lib/promiseMiddleware'
import createEntityOperation from '../src/lib/dataactions'
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

const entities = {
	defaults: {
		baseUrl: 'http://localhost:3000/data'
	},
	entities : {
		entDefault : {},
		entType : {
			get: {
				type: 'CUSTOM_TYPE'
			}
		},
		entGetRequest: {

		},
		entPostRequest: {

		},
		entDeleteRequest: {

		},
		entIndexRequest: {

		},
		errEnt404: {},
		errEnt400: {},
		errEnt500: {},
		entReq1: {

		}
	}
}

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised)

const testServer = new server();
const entityOps =  createEntityOperation(entities);

const promiseMW = promiseMiddleware();
const defnext = (actionType) => sinon.spy((action)=>(action.type==actionType || action.type==actionType+'_REQUEST'));

describe("Promise middleware", function() {
	
	it('Default entity, index', function(done) {
		const next = defnext('LOAD_ENTDEFAULTS');
		promiseMW(next)(entityOps('entDefault','index')).should.eventually.equal(true);
		next.calledTwice;
		next.alwaysReturned(true);
		done();
	});
	it('Custom type entity, get', function(done) {
		const actionType=entities.entities.entType.get.type;
		const next = defnext(actionType);
		promiseMW(next)(entityOps('entType','get')).should.eventually.equal(true);
		next.calledTwice;
		next.alwaysReturned(true);
		done();
	});

});