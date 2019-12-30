import IContainerException from '../types/IContainerException';

import ContainerException from './ContainerException';

/**
 * No entry was found in the container.
 */
export default class NotFoundException extends ContainerException implements IContainerException {
    public name: string = 'NotFoundException';

    public constructor() {
        super('No entry was found in the container', 'E_CONTAINER_NO_ENTRY');

        // Set the prototype explicitly.
        // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Reflect.setPrototypeOf(this, NotFoundException.prototype);
    }
}
