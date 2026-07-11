import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { differenceInCalendarDays } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { DateRange } from "react-day-picker"

interface ConfirmationModalProps {
  open: boolean
  range: DateRange
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmationModal({ open, range, onConfirm, onCancel }: ConfirmationModalProps) {
  if (!range.from || !range.to) return null

  const days = differenceInCalendarDays(range.to, range.from) + 1

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onCancel() }}>
      <DialogContent>
        <DialogHeader>
          <div className="mx-auto size-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
            <span className="text-2xl">✈️</span>
          </div>
          <DialogTitle className="text-center">Jesteś pewna?</DialogTitle>
          <DialogDescription className="text-center">
            Przed Tobą {days} dni wolności. Gotowa?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-2xl border bg-muted/50 p-4 text-center">
            <p className="text-base sm:text-lg font-semibold">
              {format(range.from, "d MMMM yyyy", { locale: pl })}
            </p>
            <div className="flex items-center justify-center gap-2 my-2 text-muted-foreground">
              <span className="h-px w-6 bg-border" />
              <span className="text-xs font-medium">do</span>
              <span className="h-px w-6 bg-border" />
            </div>
            <p className="text-base sm:text-lg font-semibold">
              {format(range.to, "d MMMM yyyy", { locale: pl })}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Łącznie: <span className="font-semibold text-foreground">{days}</span>{" "}
              {days === 1 ? "dzień" : "dni"}
            </p>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto rounded-xl">
            Jeszcze nie
          </Button>
          <Button onClick={onConfirm} className="w-full sm:w-auto rounded-xl">
            Tak, ruszam!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
