import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Achievements() {
  const ACHIEVEMENTS = [
    {
      title: "Responsive Web Design Certification",
      issuer: "FreeCodeCamp",
      description: "Completed FreeCodeCamp's Responsive Web Design course.",
      image: "https://camo.githubusercontent.com/a73449bef97f21f53aae2a9ec6241ced2567dcb52d45b009a999f7b185ed5095/68747470733a2f2f63646e2e66726565636f646563616d702e6f72672f706c6174666f726d2f756e6976657273616c2f6663635f62616e6e65725f6e65772e706e67",
      link: "https://www.freecodecamp.org",
    },
  ];

  return (
    <section className="font-sans flex flex-col gap-10">
      <div className="flex flex-col max-w-prose">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Achievements
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          List of achievements and certifications I have achieved.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {ACHIEVEMENTS.map((cert) => (
          <div
            key={cert.title}
            className="w-full overflow-hidden rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <div className="flex flex-col">
              <div className="aspect-2/1 bg-zinc-100 dark:bg-zinc-900 relative">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              <div className="w-full p-5 flex flex-col">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2 inline-flex"
                >
                  <h2 className="flex items-center text-xl font-semibold text-black dark:text-zinc-50 hover:underline">
                    {cert.title}
                  </h2>
                </a>

                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
                  {cert.description}
                </p>

                <span className="bg-zinc-200 dark:bg-zinc-800 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium w-fit">
                  {cert.issuer}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}