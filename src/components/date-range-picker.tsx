import { useState, useEffect } from "react"
import { format, differenceInCalendarDays } from "date-fns"
import { pl } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { DateRange } from "react-day-picker"

interface DateRangePickerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRangeValid: (range: DateRange) => void
}

export function DateRangePicker({ open, onOpenChange, onRangeValid }: DateRangePickerProps) {
  const [range, setRange] = useState<DateRange | undefined>()
  const [error, setError] = useState<string | null>(null)
  const [months, setMonths] = useState(1)

  useEffect(() => {
    if (open) {
      setRange(undefined)
      setError(null)
    }
  }, [open])

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)")
    setMonths(mql.matches ? 2 : 1)
    const handler = (e: MediaQueryListEvent) => setMonths(e.matches ? 2 : 1)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  const handleSelect = (selected: DateRange | undefined) => {
    setRange(selected)
    setError(null)

    if (selected?.from && selected?.to) {
      const days = differenceInCalendarDays(selected.to, selected.from)
      if (days < 2) {
        setError("Co najmniej 3 dni — nie uciekniesz szybciej.")
      } else if (days > 3) {
        setError("4 dni w zupełności wystarczy.")
      }
    }
  }

  const handleConfirm = () => {
    if (range?.from && range?.to) {
      const days = differenceInCalendarDays(range.to, range.from)
      if (days >= 2 && days <= 3) {
        onRangeValid(range)
      } else {
        setError("Tylko 3 albo 4 dni. Żadnych kompromisów.")
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Kiedy uciekasz?</DialogTitle>
          <DialogDescription>
            3 albo 4 dni. Tyle potrzebujesz.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center overflow-x-auto -mx-2 px-2">
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={months}
            locale={pl}
            disabled={[
              { before: new Date(2026, 7, 27) },
              { after: new Date(2026, 9, 29) },
            ]}
            startMonth={new Date(2026, 7, 1)}
            endMonth={new Date(2026, 9, 31)}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive text-center font-medium">{error}</p>
        )}
        {range?.from && range?.to && !error && (
          <p className="text-sm text-muted-foreground text-center">
            {format(range.from, "d MMM", { locale: pl })} –{" "}
            {format(range.to, "d MMM", { locale: pl })}
            {" • "}
            {differenceInCalendarDays(range.to, range.from) + 1} dni
          </p>
        )}
        {range?.from && range?.to && (
          <Button onClick={handleConfirm} className="w-full rounded-xl">
            Te daty są dobre
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
