import { FaGithub, FaLinkedin } from "react-icons/fa";


function Footer() {
  return (
    <footer className="bg-background-secondary-light dark:bg-background-secondary-dark transition-all duration-500 rounded-t-xl mt-5">
      <div className="mx-auto max-w-7xl px-6 py-10 rounded-2xl">
        <img src="/Logo.svg" alt="logo"></img>
        <div className="flex mt-2 flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-300 pt-6">
            
          <h2 className="text-text-light dark:text-text-dark text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Diseñado con ❤️ por Liceth Olmos
          </h2>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/liceth1006"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light dark:text-text-dark hover:text-text-secondary-light dark:hover:text-text-secondary-dark transition-colors text-xl sm:text-2xl md:text-3xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/liceth-olmos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light dark:text-text-dark hover:text-text-secondary-light dark:hover:text-text-secondary-dark transition-colors text-xl sm:text-2xl md:text-3xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
