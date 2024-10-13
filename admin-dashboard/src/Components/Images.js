const Image = ({ Images }) => {
    return (

        <div className="flex items-start gap-2.5">
            <div className="flex flex-col gap-1">
                <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 shadow-lg bg-white  rounded-e-xl rounded-es-xl ">
                    <div className="grid gap-4 grid-cols-2 my-2.5">
                        {Images.slice(0, 3).map((e, i) => (
                            <div key={i} className="group relative">
                                <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                    <button data-tooltip-target="download-image-1" className="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                        </svg>
                                    </button>
                                    <div id="download-image-1" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Download image
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>
                                <img src={e} className="rounded-lg" alt='missing doc' />
                            </div>
                        ))}

                        {Images.length > 3 && (
                            <div className="group relative flex items-center justify-center">
                                <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                    <button data-tooltip-target="download-more-images" className="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                        </svg>
                                    </button>
                                    <div id="download-more-images" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                        Download more images
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>
                                <p className="rounded-lg font-bold text-lg mx-auto text-center">{`+${Images.length - 3} more`}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >

    )
}
export default Image