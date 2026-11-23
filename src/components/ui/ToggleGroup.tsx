'use client'

interface ToggleGroupProps<V extends string> {
  options: readonly V[]
  value: V
  onChange: (value: V) => void
  label: string
}

// A fixed-width segmented switch; options are an enum's values, shown upper-cased.
export function ToggleGroup<V extends string>({ options, value, onChange, label }: ToggleGroupProps<V>) {
  return (
    <div className="lang" role="group" aria-label={label}>
      {options.map((option) => (
        <button type="button" key={option} className={option === value ? 'active' : ''} onClick={() => onChange(option)}>
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
