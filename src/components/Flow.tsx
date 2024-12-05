import { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeTypes,
  ConnectionMode,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

import InputNode from './nodes/InputNode';
import OutputNode from './nodes/OutputNode';
import { searchJobs } from '../services/jobsApi';

const nodeTypes: NodeTypes = {
  input: InputNode,
  output: OutputNode,
};

const initialNodes: Node[] = [
  {
    id: 'input-node',
    type: 'input',
    position: { x: 250, y: 100 },
    data: { onSearch: () => {} },
  },
  {
    id: 'output-node',
    type: 'output',
    position: { x: 250, y: 300 },
    data: { jobs: [], loading: false },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'input-output',
    source: 'input-node',
    target: 'output-node',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
  },
];

export default function Flow() {
  const [nodes, setNodes] = useState(initialNodes);

  const handleSearch = useCallback(async (query: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'output-node') {
          return {
            ...node,
            data: {
              ...node.data,
              loading: true,
              jobs: [],
            },
          };
        }
        return node;
      })
    );

    const jobs = await searchJobs(query);

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'output-node') {
          return {
            ...node,
            data: {
              ...node.data,
              jobs,
              loading: false,
            },
          };
        }
        return node;
      })
    );
  }, []);

  const handleInit = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'input-node') {
          return {
            ...node,
            data: {
              ...node.data,
              onSearch: handleSearch,
            },
          };
        }
        return node;
      })
    );
  }, [handleSearch]);

  return (
    <div className="w-full h-screen bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        onInit={handleInit}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="#93c5fd" gap={16} size={1} />
        <Controls className="!bg-white !shadow-lg" />
        <Panel position="top-center" className="bg-white p-2 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Job Search Flow</h2>
        </Panel>
      </ReactFlow>
    </div>
  );
}