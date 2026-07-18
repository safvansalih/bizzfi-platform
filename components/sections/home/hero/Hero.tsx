"use client";

import {
  ArrowRight,
  Calendar,
  Headphones,
  Layers3,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

import { heroData } from "./hero-data";
import { HeroBackground } from "./hero-background";
import Link from "next/link";


export function Hero() {
  return (
    <section className="relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden px-6 py-24">
      {/* Animated Aurora Background */}
      <HeroBackground />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
            {heroData.badge}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="mx-auto mt-8 max-w-5xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Transform Your Business with{" "}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
            AI, Cloud & Enterprise Technology
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg"
        >
          {heroData.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.45,
            ease: "easeOut",
          }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Primary CTA */}
          <Link
  href="/book-consultation"
  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-medium text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
>
  <Calendar className="h-5 w-5" aria-hidden="true" />

  <span>{heroData.primaryButton}</span>

  <ArrowRight
    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden="true"
  />
</Link>

          {/* Secondary CTA */}
          <Link
  href="/contact"
  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
>
  <span>{heroData.secondaryButton}</span>

  <ArrowRight
    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden="true"
  />
</Link>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: "easeOut",
          }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {heroData.stats.map((item, index) => {
            const icons = [Users, Layers3, Headphones];
            const Icon = icons[index];

            return (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Hover Glow */}
                <div
                  className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20"
                  aria-hidden="true"
                />

                <div className="relative flex items-center gap-4 sm:flex-col sm:text-center">
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-400 transition-colors duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {item.value}
                    </div>

                    <div className="mt-1 text-sm text-muted-foreground">
                      {item.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}