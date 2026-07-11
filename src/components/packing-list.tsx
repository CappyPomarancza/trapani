import { format } from "date-fns"
import { pl } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

interface PackingListProps {
  range: DateRange
}

const bring = [
  { icon: "😊", item: "Uśmiech", desc: "najważniejszy bagaż podręczny" },
  { icon: "🌟", item: "Pozytywne nastawienie", desc: "reszta ułoży się sama" },
  { icon: "🍽️", item: "Apetyt", desc: "na nowe smaki i niespodzianki" },
  { icon: "🩴", item: "Klapki", desc: "sprawdzone w boju, obtarte z miłością — drugi raz nie dadzą rady" },
  { icon: "🩹", item: "Plaster", desc: "na pęcherze i na chwilowe zwątpienia" },
  { icon: "🎒", item: "Otwarta głowa", desc: "na ludzi, miejsca i przypadki" },
]

const dontBring = [
  { icon: "😰", item: "Wyimaginowane obawy", desc: "nie zmieszczą się do plecaka" },
  { icon: "🤔", item: "Nieuzasadnione zmartwienia", desc: "przedłużają pobyt w domu" },
  { icon: "📋", item: "Lista rzeczy, które mogą pójść nie tak", desc: "oszczędź sobie czytania" },
]

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border bg-card shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export function PackingList({ range }: PackingListProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="font-semibold text-base">
          {range.from && format(range.from, "d MMMM", { locale: pl })} –{" "}
          {range.to && format(range.to, "d MMMM yyyy", { locale: pl })}
        </p>
      </div>

      <SectionCard>
        <div className="px-4 pt-4 pb-2">
          <h2 className="font-semibold text-sm text-primary flex items-center gap-2">
            <span className="size-5 rounded-md bg-primary/10 flex items-center justify-center text-xs">✓</span>
            Zabierz ze sobą
          </h2>
        </div>
        <ul className="divide-y">
          {bring.map(({ icon, item, desc }) => (
            <li key={item} className="flex items-center gap-3 px-4 py-3">
              <span className="text-xl flex-shrink-0 size-9 flex items-center justify-center rounded-xl bg-primary/5">
                {icon}
              </span>
              <div className="min-w-0">
                <p className="font-medium text-sm">{item}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard>
        <div className="px-4 pt-4 pb-2">
          <h2 className="font-semibold text-sm text-destructive flex items-center gap-2">
            <span className="size-5 rounded-md bg-destructive/10 flex items-center justify-center text-xs">✕</span>
            Nie zabieraj
          </h2>
        </div>
        <ul className="divide-y">
          {dontBring.map(({ icon, item, desc }) => (
            <li key={item} className="flex items-center gap-3 px-4 py-3">
              <span className="text-xl flex-shrink-0 size-9 flex items-center justify-center rounded-xl bg-destructive/5">
                {icon}
              </span>
              <div className="min-w-0">
                <p className="font-medium text-sm">{item}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}
