export function validate(value, rules){
    var clearString = rules.replace(/ /g,'');
    var rulesList = clearString.split(',');
    for (var i = 0; i < rulesList.length; i++) {
        var rule = rulesList[i]
        if(rule.includes(":")){
            rule = rule.split(':');
            var validationRule = rule[1];
            rule = rule[0];
        }
        switch(rule){
            case 'required':
                if(!value){
                    return 'this field is required';
                }
            break;
            case 'min':
                if(value.length < validationRule){
                    return 'This field needs to be at least ' + validationRule + ' characters';
                }
            break;
            case 'max':
                if(value.length > validationRule){
                    return 'This field can be no more than ' + validationRule + ' characters';
                }
            break;
        }
        return 'valid';
    }
}
