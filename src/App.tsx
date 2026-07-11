import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/date-range-picker"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { PackingList } from "@/components/packing-list"
import { sendEmail } from "@/lib/email"
import type { DateRange } from "react-day-picker"

type Step = "initial" | "confirm" | "done"

function DecorativeCircles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden>
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/5 animate-float" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/5 animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 -left-16 w-48 h-48 rounded-full bg-primary/8 animate-float" style={{ animationDelay: "0.8s" }} />
    </div>
  )
}

function App() {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [range, setRange] = useState<DateRange | undefined>()
  const [step, setStep] = useState<Step>("initial")

  const handleRangeValid = useCallback((validRange: DateRange) => {
    setRange(validRange)
    setCalendarOpen(false)
    setStep("confirm")
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!range?.from || !range?.to) return

    const days = Math.round((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)) + 1

    console.log("📦 Payload:", {
      from: range.from.toISOString(),
      to: range.to.toISOString(),
      days,
    })
    await sendEmail({ from: range.from, to: range.to, days })
    setStep("done")
  }, [range])

  const handleCancel = useCallback(() => {
    setRange(undefined)
    setStep("initial")
  }, [])

  const restart = useCallback(() => {
    setRange(undefined)
    setStep("initial")
  }, [])

  if (step === "done" && range) {
    return (
      <div className="min-h-dvh flex flex-col relative">
        <DecorativeCircles />
        <main className="flex-1 flex flex-col items-center justify-center px-5 py-10">
          <div className="w-full max-w-md animate-slide-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-primary/10 mb-4">
                <span className="text-3xl">🎒</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Gotowa do drogi
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Wszystko, czego potrzebujesz, już masz
              </p>
            </div>
            <PackingList range={range} />
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={restart}
                className="rounded-full px-8"
              >
                Zaplanuj jeszcze raz
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col relative">
      <DecorativeCircles />
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-lg text-center animate-slide-up">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 mb-6">
            <span className="text-3xl">🌅</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            Znajdź w kalendarzu 3-4 dni dla siebie.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Takie, w które wreszcie wszystko rzucisz, spakujesz najpotrzebniejsze i po prostu uciekniesz.
          </p>
          <p className="text-muted-foreground mt-6 text-sm sm:text-base">
            Wystarczy kilka kliknięć. Reszta przyjdzie sama.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              onClick={() => setCalendarOpen(true)}
              className="text-base px-10 py-5 h-auto rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 active:scale-[0.97] w-full sm:w-auto"
            >
              ✦ Otwórz kalendarz
            </Button>
          </div>
        </div>
      </main>

      <DateRangePicker
        open={calendarOpen}
        onOpenChange={setCalendarOpen}
        onRangeValid={handleRangeValid}
      />

      {step === "confirm" && range && (
        <ConfirmationModal
          open
          range={range}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default App
