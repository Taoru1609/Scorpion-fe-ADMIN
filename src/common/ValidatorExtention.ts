import { AbstractControl, FormGroup, ValidatorFn } from "react-reactive-form";

const isEmptyInputValue = (value: any) => {
  return value == null || value.length === 0;
};

const EMAIL_REGEXP =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class ValidatorExtention {
  static required(message: string = "Không được để trống"): ValidatorFn {
    return (control: AbstractControl) => {
      return isEmptyInputValue(control.value) ? { error: message } : null;
    };
  }

  static requiredTrue(message: string = "Không được để trống"): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === true ? null : { error: message };
    };
  }

  static email(message: string = "Không đúng định dạng email"): ValidatorFn {
    return (control: AbstractControl) => {
      if (isEmptyInputValue(control.value)) {
        return null;
      }
      return EMAIL_REGEXP.test(control.value) ? null : { error: message };
    };
  }

  static min(
    min: number,
    message: string = "Giá trị tối thiểu {min}"
  ): ValidatorFn {
    return (control: AbstractControl) => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return null; // don't validate empty values to allow optional controls
      }
      var parsedValue = parseFloat(control.value);
      return !isNaN(parsedValue) && parsedValue < min
        ? {
            error: message.replace("{min}", min.toString()),
          }
        : null;
    };
  }

  static max(
    max: number,
    message: string = "Giá trị tối đa {max}"
  ): ValidatorFn {
    return (control: AbstractControl) => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return null; // don't validate empty values to allow optional controls
      }
      var parsedValue = parseFloat(control.value);
      return !isNaN(parsedValue) && parsedValue > max
        ? {
            error: message.replace("{max}", max.toString()),
          }
        : null;
    };
  }

  static minLength(
    _minLength: number,
    message: string = "Độ dài tối thiểu {minLength}"
  ): ValidatorFn {
    return (control: AbstractControl) => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(_minLength)) {
        return null; // don't validate empty values to allow optional controls
      }
      var length = control.value ? control.value.length : 0;
      return length < _minLength
        ? {
            error: message.replace("{minLength}", _minLength.toString()),
          }
        : null;
    };
  }

  static maxLength(
    _maxLength: number,
    message: string = "Độ dài tối đa {maxLength}"
  ): ValidatorFn {
    return (control: AbstractControl) => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(_maxLength)) {
        return null; // don't validate empty values to allow optional controls
      }
      var length = control.value ? control.value.length : 0;
      return length > _maxLength
        ? {
            error: message.replace("{maxLength}", _maxLength.toString()),
          }
        : null;
    };
  }

  static pattern(
    _pattern: string | RegExp,
    message: string = "Không đúng định dạng"
  ): ValidatorFn | null {
    if (!_pattern) return null;

    let regex: RegExp;
    let regexStr: string;
    if (typeof _pattern === "string") {
      regexStr = "";

      if (_pattern.charAt(0) !== "^") {
        regexStr += "^";
      }

      regexStr += _pattern;

      if (_pattern.charAt(_pattern.length - 1) !== "$") {
        regexStr += "$";
      }

      regex = new RegExp(regexStr);
    } else {
      regexStr = _pattern.toString();
      regex = _pattern;
    }

    return (control: AbstractControl) => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }

      return regex.test(control.value)
        ? null
        : {
            error: message,
          };
    };
  }

  static compare(
    myForm: FormGroup,
    nameControlTarget: string,
    message: string
  ) {
    return (control: any, parent: any) => {
      const controlTarget = myForm.get(nameControlTarget);
      // if (isEmptyInputValue(controlTarget!.value)) {
      //   return null; // don't validate empty values to allow optional controls
      // }

      if (control.value !== controlTarget!.value) {
        return { error: message };
      }
      return null;
    };
  }
}
