import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/index";

// Componente SelectTableFilter actualizado para manejar el estado
interface SelectTableFilterProps {
  placeholder: string;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SelectTableFilter: React.FC<SelectTableFilterProps> = ({
  placeholder,
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[200px] border-amber-300 ">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup key={label}>
            <SelectLabel>{label}</SelectLabel>
            {options.map((item) => {
              return <SelectItem value={item}>{item}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectTableFilter;
