/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s,p) {
    for(var i in s){
        if(isSubMatch(s.substr(i),p)) return true;
    }
    return false;
}
var isSubMatch = function(s, p) {
    if(s.length < minLen(p)) return false;
    if(p.length === 0) return true;
    else {
        if(p[0] === '.') return isSubMatch(s.substr(1), p.substr(1));
        if(p[0] === '*' ) return isSubMatch(s.substr());
        if(p[1] && p[1] === '*') 
            if(s[0] === p[0]) return isSubMatch(s.substr(1), p.substr(1)) || isSubMatch(s.substr(1),p);
            else return isSubMatch(s,p.substr(2));
        if(p[0] === s[0]) return isSubMatch(s.substr(1),p.substr(1));
        return isSubMatch(s.substr(1),p);
    }
    
};
function minLen(p) {
    var len = p.length;
    for(var i in p) {
        if(p[i] === '*') len--;
    }
    return len;
}
