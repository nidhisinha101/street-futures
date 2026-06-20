import { motion } from "motion/react";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-6 sm:px-12 lg:px-8 pb-36">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-sans text-xs tracking-widest uppercase mb-6" style={{ color: "var(--signal, #5a8a6a)", opacity: 0.65 }}>
            About
          </p>
          <h1 className="font-serif text-5xl italic font-light text-foreground mb-14" style={{ color: "var(--kiln)", opacity: 0.9 }}>
            Our Visions
          </h1>

          <div className="space-y-8 font-serif text-foreground/75 leading-relaxed text-lg">
            <p className="first-letter:text-6xl first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:leading-none" style={{ firstLetterColor: "var(--kiln)" } as React.CSSProperties}>
              “Street Futures" is an archiving project capturing the sentiments of residents in the Mission district of San Francisco during a time of increased surveillance from ICE. This project encourages people to envision a future where they can walk down the street feeling safe and supported.
            </p>

            <div className="pt-10">
              <p className="font-sans text-xs tracking-widest uppercase mb-2 not-italic" style={{ color: "var(--signal, #5a8a6a)", opacity: 0.6 }}>Contact</p>
              <p className="font-sans text-foreground/70">@bizarrekelp on Instagram</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
