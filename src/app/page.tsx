'use client';

import {useEffect, useState} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";

export default function Home() {
    const [scannerError, setScannerError] = useState(null);
    const [scannerResult, setScannerResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 250,
                height: 120,
            },
            fps: 5,
        }, true);

        scanner.render(handleScannerSuccess, handleScannerFailure);

        function handleScannerSuccess(result: any) {
            scanner.clear();
            setScannerResult(result);
        }

        function handleScannerFailure(error: any) {
            setScannerError(error);
        }
    }, [scannerResult, scannerError]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {scannerResult ? (
                <div className='flex flex-col'>
                    <div id="reader"></div>
                    <p className='font-semibold'>Success!</p>
                    <a href={scannerResult} target='_blank' className='underline text-blue-500'>{scannerResult}</a>
                </div>
            ) : (
                <div id="reader"></div>
            )}
        </div>
    );
}
