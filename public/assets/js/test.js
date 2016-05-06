Function.prototype.partial = function() {
    var fn = this,
        args = Array.prototype.slice.call(arguments);
    console.log("args : " + args);
    return function() {
        console.log("inner function start !!");
        console.log("arguments : " + arguments);
        var arg = 0;
        for(var i = 0; i < args.length && i < arguments.length; i++) {
            console.log("i : " + i);
            if(args[i] === undefined) {
                args[i] = arguments[arg++];
            }
            console.log(args);
        }
        return fn.apply(this, args);
    }
};

String.prototype.test = String.prototype.split.partial(/,\s*/);

var results = ("1,2,3,4").test(6);
console.log(results);