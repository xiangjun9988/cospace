var util = {
    serialize: (o) => {
        let str = '';
        for(let k in o){
            str += ('&' + k + '=' + o[k])
        }
        return str.slice(1);
    }
    
};

module.exports = util;
