//just a sample footer

import React from "react";

const socialMedia = [
    {name: "facebook", url: "https://google.com", color: "blue-600"}
  , {name: "messenger", url: "https://google.com", color: " blue-400"}
  , {name: "twitter", url: "https://google.com", color: "blue-400"}
  , {name: "google", url: "https://google.com", color: "red-400"}
  , {name: "youtube", url: "https://google.com", color: "red-600"}
  , {name: "whatsapp", url: "https://google.com", color: "green-600"}
  , {name: "meta", url: "https://google.com", color: "blue-600"}
  , {name: "discord", url: "https://google.com", color: "withe-600"}
  , {name: "dribbble", url: "https://google.com", color: "blue-600"}
  , {name: "reddit", url: "https://google.com", color: "blue-600"}
  , {name: "github", url: "https://google.com", color: "blue-600"}
  , {name: "skype", url: "https://google.com", color: "blue-600"}
  , {name: "slack", url: "https://google.com", color: "blue-600"}
  , {name: "snapchat", url: "https://google.com", color: "blue-600"}
  , {name: "spotify", url: "https://google.com", color: "blue-600"}
  , {name: "twitch", url: "https://google.com", color: "blue-800"}
  , {name: "vimeo", url: "https://google.com", color: "blue-600"}   
];

const Footer = () => {
  return (
    <>
      <footer className="footer-1 bg-gray-100 py-8 sm:py-12 text-center">
        <div className="container mx-auto px-4">
          <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
            <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/4">
              <h5 className="text-xl font-bold mb-6">Features</h5>
              <ul className="list-none footer-links">
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Features One</a>
                </li>
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Features Two</a>
                </li>
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Features Tree</a>
                </li>
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Features Four</a>
                </li>
              </ul>
            </div>
            <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/4 mt-8 sm:mt-0">
              <h5 className="text-xl font-bold mb-6">Resources</h5>
              <ul className="list-none footer-links">
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Resource</a>
                </li>
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Resource name</a>
                </li>
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Another resource</a>
                </li>
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Final resource</a>
                </li>
              </ul>
            </div>
            <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/4 mt-8 md:mt-0">
              <h5 className="text-xl font-bold mb-6">About</h5>
              <ul className="list-none footer-links">
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Team</a>
                </li>
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Locations</a>
                </li>
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Privacy</a>
                </li>
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Terms</a>
                </li>
              </ul>
            </div>
            <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/4 mt-8 md:mt-0">
              <h5 className="text-xl font-bold mb-6">Help</h5>
              <ul className="list-none footer-links">
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Support</a>
                </li>
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Help Center</a>
                </li>
                <li className="mb-2">
                  <a href="https://google.com" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-100 pt-2">
            <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col max-w-screen-lg items-center">
                <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left">
                  Stay connected
                </h5>
                <div className="mt-2 flex-row">
                  {socialMedia.map((social) => (
                    <a key={social.name} href={social.href} className="w-8 h-8 m-1 inline-box border border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-blue-400 hover:border-blue-400">
                      <i className={`p-2 mb-2 bi bi-${social.name}`}></i>
                    </a>
                  ))}
                </div>
                <div className="my-5 mt-10">© Copyright 2022. All Rights Reserved.</div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;