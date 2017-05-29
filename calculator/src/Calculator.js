import React, {Component} from 'react';
import './App.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
      waitingForOperand: false,
      operator: null,
      value: 0
    };

    // This binding is necessary to make `this` work in the callback this.inputDigit
    // = this.inputDigit.bind(this); this.clearDigit = this.clearDigit.bind(this);
    // this.inputDot = this.inputDot.bind(this); this.toggleSign =
    // this.toggleSign.bind(this);
  }

  inputDigit(digit) {
    const {displayValue, waitingForOperand} = this.state;

    if (waitingForOperand) {

      this.setState({displayValue: String(digit), waitingForOperand: false})

    } else {
      this.setState({
        displayValue: displayValue === '0'
          ? String(digit)
          : displayValue + digit
      })
    }

  }

  clearDigit() {
    this.setState({displayValue: ''})
  }

  inputDot() {
    const {displayValue, waitingForOperand} = this.state;

    if (waitingForOperand) {
      this.setState({displayValue: '.', waitingForOperand: false})

    } else {
      if (displayValue.indexOf('.') === -1) {
        this.setState({
          displayValue: displayValue + '.',
          waitingForOperand: false
        })
      }
    }

  }

  toggleSign() {
    const {displayValue} = this.state;

    this.setState({
      displayValue: displayValue.charAt(0) === '-'
        ? displayValue.substr(1)
        : "-" + displayValue
    })

  }
  inputPercentage()
  {
    const {displayValue} = this.state;
    const value = parseFloat(displayValue);

    this.setState({
      displayValue: String(value / 100)
    })

  }

  performOperation(nextOperator)
  {
    const {value, displayValue, operator} = this.state;
    const inputValue = parseFloat(displayValue)

    const CalculatorOperations = {
      '/': (preValue, nextValue) => preValue / nextValue,
      '*': (preValue, nextValue) => preValue * nextValue,
      '+': (preValue, nextValue) => preValue + nextValue,
      '-': (preValue, nextValue) => preValue - nextValue,
      '=': (preValue, nextValue) => nextValue
    }

    if (value == null) {
      this.setState({value: inputValue})
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)

      this.setState({value: newValue, displayValue: String(newValue)})
    }

    this.setState({waitingForOperand: true, operator: nextOperator})

  }

  render() {

    const displayValue = this.state.displayValue;
    return (
      <div id="wrapper">
        <div className="calculator">

          <div className="calculator-display">{displayValue}</div>
          <div className="calculator-keypad">
            <div className="input-keys">
              <div className="function-keys">
                <button className="calculator-key key-clear" onClick={() => this.clearDigit()}>AC</button>
                <button className="calculator-key key-sign" onClick={() => this.toggleSign()}>±</button>
                <button
                  className="calculator-key key-percent"
                  onClick={() => this.inputPercentage()}>%</button>
              </div>
              <div className="digit-keys">
                <button className="calculator-key key-0" onClick={() => this.inputDigit(0)}>0</button>
                <button className="calculator-key key-dot" onClick={() => this.inputDot(1)}>●</button>
                <button className="calculator-key key-1" onClick={() => this.inputDigit(1)}>1</button>
                <button className="calculator-key key-2" onClick={() => this.inputDigit(2)}>2</button>
                <button className="calculator-key key-3" onClick={() => this.inputDigit(3)}>3</button>
                <button className="calculator-key key-4" onClick={() => this.inputDigit(4)}>4</button>
                <button className="calculator-key key-5" onClick={() => this.inputDigit(5)}>5</button>
                <button className="calculator-key key-6" onClick={() => this.inputDigit(6)}>6</button>
                <button className="calculator-key key-7" onClick={() => this.inputDigit(7)}>7</button>
                <button className="calculator-key key-8" onClick={() => this.inputDigit(8)}>8</button>
                <button className="calculator-key key-9" onClick={() => this.inputDigit(9)}>9</button>
              </div>
            </div>
            <div className="operator-keys">
              <button
                className="calculator-key key-divide"
                onClick={() => this.performOperation('/')}>÷</button>
              <button
                className="calculator-key key-multiply"
                onClick={() => this.performOperation('*')}>×</button>
              <button
                className="calculator-key key-subtract"
                onClick={() => this.performOperation('-')}>−</button>
              <button
                className="calculator-key key-add"
                onClick={() => this.performOperation('+')}>+</button>
              <button
                className="calculator-key key-equals"
                onClick={() => this.performOperation('=')}>=</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
