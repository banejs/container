/* tslint:disable:max-classes-per-file */

import IContainer from '../types/IContainer';

import Container from '../Container';
import NotFoundException from '../Exceptions/NotFoundException';
import ContainerException from '../Exceptions/ContainerException';

describe('Container', () => {
    class A {}

    class B {}

    class C {
        public constructor(a: any, b: any) {
            if (!(a instanceof A) || !(b instanceof B)) {
                throw new Error();
            }
        }
    }

    class ThrowableClass {
        public constructor() {
            throw new Error('Sample Error');
        }
    }

    class ThrowableClassWithoutMessage {
        public constructor() {
            throw new Error();
        }
    }

    describe('#bind(id, creator)', () => {
        test('should create binding', () => {
            const container: IContainer = new Container();

            container.bind('A', () => new A());

            expect(container.has('A')).toBe(true);
        });
    });

    describe('#singleton(id, creator)', () => {
        test('should create singleton', () => {
            const container: IContainer = new Container();

            container.singleton('A', () => new A());

            expect(container.has('A')).toBe(true);
        });
    });

    describe('#factory(id, creator)', () => {
        test('should create factory', () => {
            const container: IContainer = new Container();

            container.factory('A', () => (): A => new A());

            expect(container.has('A')).toBe(true);
        });
    });

    describe('#constant(id, creator)', () => {
        test('should create constant', () => {
            const container: IContainer = new Container();

            container.constant('A', () => 'A_CONSTANT');

            expect(container.has('A')).toBe(true);
        });
    });

    describe('#has(id)', () => {
        test('should return correct values', () => {
            const container: IContainer = new Container();

            container.bind('A', () => new A());

            expect(container.has('A')).toBe(true);
            expect(container.has('B')).toBe(false);
        });
    });

    describe('#alias(id)', () => {
        test('should create alias', () => {
            const container: IContainer = new Container();

            container.bind('A', () => new A());
            container.alias('A', 'A_alias');

            expect(container.has('A_alias')).toBe(true);
        });
    });

    describe('#get(id)', () => {
        test('should resolve binding', () => {
            const container: IContainer = new Container();

            container.bind('A', () => new A());

            expect(container.get('A')).toBeInstanceOf(A);
        });

        test('should resolve binding with dependencies', () => {
            const container: IContainer = new Container();

            container.bind('A', () => new A());
            container.bind('B', () => new B());
            container.bind('C', (containerInstance: IContainer) => Reflect.construct(C, [containerInstance.get('A'), containerInstance.get('B')]));
        });

        test('should resolve singleton', () => {
            const container: IContainer = new Container();

            container.singleton('A', () => new A());

            const AInstance: A = container.get('A');

            expect(AInstance).toBeInstanceOf(A);
            expect(container.get('A')).toBe(AInstance);
        });

        test('should resolve factory', () => {
            const container: IContainer = new Container();
            const aFactory: () => A = (): A => new A();

            container.factory('A', () => aFactory);

            expect(container.get('A')).toBe(aFactory);
        });

        test('should resolve constant', () => {
            const container: IContainer = new Container();
            const value: string = 'CONSTANT_VALUE';

            container.constant('CONST', value);

            expect(container.get('CONST')).toBe(value);
        });

        test('should throw NotFoundException', () => {
            const container: IContainer = new Container();

            expect(() => {
                container.get('A');
            }).toThrow(NotFoundException);
        });

        test('should throw ContainerException', () => {
            const container: IContainer = new Container();

            container.bind('ThrowableClass', () => new ThrowableClass());

            expect(() => {
                container.get('ThrowableClass');
            }).toThrow(ContainerException);
        });

        test('should throw ContainerException without message', () => {
            const container: IContainer = new Container();

            container.bind('ThrowableClassWithoutMessage', () => new ThrowableClassWithoutMessage());

            expect(() => {
                container.get('ThrowableClassWithoutMessage');
            }).toThrow(ContainerException);
        });
    });
});
