import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-between items-center p-4 max-w-[1500px] mx-auto border-t mt-14 md:mt-20">
      <p className="font-poppins font-bold text-lg text-neutral-700 dark:text-neutral-200">
        Isacco-B &copy; 2024
      </p>
      <a href="https://github.com/Isacco-B" target="_blank">
        <Github size={24} className="text-neutral-700 dark:text-neutral-200" />
      </a>
    </footer>
  );
}

