type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>

type ColorRange = Range<1, 11>

export default ColorRange