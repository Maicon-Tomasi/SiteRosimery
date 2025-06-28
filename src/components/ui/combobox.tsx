"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

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
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

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
          className={cn(
            "w-full border border-slate-300 rounded px-3 py-2 justify-between text-left text-sm font-medium shadow-sm bg-white hover:bg-muted transition"
          )}
        >
          {selected ? selected.label : "Selecione"}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 mt-1 rounded-xl border bg-white shadow-lg z-50">
        <Command>
          <CommandInput
            placeholder="Pesquisar paciente..."
            className="h-9 px-3 text-sm border-b focus:outline-none"
          />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
              Nenhum encontrado!
            </CommandEmpty>
            {disabled ? (
              <CommandEmpty className="px-3 py-2 text-sm text-destructive">
                Troca de produto não permitida!
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {opcoes.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => handleSelect(item.value)}
                    className="cursor-pointer px-3 py-2 hover:bg-muted rounded-md flex items-center justify-between"
                  >
                    {item.label}
                    <Check
                      className={cn(
                        "h-4 w-4 text-primary",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
