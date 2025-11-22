import React from "react";
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white">
            <img src={logo} alt="logo" className="w-14 h-14" />
          </div>
          <span className="text-2xl font-semibold">Mekelle Waste Management</span>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Address</h3>
          <ul className="space-y-1">
            <li>
              <a href="#!" className="hover:text-gray-400">Mekelle city</a>
            </li>
            <li>
              <a href="#!" className="hover:text-gray-400">mekellewaste@gmail.com</a>
            </li>
            <li>
              <a href="#!" className="hover:text-gray-400">09090900999</a>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Features</h3>
          <ul className="space-y-1">
            <li>
              <a href="#!" className="hover:text-gray-400">Share Articles</a>
            </li>
            <li>
              <a href="#!" className="hover:text-gray-400">Explore Contents</a>
            </li>
            <li>
              <a href="#!" className="hover:text-gray-400">Report Complains</a>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Social Media</h3>
          <div className="flex justify-start space-x-3">
            <a href="#!" title="Facebook" className="text-white hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-6 h-6">
                <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
              </svg>
            </a>
            <a href="#!" title="Twitter" className="text-white hover:text-gray-400">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
              </svg>
            </a>
            <a href="#!" title="Instagram" className="text-white hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6">
                <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-gray-900 py-4 text-center text-sm text-gray-400">
          © 2016 Mekelle Waste Management. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;