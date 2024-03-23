export default function Decorations() {
  return (
    <>
      <svg
        className="absolute -left-24 -top-20 lg:top-40 -z-20"
        height="200"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle r="100" cx="100" cy="100" fill="#DCEEF2" />
      </svg>
      <svg
        className="absolute -left-36 top-60 -z-10 hidden lg:block"
        height="200"
        width="200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle r="100" cx="100" cy="100" fill="#EFF9FB" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 -z-10 lg:hidden"
        height="100"
        width="100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Quarter Circle */}
        <path d="M100,100 L100,0 A100,100 0 0,0 0,100 Z" fill="#bce7fa" />
      </svg>
    </>
  );
}
