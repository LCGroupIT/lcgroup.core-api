export class QueryHelper {
    /**
     * Converts an object to a parametrised string.
     * @param object
     * @returns {string}
     */
    static objectToParams(object): string {
        return Object.keys(object).map((key) => object[key] instanceof Object ?
            this.subObjectToParams(encodeURIComponent(key), object[key]) :
            `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
        ).join('&');
    }

    /**
     * Converts a sub-object to a parametrised string.
     * @param object
     * @returns {string}
     */
    static subObjectToParams(key, object): string {
        return Object.keys(object).map((childKey) => object[childKey] instanceof Object ?
                this.subObjectToParams(`${key}[${encodeURIComponent(childKey)}]`, object[childKey]) :
                `${key}[${encodeURIComponent(childKey)}]=${encodeURIComponent(object[childKey])}`
        ).join('&');
    }
}
