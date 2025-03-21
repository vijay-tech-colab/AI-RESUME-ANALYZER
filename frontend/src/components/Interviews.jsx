import { FaCheckCircle } from "react-icons/fa";
import { FaRegHandPointRight } from "react-icons/fa";

const InterViewSTips = ({tips}) => {
    if(!tips){
        return ""
    }
  return (
    <div className="p-4 mt-10 rounded-lg shadow-md bg-red-800 w-[80%]">
          <div className="flex gap-2  justify-center">
          <FaRegHandPointRight size={20} className="mt-1"/><h2 className="text-xl font-semibold mb-3">InterView_Tips</h2>
          </div>
          <ul className="list-none space-y-2">
              <li  className="flex items-start space-x-2">
                <span>{tips}</span>
              </li>
          </ul>
        </div>
  );
};

export default InterViewSTips;