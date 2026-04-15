"use client";

type Option = {
  label: string;
  value: string;
};

export function RadioGroup({
  name,
  options,
  defaultValue,
}: {
  name: string;
  options: Option[];
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="glass-muted flex cursor-pointer items-center gap-2 rounded-2xl px-4 py-2 text-sm"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            className="text-soft-blue focus:ring-soft-blue/30"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
