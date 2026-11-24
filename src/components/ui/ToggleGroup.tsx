'use client'

interface ToggleGroupProps<V extends string> {
  options: readonly V[]
  value: V
  onChange: (value: V) => void
  label: string
  // Full name of each option, announced instead of the short upper-cased text.
  names: Record<V, string>
}

// A fixed-width segmented switch; options are an enum's values, shown upper-cased.
export function ToggleGroup<V extends string>({ options, value, onChange, label, names }: ToggleGroupProps<V>) {
  return (
    <div className="lang" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          type="button"
          key={option}
          className={option === value ? 'active' : ''}
          aria-pressed={option === value}
          aria-label={names[option]}
          lang={option}
          onClick={() => onChange(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
