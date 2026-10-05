import Idcard from "../../components/Idcard/Idcard";
import SecondaryHeader from "../../components/SecondaryHeader/SecondaryHeader";

export default function SettingsView() {

    const handleClearCache = async () => {
        try {
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
            }

            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (let registration of registrations) {
                    await registration.unregister();
                }
            }

            localStorage.clear();
            sessionStorage.clear();
            window.location.replace('/');

        } catch (error) {
            console.error("Failed to clear cache", error);
            window.location.replace('/');
        }
    };

    return (
        <div>
            <SecondaryHeader title="Settings" />
            <div className="mx-4">
                <div className="border bg-neutral-900 border-gray-800 my-4 rounded-2xl p-5">
                    <Idcard name="Cedric Mentor" role="Lab" location="Wesley Chappel, FL" AccountType="Company" CorpName="West Coast Labs" />
                    {/* Default Format */}
                    <div className="mx-4 my-4">
                        <label className="label pb-1 pt-0">
                            <span className="text-[10px] text-[#ffcc00] uppercase font-bold tracking-wider">Default Format</span>
                        </label>
                        <select className="select select-sm select-bordered border-gray-700 bg-[#111] text-white w-full text-base rounded-2xl focus:border-[#ffcc00]">
                            <option disabled defaultValue>Select default format...</option>
                            <option>Regular 8mm</option>
                            <option>Super 8mm</option>
                            <option>16mm</option>
                            <option>Super 16mm</option>
                            <option>35mm</option>
                            <option>65/70mm</option>
                        </select>
                    </div>

                    {/* Primary Camera */}
                    <div className="mx-4 my-4">
                        <label className="label pb-1 pt-0">
                            <span className="text-[10px] text-[#ffcc00] uppercase font-bold tracking-wider">Primary Camera</span>
                        </label>
                        <select className="select select-sm select-bordered border-gray-700 bg-[#111] text-white w-full text-base rounded-2xl focus:border-[#ffcc00]">

                            <option disabled defaultValue>Select default camera</option>

                            <optgroup label="8mm & Super 8mm">
                                <option>Sankyo Seiki ES-44XL</option>
                                <option>Bell & Howell Autoload 1201</option>
                                <option>Pro8mm Rhonda CAM</option>
                                <option>Canon 814 Auto Zoom</option>
                                <option>Canon 310XL</option>
                                <option>Braun Nizo Professional</option>
                                <option>Beaulieu 4008 ZM II</option>
                                <option>Minolta XL-401</option>
                            </optgroup>

                            <optgroup label="16mm & Super 16mm">
                                <option>Bolex H16</option>
                                <option>ARRIFLEX 16SR3</option>
                                <option>Aaton XTR Prod</option>
                                <option>Krasnogorsk-3 (K-3)</option>
                                <option>Bell & Howell Filmo 70DR</option>
                                <option>Cinema Products CP-16R</option>
                            </optgroup>

                            <optgroup label="35mm">
                                <option>ARRIFLEX 435</option>
                                <option>ARRIFLEX 235</option>
                                <option>Panavision Millennium XL2</option>
                                <option>Aaton Penelope</option>
                                <option>Moviecam Compact</option>
                            </optgroup>

                            <option>Other</option>

                        </select>


                    </div>

                    {/* Preffered Lab */}
                    <div className="mx-4 my-4">
                        <label className="label pb-1 pt-0">
                            <span className="text-[10px] text-[#ffcc00] uppercase font-bold tracking-wider">Preferred Lab</span>
                        </label>

                        <div className="space-y-3">
                            {/* Lab Name */}
                            <input
                                type="text"
                                placeholder="Lab Name (e.g. Pro8mm, CineLab)"
                                className="input input-sm input-bordered border-gray-700 bg-[#111] text-white w-full text-base rounded-2xl focus:border-[#ffcc00]"
                            />

                            {/* Lab Email */}
                            <input
                                type="email"
                                placeholder="lab@example.com"
                                className="input input-sm input-bordered border-gray-700 bg-[#111] text-white w-full text-base rounded-2xl focus:border-[#ffcc00]"
                            />
                        </div>
                    </div>
                </div>



                {/* Data Management */}

                <div className="border bg-neutral-900 border-gray-800 my-4 rounded-2xl p-5 flex flex-col gap-2">
                    {/* Export Log */}
                    <button className="btn btn-md bg-neutral-900 border border-gray-700 hover:border-[#ffcc00] hover:bg-gray-800 text-white hover:text-[#ffcc00] rounded-2xl w-full flex justify-between items-center px-4 transition-all">
                        <span className="font-medium text-base">Export Log</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </button>

                    {/* Force Sync */}
                    <button className="btn btn-md bg-neutral-900 border border-gray-700 hover:border-[#ffcc00] hover:bg-gray-800 text-white hover:text-[#ffcc00] rounded-2xl w-full flex justify-between items-center px-4 transition-all">
                        <span className="font-medium text-base">Force Sync</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                    </button>

                    {/* Clear Local Cache */}
                    <button className="btn btn-md bg-neutral-900 border border-red-900 hover:border-[#ffcc00] hover:bg-gray-800 text-white hover:text-[#ffcc00] rounded-2xl w-full flex justify-between items-center px-4 transition-all" onClick={handleClearCache}>
                        <span className="font-medium text-base text-red-500">Clear Local Cache</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                        </svg>
                    </button>

                    {/* Delete Account / Wipe Data */}
                    <button className="btn btn-md bg-neutral-900 border border-red-900 hover:border-[#ffcc00] hover:bg-gray-800 text-white hover:text-[#ffcc00] rounded-2xl w-full flex justify-between items-center px-4 transition-all">
                        <span className="font-medium text-base text-red-500">Delete Account</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>


                </div>






                {/* About & Support */}
                <div className="my-8 space-y-4">

                    {/* Actionable Button Above */}
                    <button className="btn btn-md bg-neutral-900 border border-gray-700 hover:border-[#ffcc00] hover:bg-gray-800 text-white hover:text-[#ffcc00] rounded-2xl w-full flex justify-between items-center px-4 transition-all">
                        <span className="font-medium text-base">Check for Updates</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>

                    {/* Passive Footer Text Below */}
                    <div className="pt-4 pb-8 flex flex-col items-center justify-center space-y-1">
                        <p className="text-xs text-gray-500 font-medium tracking-wide">SpoolGrid v1.0.0</p>
                        <button className="text-sm text-[#ffcc00] hover:opacity-70 transition-opacity font-semibold">
                            Buy me a cartridge of 200T
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
}