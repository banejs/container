import IContainer from './IContainer';

export type DefaultCreatorType = (context: IContainer) => any;
export type FactoryCreatorType = (context: IContainer) => (...args: Array<any>) => any;
export type ConstantCreatorType = (context: IContainer) => any;
export type CreatorType = DefaultCreatorType | FactoryCreatorType | ConstantCreatorType;
