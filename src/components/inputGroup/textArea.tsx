interface IInputGroup {
  type?: string;
  label: string;
  value?: string | number;
  name: string;
  placeholder: string;
  error?: string | null;
  handleInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({
  label,
  name,
  placeholder,
  value,
  error,
  handleInput,
}: IInputGroup): JSX.Element => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        className="textarea textarea-bordered w-full"
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        cols={50}
        rows={5}
        onChange={handleInput}
      ></textarea>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </>
  );
};

export default TextArea;
