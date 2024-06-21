import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className='bg-slate-200'>
      <div className='container mx-auto p-4'>
        <p className='text-center font-bold' title="Youtube Channel"><h1>Headsup Corporation</h1></p>
        <div className='flex justify-center space-x-4 mt-4'>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" title="YouTube">
          <FaYoutube />
          </a>
          <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer" title="Twitter">
          <FaFacebook />
          </a>
          <a href="https://www.linkedin.com/in/khushbu-verma-9a82b41a2/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <FaLinkedin />
          </a>
          <a href="https://github.com/vermakhushbu723" target="_blank" rel="noopener noreferrer" title="GitHub">
            <FaGithub />
          </a>
        </div>
        <p className='text-center text-sm text-gray-500 mt-4'>
          © {new Date().getFullYear()}All rights reserved by khushbu Verma.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
