import { PageProps } from "$fresh/server.ts";
import LogOut from "../../islands/LogOut.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="layout">
      <header class="layout-header">
        <a href="/characters">🏠 Inicio Personajes </a>
        <a href="/students"> Estudiantes </a>
        <a href="/spells"> Hechizos </a>
        <LogOut/>
      </header>
      <Component />
    </div>
  );
}