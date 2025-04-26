String.prototype.hashCode = function() {
    var hash = 0;
    for (let i = 0; i < this.length; i++) {
        hash = (hash << 5) - hash + this.charCodeAt(i);
        hash |= 0; // convert to 32bit integer
    }
    return Math.abs(hash); // make sure it's always positive
};
function secret(str){
    return str.hashCode().toString();
}

module.exports = secret;