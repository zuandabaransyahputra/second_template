import React, { useState, useEffect } from 'react';

const languages = [
  { code: 'en', label: 'EN', link: '/' },
  { code: 'fr', label: 'FR', link: '/fr' },
  { code: 'it', label: 'IT', link: '/it' },
  { code: 'es', label: 'ES', link: '/es' },
];

const LanguageSelector = ({ path }) => {
  const routing = path === '/' ? 'en' : path.split('/')[1];
  const [currentLanguage, setCurrentLanguage] = useState(routing);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('#language-selector')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div id="language-selector" className="relative">
      <button
        className="hover:text-link dark:hover:text-white px-4 py-3 flex items-center"
        aria-expanded={dropdownOpen}
        onClick={toggleDropdown}
      >
        {/* <Icon name="tabler:language" className="w-6 h-6 md:w-5 md:h-5 md:inline-block" /> */}
        <span className="ml-2" id="current-language">
          {languages.find((lang) => lang.code === currentLanguage)?.label}
        </span>
        {/* <Icon name="tabler:chevron-down" className="w-4 h-4 ml-1" /> */}
      </button>
      {dropdownOpen && (
        <ul className="absolute bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 pt-1 rounded shadow-lg">
          {languages.map(({ code, label, link }) => (
            <li key={code} className="cursor-pointer">
              <a
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                href={link}
                onClick={() => handleLanguageChange(code)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
