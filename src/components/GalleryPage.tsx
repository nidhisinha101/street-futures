import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { supabase, Submission } from "../lib/supabase";

// Dramatic variation patterns — cycle through these
const VARIATIONS = [
  { fontSize: "1.6rem",  opacity: 0.90, fontStyle: "italic"  as const },
  { fontSize: "0.82rem", opacity: 0.40, fontStyle: "normal"  as const },
  { fontSize: "1.15rem", opacity: 0.70, fontStyle: "normal"  as const },
  { fontSize: "2.1rem",  opacity: 0.85, fontStyle: "italic"  as const },
  { fontSize: "0.75rem", opacity: 0.32, fontStyle: "normal"  as const },
  { fontSize: "1.35rem", opacity: 0.65, fontStyle: "italic"  as const },
  { fontSize: "0.9rem",  opacity: 0.50, fontStyle: "normal"  as const },
  { fontSize: "1.8rem",  opacity: 0.80, fontStyle: "italic"  as const },
];

// Default submissions for demo/fallback
const DEFAULT_SUBMISSIONS: Submission[] = [
  { id: "1", content: "In our neighborhood, the old central grid was replaced by 'The Communitree'—a massive, biomechanically engineered banyan that filters the air while serving as a hub for decentralized solar storage. Its glowing moss gently illuminates the plaza at night.", created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: "2", content: "We stopped relying on external supply chains five years ago. Our emergency response system is modeled after mycelial networks. When one block experiences a shortage, neighboring blocks automatically redirect surplus.", created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: "3", content: "The skyscrapers of the old financial district are now lush vertical forests. Every floor is a specialized biome providing food, medicine, and oxygen for the residents below.", created_at: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: "4", content: "Children learn to tend soil before they learn to code. Both are languages of care.", created_at: new Date(Date.now() - 86400000 * 12).toISOString() },
  { id: "5", content: "We rerouted the old industrial canal back through the neighborhood as a living waterway—community-maintained, community-loved. The fish returned before the developers did.", created_at: new Date(Date.now() - 86400000 * 15).toISOString() },
  { id: "6", content: "Safety doesn't come from cameras. It comes from knowing your neighbors' names, knowing which windows stay lit late, knowing who to call when the power flickers.", created_at: new Date(Date.now() - 86400000 * 18).toISOString() },
  { id: "7", content: "Our seeds are encrypted. Our harvests are open source.", created_at: new Date(Date.now() - 86400000 * 20).toISOString() },
];

export function GalleryPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from("submissions")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching submissions:", error);
          setSubmissions(DEFAULT_SUBMISSIONS);
          return;
        }

        // If no submissions from database, use defaults
        setSubmissions(data && data.length > 0 ? data : DEFAULT_SUBMISSIONS);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setSubmissions(DEFAULT_SUBMISSIONS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-background py-20 px-6 sm:px-12 lg:px-20 pb-36">
      <div className="max-w-5xl mx-auto">

        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="font-sans text-xs tracking-widest uppercase mb-3" style={{ color: "var(--clay-signal, #5a8a6a)", opacity: 0.7 }}>
            {submissions.length} visions
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl italic font-light text-foreground" style={{color: "var(--kiln)", opacity: 0.85 }}>
            Our Future Streets
          </h1>
        </motion.header>

        {submissions.length > 0 ? (
          <div className="columns-1 sm:columns-2 gap-x-16">
            {submissions.map((submission, index) => {
              const v = VARIATIONS[index % VARIATIONS.length];
              return (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  className="break-inside-avoid mb-12"
                >
                  <p
                    className="font-serif text-foreground leading-relaxed"
                    style={{
                      fontSize: v.fontSize,
                      opacity: v.opacity,
                      fontStyle: v.fontStyle,
                      lineHeight: 1.8,
                    }}
                  >
                    {submission.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="font-serif italic text-foreground text-xl" style={{ opacity: 0.4 }}>
            The soil is ready, but no seeds have been planted yet.
          </p>
        )}

      </div>
    </div>
  );
}
