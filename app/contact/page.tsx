'use client'

import { useState } from 'react'
import Link from "next/link"

export default function ContactPage() {
  const [state, setState] = useState<'idle' | 'sent' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'Erreur')
      form.reset()
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <section className="bg-white mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-black text-4xl md:text-6xl font-bold uppercase">Contact</h1>
      <p className="text-black mt-3 text-neutral-600 dark:text-neutral-400">Discutons de collaboration.</p>

      {state === 'sent' && (
        <>
          <p className="mt-6 border border-green-400/40 bg-green-500/10 p-3 text-sm">
            Merci ! Votre message a été envoyé. Je vous réponds rapidement.
          </p>
          <Link href="/" className=" mt-6 inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">Revenir à l'accueil</Link>
        </>
      )}
      {state === 'error' && (
        <p className="mt-6 border border-red-400/40 bg-red-500/10 p-3 text-sm">
          Oups, l’envoi a échoué. Réessayez ou utilisez le lien email ci-dessous.
        </p>
      )}

      {state === 'idle' && (
        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          {/* Honeypot anti-bot */}
          <input type="text" name="botfield" className="hidden" tabIndex={-1} autoComplete="off" />

          <label className="grid gap-2">
            <span className="text-black text-sm">Votre Nom</span>
            <input required name="name" className="border border-neutral-300 dark:border-neutral-700 bg-transparent p-2" />
          </label>
          <label className="grid gap-2">
            <span className="text-black text-sm">Votre Email</span>
            <input required type="email" name="email" className="border border-neutral-300 dark:border-neutral-700 bg-transparent p-2" />
          </label>
          <label className="grid gap-2">
            <span className="text-black text-sm">Votre Message</span>
            <textarea required name="message" rows={6} className="border border-neutral-300 dark:border-neutral-700 bg-transparent p-2" />
          </label>
          <div className="flex items-center gap-4">
            <button type="submit" className="border px-4 py-2 text-sm border-neutral-800 dark:border-neutral-200">Envoyer</button>
            <a href="mailto:guillaume.egu@gmail.com" className="text-black underline text-sm">ou écrire à guillaume.egu@gmail.com</a>
          </div>
        </form>
      )}
    </section>
  )
}