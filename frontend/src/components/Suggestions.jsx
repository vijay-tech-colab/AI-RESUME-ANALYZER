import { FaCheckCircle } from "react-icons/fa";


const SuggestionsList = ({suggestions}) => {
  if(!suggestions){
    return ""
  }
  return (
    <div className="p-4 mt-10 rounded-lg shadow-md bg-red-500 w-[80%]">
      <h2 className="text-xl font-semibold mb-3">Suggestions</h2>
      <ul className="list-none space-y-2">
        {suggestions?.map((suggestion, index) => (
          <li key={index} className="flex items-start space-x-2">
            <FaCheckCircle className="text-green-500 mt-1" />
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsList;