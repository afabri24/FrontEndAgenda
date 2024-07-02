import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { routes } from "./navbar_routes";
import { Link } from "react-router-dom";

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className="lg:hidden z-10">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-3 bg-stone-50 border-b border-b-white/20 rounded-lg"
          >
            <ul className="grid gap-2">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    key={route.title}
                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-slate-300 via-slate-300 to-slate-100"
                  >
                    {route.isLink ? 
                        <Link
                            onClick={() => setOpen((prev) => !prev)}
                            className={
                                "flex items-center justify-between w-full p-5 rounded-xl bg-slate-100"
                            }
                            to={route.href}
                            >
                            <span className="flex gap-1 text-lg text-black">{route.title}</span>
                            <Icon className="text-xl" />
                        </Link> :
                        <a
                            onClick={() => setOpen((prev) => !prev)}
                            className={
                                "flex items-center justify-between w-full p-5 rounded-xl bg-slate-100"
                            }
                            href={route.href}
                            >
                            <span className="flex gap-1 text-lg text-black">{route.title}</span>
                            <Icon className="text-xl" />
                        </a>
                    }
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};