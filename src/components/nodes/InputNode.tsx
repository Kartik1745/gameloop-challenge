import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Search } from 'lucide-react';

interface InputNodeProps {
  data: {
    onSearch: (query: string) => void;
  };
}

const InputNode = memo(({ data }: InputNodeProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    data.onSearch(searchQuery);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-auto min-w-[250px] max-w-[500px] transition-all duration-200 ease-in-out">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-800">Search Jobs</h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            placeholder="Enter job title..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleSearch}
          >
            <Search size={18} />
          </button>
        </div>
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 !bg-blue-500" 
      />
    </div>
  );
});

InputNode.displayName = 'InputNode';
export default InputNode;
