"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { Input } from "../ui/input"

interface DatePickerProps {
  value?: Date
  onChange?: (data: Date) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const initialDate = value instanceof Date ? value : new Date(value ?? new Date())
  const [dataHora, setDataHora] = useState<Date>(initialDate)
  const [hora, setHora] = useState<number>(initialDate.getHours())
  const [minuto, setMinuto] = useState<number>(initialDate.getMinutes())

  // Atualiza o estado interno se a prop value mudar
  useEffect(() => {
    if (value) {
      const novaData = value instanceof Date ? value : new Date(value)
      setDataHora(novaData)
      setHora(novaData.getHours())
      setMinuto(novaData.getMinutes())
    }
  }, [value])

  const handleHoraChange = (h: number) => {
    const novaData = new Date(dataHora)
    novaData.setHours(h)
    setDataHora(novaData)
    setHora(h)
    onChange?.(novaData)
  }

  const handleMinutoChange = (m: number) => {
    const novaData = new Date(dataHora)
    novaData.setMinutes(m)
    setDataHora(novaData)
    setMinuto(m)
    onChange?.(novaData)
  }

  const handleDataChange = (date?: Date) => {
    if (!date) return
    const novaData = new Date(date)
    novaData.setHours(hora)
    novaData.setMinutes(minuto)
    setDataHora(novaData)
    onChange?.(novaData)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
          {format(dataHora, "dd/MM/yyyy HH:mm")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Calendar
          mode="single"
          selected={dataHora}
          onSelect={handleDataChange}
        />
        <div className="flex gap-2 mt-2">
          <Input
            type="number"
            min={0}
            max={23}
            value={hora}
            onChange={(e) => handleHoraChange(+e.target.value)}
            placeholder="HH"
            className="w-16"
          />
          <Input
            type="number"
            min={0}
            max={59}
            value={minuto}
            onChange={(e) => handleMinutoChange(+e.target.value)}
            placeholder="MM"
            className="w-16"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
