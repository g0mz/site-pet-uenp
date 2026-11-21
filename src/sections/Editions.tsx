import { Section } from '@/components/Section'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { editions } from '@/content/editions'

export function Editions() {
  return (
    <Section id="edicoes" titulo="Edições anteriores">
      <ul className="grid gap-6 md:grid-cols-2">
        {editions.map((ed) => (
          <li key={ed.ano} data-reveal>
            <Dialog>
              <DialogTrigger className="w-full rounded-xl border p-6 text-left transition-colors hover:bg-muted">
                <span className="text-sm text-muted-foreground">{ed.ano}</span>
                <span className="mt-1 block text-xl font-semibold">{ed.titulo}</span>
                <span className="mt-2 block text-muted-foreground">{ed.resumo}</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{ed.titulo}</DialogTitle>
                  <DialogDescription>{ed.resumo}</DialogDescription>
                </DialogHeader>
                <ul className="list-disc pl-5">
                  {ed.destaques.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </Section>
  )
}
