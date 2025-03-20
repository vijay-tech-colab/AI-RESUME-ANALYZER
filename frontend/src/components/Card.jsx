export default function Card({ children, className }) {
    return (
      <div className={`shadow-lg  bg-[#1F2937] rounded-2xl p-4 ${className}`}>
        {children}
      </div>
    );
  }
