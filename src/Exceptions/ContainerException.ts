import Exception from '@banejs/exceptions/Exception';

import ContainerExceptionInterface from '../types/ContainerExceptionInterface';

/**
 * Base interface representing a generic exception in a container.
 */
export default class ContainerException extends Exception implements ContainerExceptionInterface {
    public name: string = 'ContainerException';

    public constructor(message?: string, code: string = 'E_CONTAINER_EXCEPTION') {
        super(message || 'Unexpected container exception', code);

        // Set the prototype explicitly.
        // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Reflect.setPrototypeOf(this, ContainerException.prototype);
    }
}
