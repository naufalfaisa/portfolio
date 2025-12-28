import Image from "next/image";
import DiscordPresence from "./components/DiscordPresence";
import { TypingText } from "./components/TypingText";

export default function Home() {
  return (
    <section className="font-sans mt-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-10">

        <div className="flex-1 flex flex-col">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight">
            <TypingText text="Hi there!" />
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-4">
            I&apos;m <strong>Naufal Faisa</strong>, a Bachelor of Science in Informatics Engineering with a passion for programming.
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">
            I&apos;m currently learning to build CLI tools, web applications, and backend systems, while also improving my skills in JavaScript, Python, Go, and React.
          </p>
        </div>

        <div className="flex flex-col items-center shrink-0 w-full sm:w-auto gap-6">
          <Image
            src="/avatar.jpg"
            alt="Avatar"
            width={200}
            height={200}
            priority
            className="object-cover rounded-full aspect-square border-4 border-zinc-200 dark:border-zinc-800"
          />
          <DiscordPresence userId="1235664011987517565" />
        </div>

      </div>
    </section>

  );
}