import emailjs from "@emailjs/browser"
import { format } from "date-fns"
import { pl } from "date-fns/locale"

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

emailjs.init(PUBLIC_KEY)

interface SendEmailPayload {
  from: Date
  to: Date
  days: number
}

export async function sendEmail({ from, to, days }: SendEmailPayload) {
  const fromFormatted = format(from, "d MMMM yyyy", { locale: pl })
  const toFormatted = format(to, "d MMMM yyyy", { locale: pl })

  const payload = {
    to_email: "kacperres@gmail.com",
    from_date: fromFormatted,
    to_date: toFormatted,
    days_count: days,
    subject: `🧳 Ucieczka: ${fromFormatted} – ${toFormatted}`,
  }

  if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
    console.warn("EmailJS brakuje kluczy — payload:", payload)
    return
  }

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, payload)
}
