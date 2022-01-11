// 705.484.450-52 070.987.720-03
class validateCPF {
  constructor(cpfSent) {
    Object.defineProperty(this, 'cpfClean', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfSent.replace(/\D+/g, '')
    });
  }

  isSequence() {
    return this.cpfClean.charAt(0).repeat(11) === this.cpfClean;
  }

  generateNewCPF() {
    const cpfWithoutDigits = this.cpfClean.slice(0, -2);
    const firstDigit = validateCPF.generateDigit(cpfWithoutDigits);
    const secondDigit = validateCPF.generateDigit(cpfWithoutDigits + firstDigit);
    this.newCPF = cpfWithoutDigits + firstDigit + secondDigit;
  }

  static generateDigit(cpfWithoutDigits) {
    let total = 0;
    let reverse = cpfWithoutDigits.length + 1;

    for(let numericString of cpfWithoutDigits) {
      total += reverse * Number(numericString);
      reverse--;
    }

    const digit = 11 - (total % 11);
    return digit <= 9 ? String(digit) : '0';
  }

  validate() {
    if(!this.cpfClean) return false;
    if(typeof this.cpfClean !== 'string') return false;
    if(this.cpfClean.length !== 11) return false;
    if(this.isSequence()) return false;
    this.generateNewCPF();

    return this.newCPF === this.cpfClean;
  }
}