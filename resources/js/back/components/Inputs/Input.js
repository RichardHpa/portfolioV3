import React, { Component } from 'react';

class Input extends Component {
    constructor () {
        super();
        this.state = {
            valid: true
        }

        this.checkValidation = this.checkValidation.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    checkValidation(event){
        const checkValidation = validate(event.target.value, this.props.validation);
        if(checkValidation === true){
            this.setState({
                valid: true,
                validFeedback: null
            })
        } else {
            this.setState({
                valid: false,
                validFeedback: checkValidation
            })
        }

        this.props.receiveInput({
            valid: checkValidation,
            input: this.props.name,
            value: event.target.value
        })
    }

    changeValue(event){
        const checkValidation = validate(event.target.value, this.props.validation);
        if(checkValidation === true){
            this.setState({
                valid: true,
                validFeedback: null
            })
        } else {
            this.setState({
                valid: false,
                validFeedback: checkValidation
            })
        }

        this.props.receiveInput({
            valid: checkValidation,
            input: this.props.name,
            value: event.target.value
        })
    }

    render () {
        const { valid, validFeedback} = this.state;
        const extraClasses = this.props.classes? this.props.classes : '';
        const styleClass = this.props.style? `input${this.props.style}` : '';

        let value = this.props.value === 'undefined'? '': this.props.value;

        return (
            <div className="form-group">
            {
                this.props.label?
                <label>{this.props.label}</label>
                : ''
            }
            <input
                className={`form-control ${extraClasses} ${styleClass} ${valid ? '': 'is-invalid' }`}
                type={this.props.type}
                placeholder={this.props.placeholder}
                onBlur={this.checkValidation}
                name={this.props.name}
                value={value}
                onChange={this.changeValue}
            />
            {
                !valid?
                <div className="invalid-feedback">
                {this.props.label} {validFeedback}
                </div>
                : ''
            }
            </div>
        )
    }
}

class Textarea extends Component {
    constructor () {
        super();
        this.state = {
            valid: true
        }

        this.checkValidation = this.checkValidation.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    checkValidation(event){
        const checkValidation = validate(event.target.value, this.props.validation);
        if(checkValidation === true){
            this.setState({
                valid: true,
                validFeedback: null
            })
        } else {
            this.setState({
                valid: false,
                validFeedback: checkValidation
            })
        }
        this.props.receiveInput({
            valid: checkValidation,
            input: this.props.name,
            value: event.target.value
        })
    }

    changeValue(event){
        const checkValidation = validate(event.target.value, this.props.validation);
        if(checkValidation === true){
            this.setState({
                valid: true,
                validFeedback: null
            })
        } else {
            this.setState({
                valid: false,
                validFeedback: checkValidation
            })
        }

        this.props.receiveInput({
            valid: checkValidation,
            input: this.props.name,
            value: event.target.value
        })
    }

    render (){
        const { valid, validFeedback} = this.state;

        const extraClasses = this.props.classes? this.props.classes : '';
        return(
            <div className="form-group">
            {
                this.props.label?
                <label>{this.props.label}</label>
                : ''
            }
            <textarea
            className={`form-control ${extraClasses} ${valid ? '': 'is-invalid' }`}
            rows={this.props.rows}
            onBlur={this.checkValidation}
            name={this.props.name}
            value={this.props.value}
            onChange={this.changeValue}
            >
            </textarea>
            {
                !valid?
                <div className="invalid-feedback">
                {this.props.label} {validFeedback}
                </div>
                : ''
            }
            </div>
        )
    }
}



function validate(value, validationRules){
    let validInput = true;
    if(validationRules){
        const clearString = validationRules.replace(/ /g,'');
        let rulesList = clearString.split(',');
        for (var i = 0; i < rulesList.length; i++) {
            let rule = rulesList[i];
            if(rule.includes(":")){
                rule = rule.split(':');
                var validationRule = rule[1];
                rule = rule[0];
            }
            switch(rule){
                case 'required':
                    if(value.length === 0){
                        validInput = ` is required. Please enter a value`;
                    }
                break;
                case 'min':
                    if(value.length < parseInt(validationRule)){
                        validInput = `must be at least than ${validationRule} long`;
                    }
                break;
                case 'max':
                  if(value.length > parseInt(validationRule)){
                      validInput = `must be at less than ${validationRule} long`;
                  }
                  break;
            }
            if(validInput !== true){
                break;
            }
        }
    }
    return validInput;
}

export { Input, Textarea };
