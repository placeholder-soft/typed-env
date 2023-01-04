import * as process from 'process';
import { toBoolean, toInteger, toJSON, toString } from './parseType';

type Nullable = undefined | null;
export class EnvBox<T extends string | number | boolean | Nullable> {
  constructor(readonly name: string, private readonly value?: T) {}

  required() {
    if (this.value == null) {
      throw new Error(
        `Required env variable for name: ${this.name} is not set`
      );
    }
    return new RequiredEnvBox<NonNullable<T>>(this.name, this.value);
  }

  optional() {
    return new EnvBox(this.name, this.value);
  }

  default(value: T) {
    return new EnvBox(this.name, this.value ?? value);
  }
  nonEmpty() {
    if (this.value == null || this.value === '') {
      throw new Error(`Env variable for name: ${this.name} is empty`);
    }
    return new EnvBox(this.name, this.value);
  }
  toBoolean() {
    const { status, value } = this.checkRequiredAndValue();
    if (status) {
      return value;
    }
    return toBoolean(this.name, value);
  }

  toInteger() {
    const { status, value } = this.checkRequiredAndValue();
    if (status) {
      return value;
    }
    return toInteger(this.name, value);
  }

  toString() {
    const { status, value } = this.checkRequiredAndValue();
    if (status) {
      return value;
    }
    return toString(this.name, value);
  }

  toJSON() {
    const { status, value } = this.checkRequiredAndValue();
    if (status) {
      return value;
    }
    return toJSON(this.name, value);
  }

  private checkRequiredAndValue():
    | {
        status: true;
        value?: Nullable;
      }
    | { status: false; value: NonNullable<T> } {
    if (this.value == null) {
      return {
        status: true,
        value: this.value as Nullable,
      };
    }
    return {
      status: false,
      value: this.value,
    };
  }

  static of(name: string) {
    return new EnvBox(
      name,
      process.env[name] as string | number | boolean | Nullable
    );
  }
}

export class RequiredEnvBox<T extends string | number | boolean> {
  constructor(readonly name: string, private readonly value: T) {}

  required() {
    if (this.value == null) {
      throw new Error(
        `Required env variable for name: ${this.name} is not set`
      );
    }
    return new RequiredEnvBox<T>(this.name, this.value);
  }

  optional() {
    return new EnvBox(this.name, this.value);
  }

  default(value: NonNullable<T>) {
    return new RequiredEnvBox(this.name, this.value ?? value);
  }
  nonEmpty() {
    if (this.value == null || this.value === '') {
      throw new Error(`Env variable for name: ${this.name} is empty`);
    }
    return new RequiredEnvBox(this.name, this.value);
  }
  toBoolean() {
    return toBoolean(this.name, this.value);
  }

  toInteger() {
    return toInteger(this.name, this.value);
  }

  toString() {
    return toString(this.name, this.value);
  }

  toJSON() {
    return toJSON(this.name, this.value);
  }

  static of(name: string) {
    return new RequiredEnvBox(
      name,
      process.env[name] as string | number | boolean
    );
  }
}
