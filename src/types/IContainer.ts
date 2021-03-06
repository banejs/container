import { CreatorType, DefaultCreatorType, FactoryCreatorType, ConstantCreatorType } from './CreatorTypes';

export default interface IContainer {
    /**
     * Finds an entry of the container by its identifier and returns it.
     *
     * @throws {INotFoundException} - No entry was found for **this** identifier.
     * @throws {IContainerException} - Error while retrieving the entry.
     *
     * @param {string} id - Identifier of the entry to look for.
     *
     * @return {*}
     */
    get<T = any>(id: string): T;

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
    bind<T = any>(id: string, creator: CreatorType<T>): void;

    /**
     * Binds an abstraction to a singleton.
     *
     * @param {string} id
     * @param {DefaultCreatorType} creator
     */
    singleton<T = any>(id: string, creator: DefaultCreatorType<T>): void;

    /**
     * Binds an abstraction to a factory.
     *
     * @param {string} id
     * @param {FactoryCreatorType} creator
     */
    factory<T = any>(id: string, creator: FactoryCreatorType<T>): void;

    /**
     * Binds an abstraction to a constant value
     *
     * @param {string} id
     * @param {ConstantCreatorType} constant
     */
    constant<T = any>(id: string, constant: ConstantCreatorType<T>): void;

    /**
     * Alias a type to a different name.
     *
     * @param {string} id
     * @param {string} alias
     */
    alias(id: string, alias: string): void;
}
