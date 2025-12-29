import Link from 'next/link';

const navItems = {
    '/': {
        name: 'Home',
    },
    '/projects': {
        name: 'Projects',
    },
    '/achievements': {
        name: 'Achievements',
    },
};

export function Navbar() {
    return (
        <aside className="font-sans -ml-2 mb-16 tracking-tight">
            <div className="lg:sticky lg:top-20">
                <nav
                    className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative text-zinc-600 dark:text-zinc-300"
                    id="nav"
                >
                    <div className="flex flex-row space-x-0 pr-10">
                        {Object.entries(navItems).map(([path, { name }]) => {
                            return (
                                <Link
                                    key={path}
                                    href={path}
                                    className="transition-all hover:text-zinc-800 dark:hover:text-zinc-100 flex align-middle relative py-1 px-2 m-1"
                                >
                                    {name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </aside>
    );
}
