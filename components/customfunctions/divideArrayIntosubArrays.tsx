function DivideArrayIntoSubArray(arr: Array<string>) {
  return Array.from({ length: Math.ceil(arr.length / 2) }, (_, i) =>
    arr.slice(i * 2, i * 2 + 2),
  );
}

export { DivideArrayIntoSubArray };
