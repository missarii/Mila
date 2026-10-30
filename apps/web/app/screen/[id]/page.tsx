"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ImageFromUrl } from "@/components/ui/ImageFromUrl";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Heart, Share2, ExternalLink, ArrowLeft } from "lucide-react";
import { getScreenById, getRelatedScreens } from "@/lib/data";
import { cn } from "@/components/ui/cn";

export default function ScreenDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  const screen = getScreenById(params.id as string);
  const related = screen ? getRelatedScreens(screen.id, screen.category) : [];

  useEffect(() => {
    if (!screen) {
      router.push("/browse");
    }
  }, [screen, router]);

  if (!screen) return null;

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-8 sm:py-16">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to gallery
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 aspect-[3/4] lg:aspect-auto lg:h-[700px]">
                <Tilt3DCard className="h-full" maxTilt={6}>
                  <ImageFromUrl
                    src={screen.image}
                    alt={screen.title + " — " + screen.app + " full screen design"}
                    width={1200}
                    height={1600}
                    className="h-full w-full object-cover rounded-3xl"
                    priority
                  />
                </Tilt3DCard>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <CategoryBadge category={screen.category} />
                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      {screen.title}
                    </h1>
                    <p className="mt-1 text-lg text-neutral-400">{screen.app}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.98]",
                        liked
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-neutral-600 hover:text-white",
                      )}
                    >
                      <Heart className={cn("h-4 w-4", liked ? "text-emerald-400" : "text-neutral-500")} />
                      {liked ? "Liked" : "Like"}
                    </button>
                    <button
                      className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-5 py-2.5 text-sm font-semibold text-neutral-300 transition-all hover:bg-neutral-800 hover:text-white active:scale-[0.98]"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="border border-neutral-800/50 bg-neutral-900/40 rounded-2xl p-6 backdrop-blur-sm">
                  <h2 className="mb-3 font-semibold text-white">Details</h2>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col">
                      <dt className="text-neutral-500 uppercase text-[10px] font-semibold tracking-wider">Platform</dt>
                      <dd className="text-neutral-300">{screen.platform}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-neutral-500 uppercase text-[10px] font-semibold tracking-wider">Category</dt>
                      <dd className="text-neutral-300">{screen.category}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-neutral-500 uppercase text-[10px] font-semibold tracking-wider">Likes</dt>
                      <dd className="text-neutral-300">{screen.likes.toLocaleString()}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-neutral-500 uppercase text-[10px] font-semibold tracking-wider">Added</dt>
                      <dd className="text-neutral-300">{screen.createdAt}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6">
                  <h2 className="mb-3 font-semibold text-white">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {screen.tags.map((tag) => (
                      <span key={tag} className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={screen.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-6 py-3 text-sm font-semibold text-neutral-200 backdrop-blur-sm transition-all hover:bg-neutral-800 hover:border-neutral-600 focus-visible:ring-2 focus-visible:ring-neutral-400 active:scale-[0.98]"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Open original image
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-neutral-800/50 pt-12">
            <h2 className="mb-4 text-2xl font-bold text-white">About this screen</h2>
            <p className="max-w-3xl text-neutral-400 leading-relaxed">
              {screen.description} All imagery is served from open-source internet URLs (Lorem Picsum / Unsplash source), requiring no asset downloads or API keys. This is a demonstration of Mila's UI/UX intelligence system applied to a Mobbin-style design inspiration gallery.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <h2 className="mb-6 text-xl font-bold text-white">Related {screen.category}</h2>
              <div className="space-y-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={"/screen/" + rel.id}
                    className="group flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all hover:border-neutral-600 hover:bg-neutral-800 hover:-translate-y-1"
                  >
                    <div className="flex-shrink-0 aspect-[3/4] overflow-hidden rounded-xl bg-neutral-800">
                      <ImageFromUrl
                        src={rel.image}
                        alt={rel.title}
                        width={200}
                        height={300}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors leading-snug">
                        {rel.title}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-500">{rel.app}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
