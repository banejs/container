import { CreatorType } from './CreatorTypes';

export type BindingType = {
    creator: CreatorType;
    shared: boolean;
    constant: boolean;
};
