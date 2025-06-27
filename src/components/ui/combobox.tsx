"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk"

type Opcao = {
  value: string
  label: string
}

interface ComboboxDemoProps {
  opcoes: Opcao[]
  onSelectProp?: (value: string) => void
  value?: string
  disabled?: boolean
}

export function ComboboxDemo({
  opcoes = [],
  onSelectProp,
  value: externalValue,
  disabled = false,
}: ComboboxDemoProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")

  useEffect(() => {
    setValue(externalValue || "")
  }, [externalValue])

  const selected = opcoes.find((item) => item.value === value)

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue
    setValue(newValue)
    setOpen(false)
    if (onSelectProp) onSelectProp(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full border border-slate-300 rounded px-2 py-1 justify-between text-left"
        >
          {selected ? selected.label : "Selecione"}
          <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Pesquisar" className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum encontrado!</CommandEmpty>
              {disabled ? (
                <CommandGroup>
                  {opcoes.map((item, index) => (
                    <CommandItem
                      key={index}
                      value={item.value}
                      onSelect={() => handleSelect(item.value)}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
