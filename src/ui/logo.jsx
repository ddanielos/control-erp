import Image from 'next/image';

export default function Logo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white`}>
      <Image
        src="/logo.png"
        alt="Cervecería Yucay Logo"
        width={130}
        height={130}
        className="h-12 w-12"
      />
      <p className={`text-2xl px-4`}>Sistema de gestión Cervecería Yucay</p>
    </div>
  );
}
