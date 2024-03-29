import React from 'react';
import { Logo } from "../assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-between border-t border-gray-300">
        <div className="flex items-center justify-center gap-3 py-3">
            <img src={Logo} className="w-8 h-auto object-contain" alt="Logo"/>
            <p>Vrésumé</p>
        </div>
        <div className="flex items-center justify-center gap-6">
            <Link to={"https://github.com/vr000nan/resume-builder"} className="text-blue-700 text-sm">Home</Link>
            <Link to={"https://nanimal.dev"} className="text-blue-700 text-sm">Contact</Link>
            <Link to={"https://www.linkedin.com/in/nan-wroblewski-09547a224/"} className="text-blue-700 text-sm whitespace-nowrap">Privacy Policy</Link>
        </div>
    </div>
  )
}

export default Footer;