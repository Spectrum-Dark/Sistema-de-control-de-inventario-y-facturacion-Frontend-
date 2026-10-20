const claseTextarea =
  "w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200";

export default function CampoTextarea({
  id,
  label,
  value,
  maxLength,
  ...props
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={3}
        value={value}
        maxLength={maxLength}
        className={claseTextarea}
        {...props}
      />
      {maxLength && (
        <p className="mt-1 text-right text-xs text-slate-400">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}
