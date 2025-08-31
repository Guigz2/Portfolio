'use client'

import { useState } from 'react'

type Props = {
  src: string
  title?: string
  className?: string
  initialVh?: number
}

export default function NotebookEmbed({
  src,
  title = 'Notebook',
  className = '',
  initialVh = 75,
}: Props) {
  const [error, setError] = useState(false)

  return (
    <div className={`relative w-full border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm ${className}`}>
      {!error ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          // sandbox : permet d'exécuter les scripts du HTML exporté (Plotly, etc.)
          // tout en limitant les permissions
          sandbox="allow-scripts allow-same-origin"
          className="w-full"
          style={{ height: `${initialVh}vh` }}
          onError={() => setError(true)}
        />
      ) : (
        <div className="p-4 text-sm">
          <p className="mb-2">
            Impossible d’afficher le notebook intégré.
          </p>
          <a href={src} target="_blank" rel="noreferrer" className="underline">
            Ouvrir le notebook dans un nouvel onglet
          </a>
        </div>
      )}
    </div>
  )
}
