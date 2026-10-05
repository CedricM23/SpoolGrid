export default function Idcard({ name, role, location, photoPath, AccountType, CorpName }) {
    return (
        <div>
            <div className="flex items-center">

                {/* Avatar Container */}
                <div className="shrink-0">
                    <img
                        src={photoPath || "https://placehold.co/150x150/ffcc00/000000?text=CM"}
                        alt="Profile Avatar"
                        className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-gray-700 transition-colors group-hover:border-zinc-500"
                        loading="lazy"
                    />
                </div>

                {/* Content Container */}
                <div className="flex flex-col justify-center ml-5 space-y-1 w-full">

                    {AccountType === "Individual" ? (
                        <>
                            <h1 className="text-xl font-bold text-white tracking-tight leading-tight">{name}</h1>

                            <div className="flex items-center">
                                <span className="badge badge-sm bg-gray-800 text-[#ffcc00] border-none font-semibold px-2 py-2.5">
                                    {role}
                                </span>
                            </div>

                            <h2 className="text-sm font-medium text-gray-400 mt-1">{location}</h2>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between w-full">
                                <h1 className="text-xl font-bold text-white tracking-tight leading-tight truncate mr-2">{CorpName}</h1>
                                <span className="badge badge-sm bg-gray-800 text-[#ffcc00] border-none font-semibold shrink-0">
                                    {role}
                                </span>
                            </div>

                            <h2 className="text-md font-semibold text-gray-300">{name}</h2>

                            <h2 className="text-sm font-medium text-gray-500">{location}</h2>
                        </>
                    )}

                </div>
            </div>

           


        </div>
    )
}