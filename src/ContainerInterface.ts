import { CreatorType, DefaultCreatorType, FactoryCreatorType, ConstantCreatorType } from './Types/CreatorTypes';

export default interface ContainerInterface {
    /**
     * Finds an entry of the container by its identifier and returns it.
     *
     * @throws {NotFoundExceptionInterface} - No entry was found for **this** identifier.
     * @throws {ContainerExceptionInterface} - Error while retrieving the entry.
     *
     * @param {string} id - Identifier of the entry to look for.
     *
     * @return {*}
     */
    get(id: string): any;

    /**
     * Returns true if the container can return an entry for the given identifier.
     * Returns false otherwise.
     *
     * `has($id)` returning true does not mean that `get($id)` will not throw an exception.
     * It does however mean that `get($id)` will not throw a `NotFoundExceptionInterface`.
     *
     * @param {string} id - Identifier of the entry to look for.
     *
     * @return {boolean}
     */
    has(id: string): boolean;

    /**
     * Binds an abstraction.
     *
     * @param {string} id
     * @param {CreatorType} creator
     */
    bind(id: string, creator: CreatorType): void;

    /**
     * Binds an abstraction to a singleton.
     *
     * @param {string} id
     * @param {DefaultCreatorType} creator
     */
    singleton(id: string, creator: DefaultCreatorType): void;

    /**
     * Binds an abstraction to a factory.
     *
     * @param {string} id
     * @param {FactoryCreatorType} creator
     */
    factory(id: string, creator: FactoryCreatorType): void;

    /**
     * Binds an abstraction to a constant value
     *
     * @param {string} id
     * @param {ConstantCreatorType} constant
     */
    constant(id: string, constant: ConstantCreatorType): void;

    /**
     * Alias a type to a different name.
     *
     * @param {string} id
     * @param {string} alias
     */
    alias(id: string, alias: string): void;
}
