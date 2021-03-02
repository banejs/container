import { CreatorType } from './CreatorTypes';

export type BindingType<T = any> = {
    creator: CreatorType<T>;
    shared: boolean;
    constant: boolean;
};
