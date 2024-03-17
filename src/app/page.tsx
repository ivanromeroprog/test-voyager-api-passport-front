import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Breadcrumb from "@/components/BreadcrumbNav";

export default function Page() {
  return (
    <main className="xl:mx-auto max-w-7xl mx-5">
      <h1 className="p-4 text-2xl bg-primary text-primary-foreground rounded-lg">
        Home
      </h1>

      <section className="p-4 m-2 border rounded-lg">
        <h2 className="text-xl mb-4 mx-4">Botones y accordion</h2>
        <div className="flex w-full gap-5 flex-col md:flex-row">
          <div className="flex-col flex gap-2 min-w-60">
            <Button>Holas</Button>
            <Button variant="secondary">Holas</Button>
            <Button variant="destructive">Holas</Button>
            <Button variant="outline">Holas</Button>
          </div>

          <div className="flex-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      <section className="p-4 m-2 border rounded-lg">
        <h2 className="text-xl mb-4 mx-4">Botones y accordion</h2>
        <div className="flex w-full gap-5 flex-col md:flex-row">
          <div className="flex-col flex gap-2 min-w-60">
            <Calendar mode="single" className="rounded-md border" />
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
