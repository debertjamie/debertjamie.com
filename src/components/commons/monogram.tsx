export function Monogram({
  name,
  className,
  size,
}: {
  name: string;
  className?: string;
  size?: string;
}) {
  function getInitials(str: string = "") {
    return str
      .trim()
      .split(" ")
      .map((word) => word[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  function getBgColor(str: string = "") {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-amber-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  return (
    <div
      className={`flex items-center justify-center ${size === "default" && "w-15 h-15 text-lg"} text-mist-50 font-semibold ${getBgColor(name)} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
