"use client";

import { useState } from "react";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';


export default function SortDropdown() {
    const [selected, setSelected] = useState("New");
    const [isOpen, setIsOpen] = useState(false);

    const options = ["Sort By", "Hot", "New", "Top"];

    return (
        <div className="relative">
            {/* Button chính */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="py-2 px-4 gap-2 font-thin bg-white text-gray-600 text-sm rounded-full flex items-center hover:bg-gray-100 transition"
            >
                <span className="font-thin text-sm">{selected}</span>
                <span className="font-thin text-md">
                    {isOpen ? (
                        <FaChevronUp className="w-3 h-3" />
                    ) : (
                        <FaChevronDown className="w-3 h-3" />
                    )}
                </span>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                setSelected(option);
                                setIsOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-sm"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
