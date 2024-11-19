# TypeScript types for Python Eel

Type up your exposed [Python Eel](https://github.com/python-eel/Eel) functions in TypeScript so that you can call them from the `eel` global with some level of type safety.

## How to use

Grab [eel.d.ts](https://github.com/torgeilo/python-eel-types/blob/main/eel.d.ts) and place it in your project.

Manually type up (or find a converter for) your Python functions in TypeScript and declare `eel`'s type:

```ts
// Type up the exposed Python functions in TypeScript:
interface MyPyFuncs {
  // def get_number() -> float:
  get_number(): number;

  // def save_number(num: float) -> None:
  save_number(num: number): void;
}

// Declare the eel global:
declare const eel: Eel<MyPyFuncs>;

// Or potentially on window:
interface Window {
  eel: Eel<MyPyFuncs>;
}

// Or make a typed alias:
const e = eel as Eel<MyPyFuncs>;

// The Python functions are now typed up in the eel API, as async and with callback:
async function test(): void {
  const num = await eel.get_number()();
  // num is number

  eel.get_number()((num) => console.log(num));
  // num is number
}
```

## License

This software is licensed under the terms of the MIT license.
