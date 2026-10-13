"use client";

import * as React from "react";
import Link from "next/link";
import { Users, Zap, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const PHOTO_URL =
  "https://res.cloudinary.com/viecqvpk/image/upload/v1791856278/IMG_4430.JPG_bptwgv.jpg";

type AboutItem = {
  value: string;
  label: string;
  kicker: string;
  heading: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
  src: string;
  alt: string;
};

const items: AboutItem[] = [
  {
    value: "tentang",
    label: "Tentang",
    kicker: "WHO WE ARE",
    heading: "Tentang Bayan Run",
    body: "Bayan Run 2026 adalah perayaan lari terbesar yang pernah ada di Kalimantan — sebuah komunitas yang lahir dari semangat kebersamaan, kebanggaan daerah, dan gaya hidup sehat yang berkelanjutan bagi seluruh lapisan masyarakat.",
    icon: Users,
    src: PHOTO_URL,
    alt: "Bayan Run 2026 Kalimantan",
  },
  {
    value: "misi",
    label: "Misi",
    kicker: "WHAT DRIVES US",
    heading: "Misi Kami",
    body: "Mendorong setiap pelari untuk melampaui batas diri, mempertemukan komunitas dari berbagai latar belakang, dan menjadikan setiap langkah sebagai wujud nyata persatuan. Setiap langkah mendekatkan kita satu sama lain.",
    icon: Zap,
    src: PHOTO_URL,
    alt: "Misi Bayan Run 2026",
  },
  {
    value: "visi",
    label: "Visi",
    kicker: "WHERE WE'RE HEADED",
    heading: "Visi Kami",
    body: "Menjadi event lari ikonik bertaraf internasional yang berpusat di Kalimantan — membangun warisan prestasi, menginspirasi generasi berikutnya, dan menempatkan Bayan Run sebagai simbol kebanggaan Borneo di peta lari dunia.",
    icon: Star,
    src: PHOTO_URL,
    alt: "Visi Bayan Run 2026",
  },
];

const stats = ["Terbesar di Kalimantan", "Ribuan pelari", "Skala internasional"];

export default function BayanRunAboutMissionVision({
  className,
  panelMinHeight = 640,
}: {
  className?: string;
  panelMinHeight?: number;
}) {
  const [active, setActive] = React.useState<string>(items[0].value);

  return (
    <section className={cn("w-full bg-gray-200 text-gray-900", className)}>
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:py-20 lg:gap-14">
        {/* Left column */}
        <div className="md:col-span-6">
          <Badge
            variant="outline"
            className="mb-6 gap-2 border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-500 shadow-sm"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
            Bayan Run 2026
          </Badge>

          <h2 className="text-balance text-4xl font-bold leading-[0.95] tracking-tight text-blue-800 sm:text-5xl md:text-6xl">
            WHO WE ARE
          </h2>

          <p className="mt-6 max-w-xl text-gray-500">
            Mengenal lebih dekat semangat, misi, dan visi Bayan Run 2026  event
            lari terbesar di Kalimantan yang membangun gaya hidup sehat dan
            persatuan di tanah Kalimantan.
          </p>

          {/* Stats chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {stats.map((s, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="border border-gray-200 bg-white text-gray-700 hover:bg-white"
              >
                {s}
              </Badge>
            ))}
          </div>

          {/* Accordion (synced with tabs) */}
          <div className="mt-10 max-w-xl">
            <Accordion
              type="single"
              collapsible
              value={active}
              onValueChange={(v) => v && setActive(v)}
              className="w-full"
            >
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <AccordionItem
                    key={item.value}
                    value={item.value}
                    className="border-gray-300"
                  >
                    <AccordionTrigger className="text-left text-base font-medium text-gray-900">
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                          <Icon className="h-4 w-4 text-blue-700" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-blue-700">
                            {item.kicker}
                          </span>
                          <span>{item.heading}</span>
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-500">
                      {item.body}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-6">
          <Card
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 shadow-sm"
            style={{ height: panelMinHeight, minHeight: panelMinHeight }}
          >
            <Tabs
              value={active}
              onValueChange={setActive}
              className="relative h-full w-full"
            >
              <div className="relative h-full w-full">
                {items.map((t, idx) => (
                  <TabsContent
                    key={t.value}
                    value={t.value}
                    className={cn(
                      "absolute inset-0 m-0 h-full w-full",
                      "data-[state=inactive]:hidden"
                    )}
                  >
                    <img
                      src={t.src}
                      alt={t.alt}
                      className="h-full w-full object-cover object-center"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    <div className="absolute left-5 top-5">
                    </div>
                    <p className="absolute bottom-20 left-5 text-xs text-white/70">
                      © Dokumentasi Bayan Run Resmi
                    </p>
                  </TabsContent>
                ))}
              </div>

              {/* Tab controls (pill) */}
              <div className="pointer-events-auto absolute inset-x-0 bottom-4 z-10 flex w-full justify-center">
                <TabsList className="flex gap-2 rounded-xl border border-gray-200 bg-white/80 p-1 text-gray-600 backdrop-blur supports-[backdrop-filter]:bg-white/70">
                  {items.map((t) => (
                    <TabsTrigger
                      key={t.value}
                      value={t.value}
                      className="rounded-lg px-4 py-2 text-gray-700 data-[state=active]:bg-blue-800 data-[state=active]:text-white"
                    >
                      {t.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
}