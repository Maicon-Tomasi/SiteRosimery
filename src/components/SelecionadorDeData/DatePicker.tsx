"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"

interface SelecionadorDeDataProps {
  value?: Date
  onChange?: (data: Date) => void
}

export function SelecionadorDeData({ value, onChange }: SelecionadorDeDataProps) {
  const parseToValidDate = (input?: any): Date => {
    const parsed = input instanceof Date ? input : new Date(input)
    return isNaN(parsed.getTime()) ? new Date() : parsed
  }

  const [dataSelecionada, setDataSelecionada] = useState<Date>(parseToValidDate(value))

  useEffect(() => {
    if (value) {
      const novaData = parseToValidDate(value)
      setDataSelecionada(novaData)
    }
  }, [value])

  const handleDataChange = (date?: Date) => {
    if (!date) return
    setDataSelecionada(date)
    onChange?.(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
          {isNaN(dataSelecionada.getTime()) ? "Selecione uma data" : format(dataSelecionada, "dd/MM/yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Calendar
          mode="single"
          selected={dataSelecionada}
          onSelect={handleDataChange}
        />
      </PopoverContent>
    </Popover>
  )
}
