type TextareaProps = {
  name: string
  label: string
  placeholder: string
}
export function Textarea({ name, label, placeholder }: TextareaProps) {
  return (
    <>
      <label htmlFor={name} className="block mb-4 text-sm">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        className="border w-full resize-none p-2 text-sm"
        placeholder={placeholder}
        rows={10}
      ></textarea>
    </>
  )
}
