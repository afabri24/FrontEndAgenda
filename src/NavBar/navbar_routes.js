import { GoHomeFill } from "react-icons/go";
import { MdGroups } from "react-icons/md";
import { FaClipboardQuestion } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

export const routes = [
  {
    title: "Home",
    href: "/",
    Icon: GoHomeFill,
    isLink: true,
  },
  {
    title: "Conocenos",
    href: "/#conocenos",
    Icon: MdGroups,
    isLink: false,
  },
  {
    title: "Preguntas frecuentes",
    href: "/faq",
    Icon: FaClipboardQuestion,
    isLink: true,
  },
  {
    title: "Registro",
    href: "/signup",
    Icon: FaSignInAlt,
    isLink: true,
  },
  {
    title: "Iniciar Sesion",
    href: "/login",
    Icon: FaUser,
    isLink: true,
  }
];
