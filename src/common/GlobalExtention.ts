/* eslint-disable no-extend-native */
import "./GlobalExtention.d";

import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from "react-reactive-form";

// prototype

String.prototype.convertToDate = function (this: string) {
  return new Date(
    parseInt(this.substring(0, 4)),
    parseInt(this.substring(4, 6)) - 1,
    parseInt(this.substring(6, 8))
  );
};

String.prototype.convertJavaToDate = function (this: string) {
  const value = this.split('-');
  return new Date(
    parseInt(value[0]),
    parseInt(value[1]) - 1,
    parseInt(value[2])
  );
};

String.prototype.convertYYYYMMDDToDate = function (this: string) {
  return new Date(
    parseInt(this.substring(0, 4)),
    parseInt(this.substring(4, 6)) - 1,
    parseInt(this.substring(6, 8))
  );
};

String.prototype.convertLongToDate = function (this: string) {
  return new Date(
    parseInt(this.substring(0, 4)),
    parseInt(this.substring(4, 6)) - 1,
    parseInt(this.substring(6, 8)),
    parseInt(this.substring(8, 10)),
    parseInt(this.substring(10, 12)),
    parseInt(this.substring(12, 13))
  );
};

String.prototype.stringDateVItoStringYYYYMMDD = function (
  this: string
): string {
  let arr = this.split("/");
  if (arr[0].length < 2) arr[0] = "0" + arr[0];
  if (arr[1].length < 2) arr[1] = "0" + arr[1];
  return arr[2] + arr[1] + arr[0];
};

String.prototype.convertYYYYMMDDToString = function (this: string): string {
  let arr1 = this.slice(0, 4);
  let arr2 = this.slice(4, 6);
  let arr3 = this.slice(6, 8);
  return arr3 + "/" + arr2 + "/" + arr1;
};

String.prototype.toJsonArray = function (
  this: string,
  defaultValue: any = []
): any {
  if (this !== null && this !== "") {
    return JSON.parse(this);
  }
  return [];
};

String.prototype.toUnSign = function (
  this: string,
  toUper: boolean = true
): string {
  let str = this;
  const AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  if (toUper) {
    str = str.toUpperCase();
  }
  return str;
};

String.prototype.removeAccents = function (this: string): string {
  let str = this;
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
};

String.prototype.isNotEmpty = function (this: string): boolean {
  return this !== "" && this !== null;
};

Number.prototype.convertYYYYMMDDToDate = function (this: Number): Date | null {
  if (!this) return null;
  return this.toString().convertYYYYMMDDToDate();
};

Number.prototype.convertYYYYMMDDHHmmssToDate = function (this: Number) {
  if (!this) return null;
  return this.toString().convertLongToDate();
};

Number.prototype.convertIntegerToDate = function (this: Number): Date | null {
  if (!this) return null;
  return this.toString().convertLongToDate();
};

Number.prototype.toFixedAndClear = function (
  this: number,
  fractionDigits: number | undefined
): string {
  if (!this) return "";
  let source = this.toFixed(fractionDigits);
  return (+source).toString();
};

Number.prototype.toRomanNumeral = function (this: number): string | null {
  function romanize(num: number) {
    let lookup: any = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
      },
      roman = "",
      i;
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

  if (!this) return null;
  return romanize(this);
};

Date.prototype.toNumberYYYYMMDD = function (this: Date): Number | null {
  if (!this) return null;
  let monthValue = (this.getMonth() + 1).toString();
  if (monthValue.length === 1) {
    monthValue = `0${monthValue}`;
  }
  let dateValue = this.getDate().toString();
  if (dateValue.length === 1) {
    dateValue = `0${dateValue}`;
  }
  return +`${this.getFullYear()}${monthValue}${dateValue}`;
};

Date.prototype.toNumberYYYYMMDDHHmmss = function (this: Date): Number | null {
  if (!this) return null;
  let monthValue = (this.getMonth() + 1).toString();
  if (monthValue.length === 1) {
    monthValue = `0${monthValue}`;
  }
  let dateValue = this.getDate().toString();
  if (dateValue.length === 1) {
    dateValue = `0${dateValue}`;
  }
  let hourseValue = this.getHours().toString();
  if (hourseValue.length === 1) {
    hourseValue = `0${hourseValue}`;
  }
  let minusValue = this.getMinutes().toString();
  if (minusValue.length === 1) {
    minusValue = `0${minusValue}`;
  }
  let seconValue = this.getSeconds().toString();
  if (seconValue.length === 1) {
    seconValue = `0${seconValue}`;
  }
  return +`${this.getFullYear()}${monthValue}${dateValue}${hourseValue}${minusValue}${seconValue}`;
};

Date.prototype.toStringShortDate = function (this: Date): string {
  let monthValue = (this.getMonth() + 1).toString();
  if (monthValue.length === 1) {
    monthValue = `0${monthValue}`;
  }
  let dateValue = this.getDate().toString();
  if (dateValue.length === 1) {
    dateValue = `0${dateValue}`;
  }
  return `${dateValue}/${monthValue}/${this.getFullYear()}`;
};

FormGroup.prototype.markAllAsTouched = function (this: FormGroup) {
  const markAllAsTouchedFc = function (myForm: AbstractControl) {
    if (myForm instanceof FormGroup) {
      const formGroupValue = myForm as FormGroup;
      for (const item in formGroupValue.controls) {
        markAllAsTouchedFc(formGroupValue.get(item)!);
      }
      myForm.updateValueAndValidity({ onlySelf: true });
    } else if (myForm instanceof FormArray) {
      const formArrayValue = myForm as FormArray;
      for (let i = 0; i < formArrayValue.length; i++) {
        const formGroupValue = formArrayValue.at(i);
        markAllAsTouchedFc(formGroupValue as AbstractControl);
      }
    } else if (myForm instanceof FormControl) {
      myForm.markAsTouched({ emitEvent: true });
    }
  };
  markAllAsTouchedFc(this);
};

FormGroup.prototype.markAllUnAsTouched = function (this: FormGroup) {
  const markAllUnAsTouchedFc = function (myForm: AbstractControl) {
    if (myForm instanceof FormGroup) {
      const formGroupValue = myForm as FormGroup;
      for (const item in formGroupValue.controls) {
        markAllUnAsTouchedFc(formGroupValue.get(item)!);
      }
      myForm.updateValueAndValidity({ emitEvent: false });
    } else if (myForm instanceof FormArray) {
      const formArrayValue = myForm as FormArray;
      for (let i = 0; i < formArrayValue.length; i++) {
        const formGroupValue = formArrayValue.at(i);
        markAllUnAsTouchedFc(formGroupValue as AbstractControl);
      }
    } else if (myForm instanceof FormControl) {
      let value = myForm.value;
      myForm.reset();
      myForm.setValue(value, { emitEvent: false });
      myForm.updateValueAndValidity({ emitEvent: true });
    }
  };
  markAllUnAsTouchedFc(this);
};
