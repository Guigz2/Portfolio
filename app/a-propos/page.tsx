import AnalogClock from "@/components/AnalogClock"
import PixelBackground from "@/components/PixelBackground"
import AlternatingShowcase from "@/components/AlternatingShowCase"

export const dynamic = "force-static"

export default function AProposPage() {
  return (
    <>
      <PixelBackground cellSize={56} radius={50} intensity={0.9} />

      <section className="mx-auto max-w-5xl px-4 py-4 md:py-16">
        <h1 className="text-4xl md:text-6xl pb-4 font-bold uppercase">Portrait</h1>
        <AlternatingShowcase />
      </section>
      <div className="md:py-8 md:pt-64 text-center">
        <a
          href="/CV%20Guillaume%20EGU.pdf"
          download
          className=" mt-6 inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Télécharger le CV
        </a>
        <AnalogClock />
      </div>
    </>
  )
}
