'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [state, setState] = useState<'idle' | 'sent'>('idle')

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Ici tu brancheras un service (Formspree, Resend, API route, etc.)
    setState('sent')
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-4xl md:text-6xl font-bold uppercase">Contact</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">Discutons de votre projet ou collaboration.</p>

      {state === 'sent' ? (
        <p className="mt-6 border border-green-400/40 bg-green-500/10 p-3 text-sm">Merci ! Votre message a été envoyé (exemple). Je vous réponds rapidement.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm">Nom</span>
            <input required name="name" className="border border-neutral-300 dark:border-neutral-700 bg-transparent p-2" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm">Email</span>
            <input required type="email" name="email" className="border border-neutral-300 dark:border-neutral-700 bg-transparent p-2" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm">Message</span>
            <textarea required name="message" rows={6} className="border border-neutral-300 dark:border-neutral-700 bg-transparent p-2" />
          </label>
          <div className="flex items-center gap-4">
            <button type="submit" className="border px-4 py-2 text-sm border-neutral-800 dark:border-neutral-200">Envoyer</button>
            <a href="mailto:hello@example.com" className="underline text-sm">ou écrire à hello@example.com</a>
          </div>
        </form>
      )}
    </section>
  )
}