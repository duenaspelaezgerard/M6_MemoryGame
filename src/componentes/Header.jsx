export default function Header() {
    return (
        <header className="bg-zinc-50 py-4">
            <div className="container mx-auto items-center">
                <nav className="flex justify-center">
                    <ul className="flex space-x-4 ">
                        <li>
                            <a href="#" className="border p-2">Home</a>
                        </li>
                        <li>
                            <a href="#" className="border p-2">Pokemons Memory</a>
                        </li>
                        <li>
                            <a href="#" className="border p-2">Marvel Memory</a>
                        </li>
                        <li>
                            <a href="#" className="border p-2">Acerca de</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
      )
}