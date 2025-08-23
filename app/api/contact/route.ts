import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message, botfield } = await req.json()

    // Honeypot anti-bot : si rempli, on “réussit” silencieusement
    if (botfield) return NextResponse.json({ ok: true })

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Champs manquants' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'Contact Site <onboarding@resend.dev>',
      to: ['guillaume.egu@gmail.com'],
      subject: `Nouveau message du site — ${name}`,
      // replyTo permet de répondre directement à l’expéditeur
      replyTo: [email],
      text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
      // Optionnel si tu veux un rendu HTML plus sympa :
      // html: `<p><strong>Nom:</strong> ${name}<br/><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g,'<br/>')}</p>`
    })

    if (error) {
      return NextResponse.json({ ok: false, error: error.message ?? 'Erreur envoi' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? 'Erreur serveur' },
      { status: 500 }
    )
  }
}
