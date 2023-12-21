interface IInputGroup {
  type?: string;
  label: string;
  value?: string | number;
  name: string;
  placeholder: string;
  error?: string | null;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  handleInput,
}: IInputGroup) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        id={name}
        placeholder={placeholder}
        onChange={handleInput}
        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 mt-2"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </>
  );
};

export default InputGroup;
