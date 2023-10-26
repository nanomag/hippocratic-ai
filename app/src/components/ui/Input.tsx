type InputProps = {
  name: string
  label: string
  placeholder: string
  defaultValue?: string
}
export function Input({
  name,
  label,
  placeholder,
  defaultValue = '',
}: InputProps) {
  return (
    <>
      <label htmlFor={name} className="block mb-1 mt-3 text-sm">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className="border w-full resize-none p-2 text-sm"
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </>
  )
}
