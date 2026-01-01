import Image from 'next/image';

export default function Achievements() {
    const ACHIEVEMENTS = [
        {
            title: 'Responsive Web Design',
            issuer: 'freeCodeCamp',
            description: 'Built responsive websites using HTML, CSS, Flexbox, and Grid.',
            image: '/images/achivements/responsive-web-design.png',
            link: 'https://www.freecodecamp.org/certification/naufalfaisa/responsive-web-design-v9',
        },
        {
            title: 'Belajar Dasar AI',
            issuer: 'Dicoding Indonesia',
            description: 'Basic concepts of AI, Machine Learning, and Deep Learning.',
            image: '/images/achivements/belajar-dasar-ai.webp',
            link: 'https://www.dicoding.com/certificates/98XWO78ELZM3',
        },
    ];

    return (
        <section className="font-sans flex flex-col gap-10">
            <div className="flex flex-col max-w-prose">
                <h1 className="mb-4 text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
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
                        className="w-full overflow-hidden rounded-xl bg-zinc-50/80 dark:bg-[#121212]/80 border border-zinc-300 dark:border-zinc-700 transition-all hover:border-zinc-400 dark:hover:border-zinc-600 shadow"
                    >
                        <div className="flex flex-col">
                            <div className="overflow-hidden">
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    width={600}
                                    height={400}
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                    className="transition-transform duration-300 ease-out hover:scale-105"
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

                                <span className="bg-zinc-200/60 dark:bg-zinc-800 inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold w-fit">
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
