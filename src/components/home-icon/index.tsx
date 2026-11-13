import Image from "next/image";

interface HomeIconProps {
  title: string;
  illustrationSrc: string;
  altText?: string;
}



export function HomeIcon({title, illustrationSrc, altText}: HomeIconProps) {
  return (
    <div className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <Image
        src={illustrationSrc}
        alt={altText || title}
        width={112}
        height={112}
        className="group-hover:scale-105 transition-transform duration-300"
        aria-hidden="true"
      />
      <h3 className="text-base font-normal group-hover:text-primary transition-colors">{title}</h3>
    </div>
  )
}
