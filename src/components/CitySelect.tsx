import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface City {
  value: string;
  label: string;
  region: string;
}

interface CitySelectProps {
  cities: City[];
  selectedCity: string;
  selectedRegion: string;
  onCitySelect: (city: City) => void;
}

const CitySelect = ({ cities, selectedCity, selectedRegion, onCitySelect }: CitySelectProps) => {
  const [open, setOpen] = useState(false);

  console.log("Selected city:", selectedCity);
  console.log("Available cities:", cities);

  return (
    <div>
      <Label>Доставка</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedCity || "Выберите город..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Поиск города..." />
            <CommandList>
              <CommandEmpty>Город не найден.</CommandEmpty>
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.value}
                    value={city.value}
                    onSelect={() => {
                      onCitySelect(city);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCity === city.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="text-sm text-gray-500 mt-1">{selectedRegion}</div>
    </div>
  );
};

export default CitySelect;