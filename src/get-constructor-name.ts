const getConstructorName : (instance:Object) => string = instance => 
    (instance.constructor) ? instance.constructor.name : Object.prototype.toString.call(instance).split(/\[\] /)[1]

export default getConstructorName