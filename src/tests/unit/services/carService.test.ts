import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId, carMockInvalid } from '../../mocks/carMock';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId) 
      // já na próxima chamada ele vai mudar seu retorno, isso pode ser feito várias vezes
			.onCall(1).resolves(null); 
		sinon.stub(carModel, 'read').resolves([carMockWithId]);
		sinon.stub(carModel, 'update')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);
		sinon.stub(carModel, 'delete').
		onCall(0).resolves(carMockWithId)
		.onCall(1).resolves(null);
	})
	after(() => {
		sinon.restore()
	})
	describe('Create Car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			let error; // crio a let error para capturar o erro
			try {
				await carService.create({});
			} catch (err) {
				error = err 
			}

			expect(error).to.be.instanceOf(ZodError); // importado da biblioteca zod
		});
	});

	describe('ReadOne Car', () => {
		it('Success', async () => {
			const carCreated = await carService.readOne(carMockWithId._id);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
      let error;
			try {
        // a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
				await carService.readOne(carMockWithId._id);
			} catch (err:any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined; //<--
			expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});
		describe('Update Car', () => {
		it('Success', async () => {
			const car = await carService.update(carMockWithId._id, carMock);
			expect(car).to.be.deep.equal(carMockWithId);
		});

		it('Failure: invalid body', async () => {
     let error;
			try {
				await carService.update(carMockWithId._id, carMockInvalid);
			} catch (err: any) {
       error = err;
			}
     expect(error).to.be.instanceOf(ZodError);
		});
		it('Failure id not found', async () => {
     let error;
			try {
				await carService.update('123ERRADO', carMock);
			} catch (err: any) {
       error = err;
			}
     expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});
	describe('ReadCar', () => {
		it('Success', async () => {
			const carCreated = await carService.read();

			expect(carCreated).to.be.deep.equal([carMockWithId]);
		});
	});
	describe('Delete Car', () => {
		it('Success', async () => {
			const carDeleted = await carService.delete(carMockWithId._id);

			expect(carDeleted).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
      let error;
			try {
        // a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
				await carService.delete(carMockWithId._id);
			} catch (err:any) {
				error = err
			}
			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});
	
});
