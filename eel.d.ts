/**
 * Source: https://github.com/torgeilo/python-eel-types
 * License: MIT, Copyright (c) 2024 Torgeir Lorange Østby
 *
 * Usage:
 *
 * Put this file in your project.
 *
 * Type up your exposed Python functions:
 *
 *   interface MyPyFuncs {
 *     foo(arg: string): number;
 *     bar(arg: number): void;
 *   }
 *
 * Declare the eel global where you need it:
 *
 *   declare const eel: Eel<MyPyFuncs>;
 *
 * Or potentially on window:
 *
 *   interface Window {
 *     eel: Eel<MyPyFuncs>;
 *   }
 *
 * Use it, now typed:
 *
 *   const num = await eel.foo('hello')();
 */

declare namespace Eel {
  interface Builtins {
    expose: (method: () => unknown, name?: string) => void;
  }

  function ReturnFunc<Ret>(): Promise<Ret>;
  function ReturnFunc<Ret>(callback: (ret: Ret) => void): void;

  type ExposedDefs<Defs> = {
    [Name in keyof Defs]: Defs[Name] extends (...args: infer Args) => infer Ret
      ? (...args: Args) => typeof ReturnFunc<Ret>
      : never;
  };
}

type Eel<Defs = {}> = Eel.ExposedDefs<Defs> & Eel.Builtins;
