import ContainerInterface from './ContainerInterface';

export type DefaultCreatorType = (context: ContainerInterface) => any;
export type FactoryCreatorType = (context: ContainerInterface) => (...args: Array<any>) => any;
export type ConstantCreatorType = any;
export type CreatorType = DefaultCreatorType | FactoryCreatorType | ConstantCreatorType;
