"use client";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { currencyList } from "@/lib/currency";
import { BadgeCheck } from "lucide-react";
import useQueryParams from "@/app/hooks/useQueryParams";
import { useState } from "react";

const CurrencyInput = () => {
  const [open, setOpen] = useState(false);
  const { value, setValue } = useQueryParams("currency", "INR");

  const currencyDetails = currencyList.find(
    (currency) => currency.value.toLowerCase() === value.toLowerCase()
  )?.details;

  return (
    <div className="flex group items-center  relative h-[52px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full">
          <button className="flex gap-2 items-center justify-between w-full">
            <label className="block text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">
              Currency
            </label>
            <div className="flex gap-2 bg-neutral-100 text-sm px-2 rounded-full py-1">
              <div
                style={{ background: currencyDetails?.currencyColor }}
                className="rounded-full w-5 h-5 text-white"
              >
                {currencyDetails?.currencySymbol}
              </div>
              <p className="font-semibold">
                {currencyDetails?.currencyShortForm}
              </p>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 PopoverContent mt-3">
          <Command className="w-full">
            <CommandInput
              placeholder="Search currency..."
              className="peer block w-full border-0 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 placeholder:text-neutral-700/40 placeholder:font-medium caret-orange-500"
            />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="max-h-96 overflow-y-auto scrollbar-hide">
              {currencyList.map((currency) => (
                <CommandItem
                  key={currency.value}
                  value={currency.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="w-full cursor-pointer my-2"
                >
                  <div className="flex gap-2 justify-between items-center w-full">
                    <div className="flex gap-2 items-center">
                      <div
                        style={{ background: currency.details.currencyColor }}
                        className="rounded-full w-6 h-6 flex justify-center items-center text-white text-center"
                      >
                        {currency.details.currencySymbol}
                      </div>
                      <p className="font-medium">
                        {currency.details.currencyName}
                      </p>
                      <p className="font-medium text-neutral-500">
                        {currency.details.currencyShortForm}
                      </p>
                    </div>
                    <BadgeCheck
                      className={cn(
                        "h-6 w-6 rounded-full",
                        value.toLowerCase() === currency.value.toLowerCase()
                          ? "opacity-100 bg-orange-500 text-white"
                          : "opacity-0"
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div
        className={`absolute inset-x-0 bottom-0 border-t border-gray-300  group-focus:border-t border-dashed ${
          open ? "border-orange-500" : "group-hover:border-neutral-400"
        }`}
        aria-hidden="true"
      />
    </div>
  );
};

export default CurrencyInput;
