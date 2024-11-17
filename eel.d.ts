/**
 * Source: https://github.com/torgeilo/python-eel-types
 * License: MIT, Copyright (c) 2024 Torgeir Lorange Østby
 *
 * Usage:
 *
 * Put this file in your project.
 *
 * Type up your Python functions:
 *
 *   interface MyPythonFuncs {
 *     foo(arg: string): number;
 *     bar(arg: number): void;
 *   }
 *
 * Declare the eel global where you need it:
 *
 *   declare const eel: Eel<MyPythonFuncs>;
 *
 * Or potentially on window:
 *
 *   interface Window {
 *     eel: Eel<MyPythonFuncs>;
 *   }
 *
 * Use it:
 *
 *   const num = await eel.foo('hello')();
 */

declare namespace Eel {
  interface Builtins {
    expose: (method: () => unknown, name?: string) => void;
  }

  type ExposedDefs<Defs> = {
    [Name in keyof Defs]: Defs[Name] extends (...args: infer Args) => infer Ret
      ? (
          ...args: Args
        ) => <Callback extends void | ((ret: Ret) => void)>(
          callback?: Callback,
        ) => Callback extends (ret: Ret) => void ? void : Promise<Ret>
      : never;
  };
}

type Eel<Defs = {}> = Eel.ExposedDefs<Defs> & Eel.Builtins;
