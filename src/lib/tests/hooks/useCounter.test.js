import "@testing-library/jest-dom";
import { useCounter } from "./../../hooks/useCounter";
import { act, renderHook } from "@testing-library/react-hooks"; // will attempt to auto-detect

describe("Pruebas en useCounter", () => {
  test("Debe retornar estado inicial", async () => {
    const { result } = renderHook(() => useCounter(1));
    // Obtener el resultado del estado inicial antes de la espera
    const { counter, increment, decrement, reset } = result.current;
    expect(counter).toEqual(1);
    expect(typeof increment).toEqual("function");
    expect(typeof decrement).toEqual("function");
    expect(typeof reset).toEqual("function");
  });


  test("Debe retornar estado después de incrementar", async () => {
    const { result } = renderHook(() => useCounter(1));
    // Obtener el resultado del estado inicial antes de la espera
    const { increment } = result.current;
    expect(result.current.counter).toEqual(1);
    act(() => {
        increment();
    })
    
    expect(result.current.counter).toEqual(2);
  });

  test("Debe retornar estado después de decrementar", async () => {
    const { result } = renderHook(() => useCounter(100));
    // Obtener el resultado del estado inicial antes de la espera
    const { decrement } = result.current;
    expect(result.current.counter).toEqual(100);
    act(() => {
        decrement();
    })
    
    expect(result.current.counter).toEqual(99);
  });

  test("Debe retornar 0 después de reset", async () => {
    const { result } = renderHook(() => useCounter(100));
    // Obtener el resultado del estado inicial antes de la espera
    const { increment, reset } = result.current;
    expect(result.current.counter).toEqual(100);
    act(() => {
        increment();
    });
    expect(result.current.counter).toEqual(101);
    act(() => {
        reset();
    })
    
    expect(result.current.counter).toEqual(100);
  });

});
