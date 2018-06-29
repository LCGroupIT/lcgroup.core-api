export class QueryHelper {
    static objectToParams(object): string {
        const keys = Object.keys(object);
        let result = [];
        for (let key in keys) {
            if (object[key]) {
                result.push(object[key] instanceof Object ?
                    this.subObjectToParams(encodeURIComponent(key), object[key]) :
                    `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`);
            }
        }
        return result.join('&');
    }
    static subObjectToParams(key, object): string {
        const keys = Object.keys(object);
        let result = [];
        for (let childKey in keys) {
            if (object[childKey]) {
                result.push(object[childKey] instanceof Object ?
                this.subObjectToParams(`${key}[${encodeURIComponent(childKey)}]`, object[childKey]) :
                `${key}[${encodeURIComponent(childKey)}]=${encodeURIComponent(object[childKey])}`);
            }
        }
        return result.join('&');
    }
}
