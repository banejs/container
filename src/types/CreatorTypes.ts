import IContainer from './IContainer';

export type DefaultCreatorType<T = any> = (context: IContainer) => T;
export type FactoryCreatorType<T = any> = (context: IContainer) => (...args: Array<any>) => T;
export type ConstantCreatorType<T = any> = (context: IContainer) => T;
export type CreatorType<T = any> = DefaultCreatorType<T> | FactoryCreatorType<T> | ConstantCreatorType<T>;
