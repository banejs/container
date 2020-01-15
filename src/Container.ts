import IContainer from './types/IContainer';
import { CreatorType, DefaultCreatorType, FactoryCreatorType, ConstantCreatorType } from './types/CreatorTypes';
import { BindingType } from './types/BindingType';

import NotFoundException from './Exceptions/NotFoundException';
import ContainerException from './Exceptions/ContainerException';

/**
 * Inversion of Control Container.
 *
 * @author Anton Drobot
 */
export default class Container implements IContainer {
    /**
     * The container's bindings.
     *
     * @type {Map<string, BindingType>}
     *
     * @private
     */
    private bindings: Map<string, BindingType> = new Map();

    /**
     * The container's shared instances.
     *
     * @type {Map<string, *>}
     *
     * @private
     */
    private instances: Map<string, any> = new Map();

    /**
     * The registered type aliases.
     *
     * @type {Map<string, string>}
     *
     * @private
     */
    private aliases: Map<string, string> = new Map();

    /**
     * Register a binding with the container.
     *
     * @param {string} id
     * @param {CreatorType} creator
     * @param {boolean} [shared=false]
     * @param {boolean} [constant=false]
     *
     * @private
     */
    private baseBind(id: string, creator: CreatorType, { shared = false, constant = false }: { shared?: boolean; constant?: boolean } = {}): void {
        this.bindings.set(id, { creator, shared, constant });
    }

    /**
     * Instantiate a concrete instance of the given type.
     *
     * @throws {ContainerException} - Error while retrieving the entry.
     *
     * @param {BindingType} binding
     *
     * @return {*}
     *
     * @private
     */
    private build(binding: BindingType): any {
        try {
            return Reflect.apply(binding.creator, undefined, [this]);
        } catch (error) {
            throw new ContainerException(error.message);
        }
    }

    /**
     * Resolve the given type from the container.
     *
     * @throws {NotFoundException} - No entry was found for **this** identifier.
     *
     * @param {string} id
     *
     * @return {Function}
     *
     * @private
     */
    private resolve(id: string): any {
        const aliasOrId: string = this.aliases.get(id) || id;

        if (this.instances.has(aliasOrId)) {
            return this.instances.get(aliasOrId);
        }

        const binding: BindingType | void = this.bindings.get(aliasOrId);

        if (!binding) {
            throw new NotFoundException();
        }

        const object: any = this.build(binding);

        if (binding.shared) {
            this.instances.set(aliasOrId, object);
        }

        return object;
    }

    /**
     * Finds an entry of the container by its identifier and returns it.
     *
     * @param {string} id - Identifier of the entry to look for.
     *
     * @return {*}
     */
    public get(id: string): any {
        return this.resolve(id);
    }

    /**
     * Returns true if the container can return an entry for the given identifier.
     * Returns false otherwise.
     *
     * @param {string} id - Identifier of the entry to look for.
     *
     * @return {boolean}
     */
    public has(id: string): boolean {
        const aliasOrId: string = this.aliases.get(id) || id;

        return this.bindings.has(aliasOrId) || this.instances.has(aliasOrId);
    }

    /**
     * Binds an abstraction.
     *
     * @param {string} id
     * @param {CreatorType} creator
     */
    public bind(id: string, creator: CreatorType): void {
        this.baseBind(id, creator);
    }

    /**
     * Binds an abstraction to a singleton.
     *
     * @param {string} id
     * @param {DefaultCreatorType} creator
     */
    public singleton(id: string, creator: DefaultCreatorType): void {
        this.baseBind(id, creator, { shared: true });
    }

    /**
     * Binds an abstraction to a factory.
     *
     * @param {string} id
     * @param {FactoryCreatorType} creator
     */
    public factory(id: string, creator: FactoryCreatorType): void {
        this.baseBind(id, creator);
    }

    /**
     * Binds an abstraction to a constant value
     *
     * @param {string} id
     * @param {ConstantCreatorType} constant
     */
    public constant(id: string, constant: ConstantCreatorType): void {
        this.baseBind(id, constant, { constant: true });
    }

    /**
     * Alias a type to a different name.
     *
     * @param {string} id
     * @param {string} alias
     */
    public alias(id: string, alias: string): void {
        this.aliases.set(alias, id);
    }
}
