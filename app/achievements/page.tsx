import Image from 'next/image';

export default function Achievements() {
    const ACHIEVEMENTS = [
        {
            title: 'Belajar Dasar AI',
            issuer: 'Dicoding Indonesia',
            description: 'Fundamental knowledge of AI, Machine Learning, and Deep Learning applications.',
            image: '/images/achivements/06f17e9c-62b2-41f8-b0c5-f0eb06d63c72-0000.webp',
            link: 'https://www.dicoding.com/certificates/98XWO78ELZM3',
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
                        className="w-full overflow-hidden rounded-xl border-2 border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
                    >
                        <div className="flex flex-col">
                            <div className="bg-zinc-100 dark:bg-zinc-900">
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-contain"
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

                                <span className="bg-zinc-200 dark:bg-zinc-800 inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold w-fit">
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
