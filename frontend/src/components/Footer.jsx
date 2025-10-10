import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Footer() {
  const location = useLocation();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const links = ["About Us", "Contact", "Privacy Policy", "Terms of Service"];
  const socialIcons = [
    {
      path: (
        <path
          clipRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12
          c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797
          c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26
          c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988
          C18.343 21.128 22 16.991 22 12z"
          fillRule="evenodd"
        />
      ),
      href: "#",
    },
    {
      path: (
        <path
          d="M8.29 20.251c7.547 0 11.675-6.253 
          11.675-11.675 0-.178 0-.355-.012-.53A8.348 
          8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 
          4.118 4.118 0 001.804-2.27 8.224 8.224 0 
          01-2.605.996 4.107 4.107 0 00-6.993 3.743 
          11.65 11.65 0 01-8.457-4.287 4.106 4.106 
          0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052
          a4.105 4.105 0 003.292 4.022 4.095 4.095 
          0 01-1.853.07 4.108 4.108 0 003.834 
          2.85A8.233 8.233 0 012 18.407a11.616 
          11.616 0 006.29 1.84"
        />
      ),
      href: "#",
    },
    {
      path: (
        <path
          clipRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 
          1.064.049 1.791.218 2.427.465a4.902 4.902 
          0 011.772 1.153 4.902 4.902 0 011.153 
          1.772c.247.636.416 1.363.465 2.427.048 
          1.024.06 1.378.06 3.808s-.012 2.784-.06 
          3.808c-.049 1.064-.218 1.791-.465 
          2.427a4.902 4.902 0 01-1.153 1.772 
          4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416
          -2.427.465-1.024.048-1.378.06-3.808.06s-2.784
          -.012-3.808-.06c-1.064-.049-1.791-.218
          -2.427-.465a4.902 4.902 0 01-1.772-1.153 
          4.902 4.902 0 01-1.153-1.772c-.247-.636
          -.416-1.363-.465-2.427-.048-1.024-.06
          -1.378-.06-3.808s.012-2.784.06-3.808c.049
          -1.064.218-1.791.465-2.427a4.902 4.902 0
          011.153-1.772A4.902 4.902 0 016.345 
          2.525c.636-.247 1.363-.416 2.427-.465C9.795 
          2.013 10.148 2 12.315 2zm-1.161 
          1.043c-1.049.048-1.688.21-2.228.42a3.836 
          3.836 0 00-1.385.886 3.836 3.836 0 00-.886 
          1.385c-.21 1.049-.372 1.688-.42 
          2.228-.048 1.024-.06 1.357-.06 
          3.659s.012 2.635.06 3.659c.048 1.049.21 
          1.688.42 2.228a3.836 3.836 0 00.886 
          1.385 3.836 3.836 0 001.385.886c1.049.21 
          1.688.372 2.228.42 1.024.048 1.357.06 
          3.659.06s2.635-.012 3.659-.06c1.049-.048 
          1.688-.21 2.228-.42a3.836 3.836 0 
          001.385-.886 3.836 3.836 0 
          00.886-1.385c.21-1.049.372-1.688.42-2.228.048
          -1.024.06-1.357.06-3.659s-.012-2.635-.06
          -3.659c-.048-1.049-.21-1.688-.42-2.228a3.836
          3.836 0 00-.886-1.385 3.836 3.836 0 
          00-1.385-.886c-1.049-.21-1.688-.372-2.228
          -.42-1.024-.048-1.357-.06-3.659-.06s-2.635
          .012-3.659.06zM12 6.865a5.135 5.135 0 
          100 10.27 5.135 5.135 0 000-10.27z"
          fillRule="evenodd"
        />
      ),
      href: "#",
    },
  ];

  const commonFooter = (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-t from-white to-gray-50 border-t border-gray-200 mt-12"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6 md:mb-0">
            {links.map((link, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-600 hover:text-[var(--primary-teal)] transition-all duration-300 transform hover:-translate-y-1"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            {socialIcons.map((icon, i) => (
              <motion.a
                key={i}
                href={icon.href}
                className="text-gray-500 hover:text-[var(--primary-navy)] transition-all duration-300"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  {icon.path}
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
        <motion.div
          className="text-center text-gray-500 text-sm pt-4 border-t border-gray-200 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>© 2025 Attendence-home. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );

  switch (location.pathname) {
    case "/teacherdashboard":
    case "/studentdashboard":
    case "/markattendance":
    case "/generateqr":
      return commonFooter;
    default:
      return null;
  }
}

export default Footer;
