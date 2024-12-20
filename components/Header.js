import Search from "@/components/Search";
import { AppContext } from "@/components/UseContext";
import Menu from "@/config/menus.json";
import siteConfig from "@/config/site.config.json";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import BootstrapIcon from "./BootstrapIcon";

const Header = () => {
  const { logo, logo_light, logoText, socialLinks } = siteConfig;

  const { toggleSearch } = useContext(AppContext);
  const [searchOpen, setSearchOpen] = toggleSearch;
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // search close using Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setIsMenuOpen(false);
      }
    });

    // add class to body
    if ((isMenuOpen || searchOpen) === true) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }

    // sticky header
    let nav = document.querySelector("header");
    var lastKnownScrollY = 0;
    var currentScrollY = 0;
    const classes = {
      pinned: "header-nav-pinned",
      unpinned: "header-nav-unpinned",
    };
    let navbarPinUnpin = () => {
      currentScrollY = window.pageYOffset;
      if (currentScrollY < lastKnownScrollY) {
        pin();
      } else if (currentScrollY > lastKnownScrollY) {
        if (window.scrollY >= 300) {
          unpin();
        }
      }
      lastKnownScrollY = currentScrollY;
    };
    let pin = () => {
      if (nav.classList.contains(classes.unpinned)) {
        nav.classList.remove(classes.unpinned);
        nav.classList.add(classes.pinned);
      }
    };
    let unpin = () => {
      if (
        nav.classList.contains(classes.pinned) ||
        !nav.classList.contains(classes.unpinned)
      ) {
        nav.classList.remove(classes.pinned);
        nav.classList.add(classes.unpinned);
      }
    };
    // navbar interactions
    window.onscroll = () => {
      navbarPinUnpin();
    };
  }, [setSearchOpen, setIsMenuOpen, isMenuOpen, searchOpen]);

  return (
    <>
      <header className={`header-nav ${isMenuOpen ? "nav-open" : ""}`}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-lg navbar-light p-0">
                <button
                  className="navbar-toggler d-inline-flex d-lg-none"
                  type="button"
                  aria-label="Toggle navigation"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="4" y1="6" x2="20" y2="6"></line>
                    <line x1="4" y1="12" x2="14" y2="12"></line>
                    <line x1="4" y1="18" x2="18" y2="18"></line>
                  </svg>
                </button>

                <Link href="/" className="navbar-brand d-flex mb-0 me-0">
                  <Image
                    src={
                      mounted && (theme === "dark" || resolvedTheme === "dark")
                        ? logo_light
                        : logo
                    }
                    alt={logoText}
                    className="img-fluid"
                    width="110"
                    height="43"
                    priority
                  />
                </Link>

                <div className="d-block d-lg-none">
                  <button
                    className="search-toggle"
                    aria-label="Search Toggle"
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <svg
                      width="28"
                      height="28"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5 15.5L19 19"
                        stroke="currentColor"
                        strokeLinecap="square"
                        strokeLinejoin="square"
                      />
                      <path
                        d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                        stroke="currentColor"
                        strokeLinecap="square"
                        strokeLinejoin="square"
                      />
                    </svg>
                  </button>
                  <div
                    className="color-scheme-toggler ms-2 d-inline-block"
                    onClick={() =>
                      setTheme(
                        theme === "dark" || resolvedTheme === "dark"
                          ? "light"
                          : "dark"
                      )
                    }
                  >
                    <svg
                      className="sun-icon"
                      height="24px"
                      width="24px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M256 105.5a152.4 152.4 0 0 0-152.2 152.2c0 83.9 68.3 152.2 152.2 152.2 83.9 0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0 263.5c-61.4 0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4 0 111.4 50 111.4 111.4 0 61.4-50 111.4-111.4 111.4zM256 74.8c11.3 0 20.4-9.1 20.4-20.4v-23a20.4 20.4 0 1 0-40.8 0v23c0 11.3 9.1 20.4 20.4 20.4zM256 437.2a20.4 20.4 0 0 0-20.4 20.4v22.9a20.4 20.4 0 1 0 40.8 0v-22.9c0-11.2-9.1-20.4-20.4-20.4zM480.6 235.6h-23a20.4 20.4 0 1 0 0 40.8h23a20.4 20.4 0 1 0 0-40.8zM54.4 235.6h-23a20.4 20.4 0 1 0 0 40.8h22.9c11.3 0 20.4-9.1 20.4-20.4a20.3 20.3 0 0 0-20.3-20.4zM400.4 82.8 384.1 99a20.4 20.4 0 1 0 28.9 28.9l16.2-16.2a20.4 20.4 0 0 0-28.8-28.9zM99 384.1l-16.2 16.2a20.4 20.4 0 1 0 28.9 28.9l16.2-16.2A20.4 20.4 0 1 0 99 384.1zM413 384.1a20.4 20.4 0 1 0-28.9 28.9l16.2 16.2a20.4 20.4 0 1 0 28.9-28.9L413 384.1zM99 127.9A20.4 20.4 0 1 0 127.9 99l-16.2-16.2a20.4 20.4 0 1 0-28.9 28.9L99 127.9z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      className="moon-icon"
                      height="24px"
                      width="24px"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0"
                      y="0"
                      viewBox="0 0 172.2 172.2"
                      enableBackground="new 0 0 172.151 172.151"
                    >
                      <path d="M95 27.9a3.6 3.6 0 0 0-4.8 4.4 62.8 62.8 0 0 1-83.9 78.3 3.6 3.6 0 0 0-4.8 4.5 69.4 69.4 0 0 0 66 47c17.8-.1 34.6-6.7 47.7-18.9a69.4 69.4 0 0 0 22.1-48.6A69.4 69.4 0 0 0 95 27.9zm35.2 66.4a62.3 62.3 0 0 1-64.9 60.5 62.3 62.3 0 0 1-54-34.8 70 70 0 0 0 88-82 62.5 62.5 0 0 1 31 56.3zM47.4 31.4a3.6 3.6 0 0 0 5 0l5.1-5.1 5.2 5a3.6 3.6 0 0 0 5 0 3.6 3.6 0 0 0 0-5l-5.1-5 5-5a3.6 3.6 0 1 0-5-5l-5 4.9-5-5a3.6 3.6 0 1 0-5 5l5 5-5.2 5.1a3.6 3.6 0 0 0 0 5zM171.1 65.6l-5.1-5.1 5-5a3.6 3.6 0 1 0-5-5l-5 5-5-5a3.6 3.6 0 1 0-5 5l5 5-5.2 5a3.6 3.6 0 1 0 5 5.1l5.2-5.1 5 5.1a3.6 3.6 0 0 0 5.1 0 3.6 3.6 0 0 0 0-5z" />
                      <path d="m6 95.6 5.2-5.1 5.1 5a3.6 3.6 0 0 0 5 0 3.6 3.6 0 0 0 0-5l-5-5 5-5a3.6 3.6 0 1 0-5.1-5.1l-5 5-5-5a3.6 3.6 0 1 0-5 5l5 5L1 90.5a3.6 3.6 0 1 0 5 5z" />
                    </svg>
                  </div>
                </div>

                <div className="collapse navbar-collapse" id="navHeader">
                  <div
                    className={`w-100 d-block d-lg-none mb-4 ms-1 sticky-top bg-white animate`}
                  >
                    <button
                      className="navbar-toggler opacity-50"
                      type="button"
                      aria-label="Toggle navigation"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="menu-close"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  <ul className={`navbar-nav ms-auto animate`}>
                    {Menu.mainMenu.map((n, i) =>
                      n.submenu ? (
                        <li
                          key={i}
                          className={`nav-item dropdown
                          ${n.submenu
                            .map((n) =>
                              router.pathname == `${n.link}` ? `active` : ""
                            )
                            .join("")}
                        `}
                        >
                          <a
                            className="nav-link dropdown-toggle"
                            href={n.link}
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {n.name}
                          </a>
                          <ul className="dropdown-menu">
                            {n.submenu.map((n, i) => (
                              <li key={i}>
                                <Link
                                  href={n.link}
                                  className={`dropdown-item ${
                                    router.pathname == `${n.link}`
                                      ? `active`
                                      : ""
                                  }`}
                                >
                                  {n.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ) : (
                        <li
                          key={i}
                          className={`nav-item ${
                            router.pathname == `${n.link}` ? `active` : ""
                          }`}
                        >
                          <Link href={n.link} className="nav-link">
                            {n.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>

                  <ul
                    className={`list-unstyled social-links d-flex flex-wrap d-lg-none align-items-center mt-auto w-100 animate`}
                  >
                    <li
                      className="fw-medium flex-grow-1 flex-shrink-1 mb-1"
                      style={{ flexBasis: "100%", marginLeft: "12px" }}
                    >
                      Social links:
                    </li>
                    {socialLinks.map((data, key) => (
                      <li key={key}>
                        <a
                          className="is-hoverable"
                          href={data.link}
                          title={data.name}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <BootstrapIcon icon={data.icon} size={16} />
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="navbar-right d-none d-lg-block">
                    <button
                      className="search-toggle ms-2"
                      aria-label="Search Toggle"
                      onClick={() => setSearchOpen(!searchOpen)}
                    >
                      <svg
                        width="30"
                        height="30"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.5 15.5L19 19"
                          stroke="currentColor"
                          strokeLinecap="square"
                          strokeLinejoin="square"
                        />
                        <path
                          d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                          stroke="currentColor"
                          strokeLinecap="square"
                          strokeLinejoin="square"
                        />
                      </svg>
                    </button>
                    <div
                      className="color-scheme-toggler ms-3 d-inline-block"
                      onClick={() =>
                        setTheme(
                          theme === "dark" || resolvedTheme === "dark"
                            ? "light"
                            : "dark"
                        )
                      }
                    >
                      <svg
                        className="sun-icon"
                        height="24px"
                        width="24px"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M256 105.5a152.4 152.4 0 0 0-152.2 152.2c0 83.9 68.3 152.2 152.2 152.2 83.9 0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0 263.5c-61.4 0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4 0 111.4 50 111.4 111.4 0 61.4-50 111.4-111.4 111.4zM256 74.8c11.3 0 20.4-9.1 20.4-20.4v-23a20.4 20.4 0 1 0-40.8 0v23c0 11.3 9.1 20.4 20.4 20.4zM256 437.2a20.4 20.4 0 0 0-20.4 20.4v22.9a20.4 20.4 0 1 0 40.8 0v-22.9c0-11.2-9.1-20.4-20.4-20.4zM480.6 235.6h-23a20.4 20.4 0 1 0 0 40.8h23a20.4 20.4 0 1 0 0-40.8zM54.4 235.6h-23a20.4 20.4 0 1 0 0 40.8h22.9c11.3 0 20.4-9.1 20.4-20.4a20.3 20.3 0 0 0-20.3-20.4zM400.4 82.8 384.1 99a20.4 20.4 0 1 0 28.9 28.9l16.2-16.2a20.4 20.4 0 0 0-28.8-28.9zM99 384.1l-16.2 16.2a20.4 20.4 0 1 0 28.9 28.9l16.2-16.2A20.4 20.4 0 1 0 99 384.1zM413 384.1a20.4 20.4 0 1 0-28.9 28.9l16.2 16.2a20.4 20.4 0 1 0 28.9-28.9L413 384.1zM99 127.9A20.4 20.4 0 1 0 127.9 99l-16.2-16.2a20.4 20.4 0 1 0-28.9 28.9L99 127.9z"
                          fill="currentColor"
                        />
                      </svg>
                      <svg
                        className="moon-icon"
                        height="24px"
                        width="24px"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        y="0"
                        viewBox="0 0 172.2 172.2"
                        enableBackground="new 0 0 172.151 172.151"
                      >
                        <path d="M95 27.9a3.6 3.6 0 0 0-4.8 4.4 62.8 62.8 0 0 1-83.9 78.3 3.6 3.6 0 0 0-4.8 4.5 69.4 69.4 0 0 0 66 47c17.8-.1 34.6-6.7 47.7-18.9a69.4 69.4 0 0 0 22.1-48.6A69.4 69.4 0 0 0 95 27.9zm35.2 66.4a62.3 62.3 0 0 1-64.9 60.5 62.3 62.3 0 0 1-54-34.8 70 70 0 0 0 88-82 62.5 62.5 0 0 1 31 56.3zM47.4 31.4a3.6 3.6 0 0 0 5 0l5.1-5.1 5.2 5a3.6 3.6 0 0 0 5 0 3.6 3.6 0 0 0 0-5l-5.1-5 5-5a3.6 3.6 0 1 0-5-5l-5 4.9-5-5a3.6 3.6 0 1 0-5 5l5 5-5.2 5.1a3.6 3.6 0 0 0 0 5zM171.1 65.6l-5.1-5.1 5-5a3.6 3.6 0 1 0-5-5l-5 5-5-5a3.6 3.6 0 1 0-5 5l5 5-5.2 5a3.6 3.6 0 1 0 5 5.1l5.2-5.1 5 5.1a3.6 3.6 0 0 0 5.1 0 3.6 3.6 0 0 0 0-5z" />
                        <path d="m6 95.6 5.2-5.1 5.1 5a3.6 3.6 0 0 0 5 0 3.6 3.6 0 0 0 0-5l-5-5 5-5a3.6 3.6 0 1 0-5.1-5.1l-5 5-5-5a3.6 3.6 0 1 0-5 5l5 5L1 90.5a3.6 3.6 0 1 0 5 5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        <div
          className={`menu-overlay ${isMenuOpen ? `is-visible` : ``}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></div>

        <Search />
      </header>
    </>
  );
};
export default Header;
