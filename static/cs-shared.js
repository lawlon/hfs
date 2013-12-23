// unify enviroment
if (typeof window != 'undefined') {
    GLOBAL = exports = window;
}

/** try to get a nested value, without rising exception in case of non-existent property in the middle of the path to the result
 * Possible parameters:
 *      context (object): where to extract data
 *      dotted property (string | array of strings): sequence of properties separated by dots, actually the path to the data.
 *          A key may also be a method call, just have the (parameters)
 *      default (optional): what to extract if the property is not present. If the property is present and its value is undefined, undefined will be returned
 */
exports.tryGet = function(obj, property, def) {
    if (!(obj instanceof Object)) return def;
    var ret = obj[property]; // try simple access
    if (ret !== undefined) return ret;
    try { // try tougher
        ret = eval('obj.'+property)
        return (ret === undefined) ? def : ret;
    }
    catch(e) { return def }
} // tryGet



// calls 'fun' if it's a function.
exports.call = function(fun) {
    var a = Array.prototype.slice.call(arguments, 1);
    var This = this;
    if (typeof fun == 'object' && typeof a[0] == 'function') {
        This = fun;
        fun = a.shift();
    }
    if (typeof fun != 'function') return;
    fun.apply(This, a);
} // call

// just accessing an object by index. It's merely for improving readability, by moving the index in front of a map of choices.
exports.choose = function(index, object, defVal) {
    return (index in object) ? object[index] : defVal;
}
// surround $b with $a and $c, but only if $b is true
exports.su = function(a,b,c) { return b ? a+b+(c||'') : '' }

exports.idFun = function(a) { return a }

exports.assert = function(condition, message) {
    if (!condition) throw 'ASSERT failed'+ (message ? ': '+message : '');
} // assert

