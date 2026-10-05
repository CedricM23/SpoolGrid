import { useState } from "react";
import { useNavigate } from "react-router";


const FILM_STOCKS = [
    { name: "Vision3 50D", type: "Daylight", stockType: "Color Negative", color: "border-yellow-500", formats: ["Super 8", "Super 16", "35mm"] },
    { name: "Vision3 200T", type: "Tungsten", stockType: "Color Negative", color: "border-blue-500", formats: ["Super 8", "Super 16", "35mm"] },
    { name: "Vision3 500T", type: "Tungsten", stockType: "Color Negative", color: "border-red-500", formats: ["Super 8", "Super 16", "35mm", "Other"] },
    { name: "Ektachrome 100D", type: "Daylight", stockType: "Color Reversal", color: "border-orange-400", formats: ["Super 8", "Super 16"] },
    { name: "Tri-X 7266", type: "Daylight/Tungsten", stockType: "B&W Reversal", color: "border-gray-400", formats: ["Super 8", "Super 16", "other"] },
    { name: "Double-X 5222", type: "Daylight/Tungsten", stockType: "B&W Negative", color: "border-neutral-500", formats: ["Super 16", "35mm", "other"] }
];

const CAMERAS = [
    "Sankyo Seiki ES-44XL",
    "Bell & Howell 1201",
    "Rhonda CAM",
    "Other"
];

const FORMATS = ["Regular 8", "Super 8", "16mm", "Super 16", "35mm", "65/70mm"];

export default function LoadSpoolView() {
    const navigate = useNavigate();

    const [spoolName, setSpoolName] = useState("");
    const [selectedFormat, setSelectedFormat] = useState(FORMATS[0]); // Defaults to Super 8
    const [selectedStock, setSelectedStock] = useState(FILM_STOCKS[0]);
    const [fps, setFps] = useState("18");
    const [selectedCamera, setSelectedCamera] = useState(CAMERAS[0]);

    // Derive which stocks should be visible based on the selected format
    const filteredStocks = FILM_STOCKS.filter(stock => stock.formats.includes(selectedFormat));

    // Handle changing the format and ensuring a valid stock remains selected
    const handleFormatChange = (newFormat) => {
        setSelectedFormat(newFormat);

        // Find the stocks available for the NEW format
        const newlyAvailableStocks = FILM_STOCKS.filter(stock => stock.formats.includes(newFormat));

        // If the current stock isn't available in this new format, reset to the first one that is
        const isCurrentStockValid = newlyAvailableStocks.some(stock => stock.name === selectedStock.name);
        if (!isCurrentStockValid && newlyAvailableStocks.length > 0) {
            setSelectedStock(newlyAvailableStocks[0]);
        }
    };

    const handleSave = () => {
        const newSpool = {
            id: Date.now(),
            name: spoolName || "Untitled Spool",
            format: selectedFormat,
            stock: selectedStock.name,
            type: selectedStock.type,
            stockType: selectedStock.stockType,
            fps: parseInt(fps),
            camera: selectedCamera,
            status: "standby"
        };

        console.log("Saving new spool:", newSpool);
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-black text-white fixed inset-0 z-[100] flex flex-col">

            <header className="bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-gray-800 pt-[max(env(safe-area-inset-top),1rem)] pb-3 px-4 flex items-center justify-between shadow-md max-md:mt-5">
                <button onClick={() => navigate(-1)} className="text-neutral-400 hover:text-white text-sm font-semibold">
                    Cancel
                </button>
                <h2 className="text-lg font-black tracking-widest uppercase">
                    Load <span className="text-[#ffcc00]">Spool</span>
                </h2>
                <button onClick={handleSave} className="text-[#ffcc00] hover:text-yellow-400 text-sm font-bold">
                    Save
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 pb-32">

                <div className="form-control w-full mb-6">
                    <label className="label">
                        <span className="label-text text-neutral-400 font-bold tracking-widest uppercase text-xs">Project / Spool Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Shaky Knees Fest"
                        value={spoolName}
                        onChange={(e) => setSpoolName(e.target.value)}
                        className="input input-bordered w-full bg-neutral-900 border-gray-700 text-white focus:border-[#ffcc00] focus:ring-1 focus:ring-[#ffcc00]"
                    />
                </div>

                <div className="flex gap-4 mb-6">
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text text-neutral-400 font-bold tracking-widest uppercase text-xs">Camera Body</span>
                        </label>
                        <select
                            className="select select-bordered w-full bg-neutral-900 border-gray-700 focus:border-[#ffcc00]"
                            value={selectedCamera}
                            onChange={(e) => setSelectedCamera(e.target.value)}
                        >
                            {CAMERAS.map(cam => (
                                <option key={cam} value={cam}>{cam}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control w-32">
                        <label className="label">
                            <span className="label-text text-neutral-400 font-bold tracking-widest uppercase text-xs">Speed</span>
                        </label>
                        <div className="join w-full flex">
                            <input
                                type="radio"
                                name="fps_options"
                                aria-label="18"
                                className="btn btn-sm join-item flex-1 bg-neutral-900 border-gray-700 checked:bg-[#ffcc00] checked:text-black checked:border-[#ffcc00]"
                                checked={fps === "18"}
                                onChange={() => setFps("18")}
                            />
                            <input
                                type="radio"
                                name="fps_options"
                                aria-label="24"
                                className="btn btn-sm join-item flex-1 bg-neutral-900 border-gray-700 checked:bg-[#ffcc00] checked:text-black checked:border-[#ffcc00]"
                                checked={fps === "24"}
                                onChange={() => setFps("24")}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-control w-full mb-6">
                    <label className="label">
                        <span className="label-text text-neutral-400 font-bold tracking-widest uppercase text-xs">Film Format</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2 w-full">
                        {FORMATS.map((fmt) => (
                            <input
                                key={fmt}
                                type="radio"
                                name="format_options"
                                aria-label={fmt}
                                // Removed join-item, added rounded-lg for individual pill shapes
                                className="btn btn-sm rounded-lg bg-neutral-900 border-gray-700 checked:bg-[#ffcc00] checked:text-black checked:border-[#ffcc00] text-[10px] sm:text-xs px-1"
                                checked={selectedFormat === fmt}
                                onChange={() => handleFormatChange(fmt)}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-2">
                    <label className="label">
                        <span className="label-text text-neutral-400 font-bold tracking-widest uppercase text-xs">Select Film Stock</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                        {filteredStocks.map((stock) => (
                            <div
                                key={stock.name}
                                onClick={() => setSelectedStock(stock)}
                                className={`
                                    cursor-pointer rounded-xl p-4 border-2 transition-all duration-200
                                    ${selectedStock.name === stock.name
                                        ? `${stock.color} bg-white/10 shadow-lg shadow-black`
                                        : 'border-gray-800 bg-neutral-900 opacity-60 hover:opacity-100'}
                                `}
                            >
                                <div className="font-black text-sm">{stock.name}</div>
                                <div className="text-[10px] text-neutral-400 mt-1 uppercase tracking-wider">{stock.type}</div>
                                <div className="text-[10px] text-neutral-500 uppercase">{stock.stockType}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}